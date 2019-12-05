let api = require('./neo4j_server');


// api.addPerson({"name":"haha", "email":"a"}).then(respon => console.log(respon)).catch(error => console.log("blah"));

api.searchStudyEvent({"subject":["grainger"]});


// api.addRide(14, "a").then(respon => console.log(respon)).catch(error => console.log("blah"));
// ;