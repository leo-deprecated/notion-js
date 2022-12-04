var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

var app = express();

// view engine setup
const nunjucks = require('nunjucks'); // pug 처럼 html 템플릿 엔진!
// {% extends 'layout.html' %} 이런 식의 템플릿 문법을 쓸 수 있게 함
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// // 정적 파일 연동!!! -------------------------------
// app.use(express.static(path.join(__dirname, 'public')));
// // ------------------------------------------


app.set('port', config.app.PORT || 9000);



const { sequelize } = require('./models'); //index.js 파일에서 models.export = db 에서 db(JSON 객체) 중의 sequeilze라는 key 의 value 를 가지고 오겠다
sequelize.sync({ force: false })
    .then(() => {
        console.log(app.get('port'), '데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

// 라우터 연동!!-------------------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var documentRouter = require('./routes/document');
// ------------------------------------------

// 라우터 사용!!-------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/document', documentRouter);
// ------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;