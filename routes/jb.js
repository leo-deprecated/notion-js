const { application } = require('express');
var express = require('express');

var router = express.Router();

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : '',
  user     : '',
  password : ''
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  //서버 설정
  express.set('port',9000);

  //query -> dbeaver에서 sql 실행 하는 것과 같음
  conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) { //solution 은 별칭(alias)
    console.log(rows);
    if (rows[0].solution == 2) {
      res.send('Solution is 2');
    } else {
      res.send('Solution is not 2'); // /jb 에 응답
    };
  });

  conn.end(); //connect를 하면 무조건 .end() 해줘야 함

});

//데이터 삽입을 처리해주는 함수
express.post('/document', (req, res) => {
    //파라미터 읽어오기
    const id = req.id
    const title = req.title;
    const contents = req.contents;
    const created_at = req.created_at;
    const updated_by = req.updated_by;
    const updated_at = req.updated_at;

conn.tb_document(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

    //데이터 삽입
    connection.query("insert into tb_document((id, title, contents, created_at, updated_by, updated_at) values(?, ?, ?, ?, ?, ?)",
        [id, title, contents, created_at, updated_by, updated_at], (err, rows, fields) => {
        if(err){
            console.log(err);
            res.json({"result":false});
        }else{
            res.json({"result":true});
        }
    });

  });




module.exports = router;
