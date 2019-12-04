const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));

var mysql = require('mysql');

var sql = "INSERT INTO Student (name) VALUES ('new name test')";

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'HF_db'
});

var userID = 0;
var studyGroupID = 0;
var currentUser = 0;
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


app.post('/ride', (req, res)=>{
    console.log("32")
    var instruction = `INSERT INTO StudyEvent VALUES (0, '${req.body.subject}', 
    ${req.body.courseNumber}, '${req.body.time}', '${req.body.location}')`;
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        if(err) {
            res.status(400).send(err) 
        } else {
            res.status(200).send(result);
        }
    });
})

app.post('/addStudy', (req ,res)=> {
    studyGroupID += 1;
    console.log(studyGroupID);
    var instruction = `INSERT INTO StudyEvent VALUES (${studyGroupID}, '${req.body.subject}', 
    ${req.body.courseNumber}, '${req.body.time}', '${req.body.location}')`;
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        if(err) {
            res.status(400).send(err) 
        } else {
            res.status(200).send(result);
        }
    });
})


app.post('/searchStudy', (req ,res)=> {
    var clause = "";
    if (req.body.subject) {
        var subject = req.body.subject;
        if (subject.length >= 1) {
            clause = clause.concat(`WHERE (subject = "${req.body.subject[0]}"`);
        }
        for (var i = 1; i < subject.length; i++) {
            clause = clause.concat(`or subject = "${req.body.subject[i]}"`);
        }
        clause = clause.concat(")");
        
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
    })
})

app.post('/deleteStudy', (req,res) => {
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
})

app.post('/updateStudy', (req,res) => {
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
})

app.post('/signUp', (req, res)=>{
    var instruction = `SELECT COUNT(*) FROM Authentication WHERE email = '${req.body.email}'`;
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        console.log(result)
        var exist = result[0]['COUNT(*)'];
        if (exist == 0) {
            userID += 1;
            console.log(userID);
            instruction = `INSERT INTO Authentication VALUES (${userID}, '${req.body.email}', 
            '${req.body.password}', '${req.body.name}')`;
            console.log(instruction);
            connection.query(instruction, function (err2, result2) {
                return res.status(200).send({error : err2, data : result2})
            });
        } else {
            console.log("sent 400");
            return res.status(400).send({error : "The email has been registered before", data : null})
        }
    });
        
})

app.post('/login', (req, res) => {
    var instruction = `SELECT userid FROM Authentication WHERE email = '${req.body.email}' 
    AND password = '${req.body.email}'`;
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        console.log(result);
        // var exist = result[0]['COUNT(*)'];
        if (result.length == 0) {
            return res.status(400).send({
                message: 'Cannot log in!'
             });
        } else {
            currentUser = result[0]['userid'];
            console.log("userid");
            console.log(currentUser);
            return res.send({error : err, data : currentUser})
        }
    });
})

app.post('/joinStudy', (req, res) => {
    var instruction = `INSERT INTO StudyMember VALUES (${currentUser}, ${req.body.studygroupid})`; 
    console.log(instruction);
    connection.query(instruction, function (err, result) {
        if(err) {
            res.status(400).send(err) 
        } else {
            res.status(200).send(result);
        }
    });
})

app.post('/', (req, res) => {
  // Very light error handling
  console.log("post");
  if(!req.body) return res.sendStatus(400);
  });

app.get('/', (req, res) => {
    connection.query('SELECT name FROM Student', function (err, result) {
        return res.send({error : err, data : result})
    });
});


const port = process.env.PORT || 5005;
app.listen(port);

console.log(`Grill server listening on ${port}`);

