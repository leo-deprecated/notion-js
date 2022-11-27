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

  conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    console.log(rows);
    if (rows[0].solution == 2) {
      res.send('Solution is 2');
    } else {
      res.send('Solution is not 2');
    };
  });

  conn.end();

});

module.exports = router;
