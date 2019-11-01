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
  //console.log(sql);
  if (req.body.type) {
    console.log(req.body.type);
  }
  if (req.body.type == 'addStudy') {
    console.log(req.body.subject);
    console.log(req.body.courseNumber);
    console.log("true");
    var instruction = `INSERT INTO StudyEvent VALUES (0, '${req.body.subject}', 
    ${req.body.courseNumber},
        '${req.body.time}', '${req.body.location}')`;
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        return res.send({error : err, data : result})
    });
  } else if (req.body.type == 'searchStudy') {
    console.log(req.body.subject);
    console.log(req.body.courseNumber);
    console.log(req.body.time);
    console.log(req.body.location);
    console.log("true");
    var clause = "";
    if (req.body.subject) {
        clause = clause.concat(`WHERE subject = "${req.body.subject}"`);
    }
    if (req.body.courseNumber) {
        if (clause === "") {
            clause = clause.concat(`WHERE courseNumber = ${req.body.courseNumber}`);
        } else {
            clause = clause.concat(` AND courseNumber = ${req.body.courseNumber}`);
        }
        
    }
    if (req.body.time) {
        if (clause === "") {
            clause = clause.concat(`WHERE time = "${req.body.time}"`);
        } else {
            clause = clause.concat(` AND time = "${req.body.time}"`);
        }
        
    }
    if (req.body.location) {
        if (clause === "") {
            clause = clause.concat(`WHERE location = "${req.body.location}"`);
        } else {
            clause = clause.concat(` AND location = "${req.body.location}"`);
        }
        
    }
    
    var instruction = "SELECT * FROM StudyEvent ";
    instruction = instruction.concat(clause);

    console.log(instruction);
    connection.query(instruction, function (err, result) {
        return res.send({error : err, data : result})
    });
  } else {
    connection.query(sql, function (err, result) {
        return res.send({error : err, data : result})
    });
  }
  
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

