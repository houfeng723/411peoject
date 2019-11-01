const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));

var mysql = require('mysql')

var sql = "INSERT INTO Student (name) VALUES ('new name test')";

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'HF_db'
});


async function getFromMySql() {
    let retval = null;
    connection.query('SELECT name FROM Student', function (err, result) {
        retval = result;
        connection.close(err => {
            console.log(result);
            return retval;
        })
    });
    
}


// Upload the latest photo for this session
app.post('/', (req, res) => {
  // Very light error handling
  console.log("post");
  if(!req.body) return res.sendStatus(400);
  //var sql = "INSERT INTO Student (name) VALUES ('new name test')";
  console.log(sql);
  connection.query(sql, function (err, result) {
    return res.send({error : err, data : result})
  });
  //res.status(200).send({data : "I posted this to my server" + req.body.event});
});

app.get('/', (req, res) => {
    console.log("fetch");
    connection.query('SELECT name FROM Student', function (err, result) {
        return res.send({error : err, data : result})
    });
});

const port = process.env.PORT || 5005;
app.listen(port);

console.log(`Grill server listening on ${port}`);

