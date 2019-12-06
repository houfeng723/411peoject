const neo4j = require('neo4j-driver');
user = "neo4j";
password = "123456";
uri = "bolt://localhost:7687";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const personName = 'Alice';

// const signUp = session.run(
//     'CREATE (a:Student {email: $email, name: $name}) RETURN a',
//     {
//         name: personName,
//         email: email
//     }
//   );
async function recCourse(info) {
    let session = driver.session();
    let query = "MATCH (a: Student {email: $email}) -[:join]-(s1:Study)-[:join]-(b: Student)-[:join]-(s2:Study)"
    +" WITH collect(s1.courseNumber) as listA, s2, collect(s2) as listB"
    +" WHERE NOT s2.courseNumber  in listA"
    +" RETURN s2.courseNumber, count(s2) as num"
    +" ORDER BY num DESC" ;
    console.log(query);
    var email = info.email;
    try {
        const result = await session.run(query, info);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        throw error;
    }
}

async function addPerson(info) {
    // setup query
    let session = driver.session();
    let query = 'CREATE (a:Student {email: $email, name: $name}) RETURN a';
    console.log(query);
    var email = info.email;
    try {
        const result = await session.run(query, info);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        throw error;
    }

}

async function getStudyEvent(info) {
    let session = driver.session();
    // setup query
     
    let query = "MATCH (b:Study) -[:join]- (a:Student) "
                + " WHERE a.email = $email"
                + " RETURN b ";


        console.log(info);
    try {
        const result = await session.run(query, info);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        console.log(error);
        throw error;
    }

}

async function getRideEvents(info) {
    let session = driver.session();
    // setup query
     
    let query = "MATCH (b:Ride) -[:join]- (a:Student) "
                + " WHERE a.email = $email"
                + " RETURN b ";

    try {
        const result = await session.run(query, info);
        session.close();
        return result;
    }
    catch (error) {
        session.close();
        throw error;
    }

}


async function addStudy(info) {
    console.log(info);
    let session = driver.session();
    // setup query
    let query = "MATCH (b:Student) "
                + "WHERE b.email = $email "
                + "CREATE p = (a:Study {host : $email, date :$date, location : $location"
                + ", subject: $subject, courseNumber : $courseNumber}) -[r:join]->(b) " 
                + "RETURN type(r)";
    try {
        const result = await session.run(query, info);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        console.log(error);
        throw error;
    }

}

async function searchStudyEvent(info) {
    let session = driver.session();
    // setup query
    var clause = "";
    if (info.subject) {
        var subject = info.subject;
        if (subject.length >= 1) {
            clause = clause.concat(`WHERE (b.subject = "${info.subject[0]}"`);
            for (var i = 1; i < subject.length; i++) {
                clause = clause.concat(`or b.subject = "${info.subject[i]}"`);
            }
            clause = clause.concat(")");
        }
    }
    if (info.courseNumber) {
        if (clause === "") {
            clause = clause.concat(`WHERE b.courseNumber = $courseNumber`);
        } else {
            clause = clause.concat(` AND b.courseNumber = $courseNumber`);
        }
        
    }
    if (info.time) {
        if (clause === "") {
            clause = clause.concat(`WHERE b.time = $time`);
        } else {
            clause = clause.concat(` AND b.time = $time`);
        }
        
    }
    if (info.location) {
        if (clause === "") {
            clause = clause.concat("WHERE b.location = $location");
        } else {
            clause = clause.concat(` AND b.location = $location`);
        }
        
    }
    let query = "MATCH (b:Study) "
                + clause
                + " RETURN b ";

    console.log(query);
    try {
        const result = await session.run(query, info);
        session.close();
        return result;
    }
    catch (error) {
        session.close();
        throw error;
    }

}

async function addRide(info) {
    let session = driver.session();
    // setup query
    let query = "MATCH (b:Student) "
                + "WHERE b.email = $email "
                + "CREATE p = (a:Ride {host: $email, "
                + "fromLocation: $fromLocation, toLocation: $toLocation, "
                + "date : $date}) -[r:join]->(b) " 
                + "RETURN type(r)";
    
    try {
        const result = await session.run(query, info);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        console.log(error);
        throw error;
    }

}

async function joinStudy(info) {
    let session = driver.session();
    let email = info.email;
    let data = info.info;
    data["email"]= email;
    let query = 
        "MATCH (a:Student),(b:Study) "
       + "WHERE a.email = $email AND b.subject = $subject AND b.host = $host AND b.courseNumber = $courseNumber "
       + "AND b.location = $location and b.date=$date "
        +"CREATE (a)-[r:join]->(b) "
        +"RETURN type(r) ";
    console.log(query);
    try {
        const result = await session.run(query, data);
        session.close();
        console.log(result);
        return result;
    }
    catch (error) {
        session.close();
        console.log(error);
        throw error;
    }
}

exports.addPerson = addPerson;
exports.addRideNeo = addRide;
exports.addStudy = addStudy;
exports.searchStudyEvent = searchStudyEvent;
exports.getStudyEvent=getStudyEvent;
exports.search = searchStudyEvent;
exports.getRideEvents=getRideEvents;
exports.joinStudy = joinStudy;
exports.recCourse = recCourse;