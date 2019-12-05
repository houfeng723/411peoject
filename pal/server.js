const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.json({ limit: '100mb' }));

var mysql = require('mysql');

var sql = "INSERT INTO Student (name) VALUES ('new name test')";

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fcc987412365',
  database: 'cs411'
});

var mongo_url = 'mongodb://localhost:27017';

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

app.post('/add-student-profile', (req, res) => {
    console.log("post - add student profile");
    if(!req.body) return res.sendStatus(400);
    if(!req.body.netID || !req.body.name) return res.sendStatus(400);
    //default value
    var name_input = req.body.name || '';
    var gender_input = req.body.gender || '';
    var nickname_input = req.body.nickname || '';
    var courses_taken_input = req.body.courses_taken || '[]';
    var interest_input = req.body.interest || '[]';
    var netID_input = req.body.netID || '';
    MongoClient.connect(mongo_url, function(err, client) {
        if (err) {
            throw err;
        }
        var db = client.db('cs411');
        db.collection('Student').insertOne({
            name: name_input,
            gender: gender_input,
            nickname: nickname_input,
            courses_taken: courses_taken_input,
            interest: interest_input,
            netID: netID_input
        }).then(result => {
            console.log("Successfully update " + netID_input + "'s profile." );
            client.close();
            res.sendStatus(200);
        }).catch(err => {
            console.error("Failed to update profile");
            client.close();
            res.sendStatus(500);
        })

    });
});

app.get('/get-student-profile/:netID', (req, res) => {
    console.log("post - get student profile");
    if(!req.body) return res.sendStatus(400);
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        if (err) {
            throw err;
        }
        if (!req.params.netID) {
            console.error("Requested Field missing.");
            res.sendStatus(400);
        }
        const netID_input = req.params.netID;

        var db = client.db('cs411');
        db.collection('Student').findOne({
            netID: netID_input
        }).then(result => {
            console.log("Successfully get " + netID_input + "'s profile." );
            return res.send({error : err, data : result});
        })

    });
});
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
    ${req.body.courseNumber}, '${req.body.time}', '${req.body.location}')`;
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
  } else if (req.body.type == 'deleteStudy'){
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

      var instruction = "DELETE FROM StudyEvent ";
      instruction = instruction.concat(clause);

      console.log(instruction);
      connection.query(instruction, function (err, result) {
          return res.send({error : err, data : result})
      });
  } else if (req.body.type == 'updateStudy'){
      console.log(req.body.sSubject);
      console.log(req.body.sCourseNumber);
      console.log(req.body.sTime);
      console.log(req.body.sLocation);
      console.log(req.body.wSubject);
      console.log(req.body.wCourseNumber);
      console.log(req.body.wTime);
      console.log(req.body.wLocation);
      console.log("true");
      var setClause = "";
      if (req.body.sSubject) {
          setClause = setClause.concat(`subject = "${req.body.sSubject}"`);
      }
      if (req.body.sCourseNumber) {
          if (setClause === "") {
              setClause = setClause.concat(`courseNumber = ${req.body.sCourseNumber}`);
          } else {
              setClause = setClause.concat(`,courseNumber = ${req.body.sCourseNumber}`);
          }

      }
      if (req.body.sTime) {
          if (setClause === "") {
              setClause = setClause.concat(`time = "${req.body.sTime}"`);
          } else {
              setClause = setClause.concat(`,time = "${req.body.sTime}"`);
          }

      }
      if (req.body.sLocation) {
          if (setClause === "") {
              setClause = setClause.concat(`location = "${req.body.sLocation}"`);
          } else {
              setClause = setClause.concat(`,location = "${req.body.sLocation}"`);
          }

      }
      //nothing to SET
      if (setClause === ""){
          return res.status(500).json({});
      }
      var whereClause = "";
      if (req.body.wSubject) {
          whereClause = whereClause.concat(`WHERE subject = "${req.body.wSubject}"`);
      }
      if (req.body.wCourseNumber) {
          if (whereClause === "") {
              whereClause = whereClause.concat(`WHERE courseNumber = ${req.body.wCourseNumber}`);
          } else {
              whereClause = whereClause.concat(` AND courseNumber = ${req.body.wCourseNumber}`);
          }

      }
      if (req.body.wTime) {
          if (clause === "") {
              whereClause = whereClause.concat(`WHERE time = "${req.body.wTime}"`);
          } else {
              whereClause = whereClause.concat(` AND time = "${req.body.wTime}"`);
          }

      }
      if (req.body.wLocation) {
          if (clause === "") {
              whereClause = whereClause.concat(`WHERE location = "${req.body.wLocation}"`);
          } else {
              whereClause = whereClause.concat(` AND location = "${req.body.wLocation}"`);
          }

      }

      var instruction = "UPDATE StudyEvent SET ";
      instruction = instruction.concat(setClause).concat(whereClause);

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

