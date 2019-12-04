const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const PORT = 5001;
app.listen(PORT, ()=>{
    console.log()
}