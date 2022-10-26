// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express')
const app =  express();



const Cors = require('cors');
// Cors for cross origin allowance
app.use(Cors());


const bodyParser =require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//port
const port = 4000;
const hostname = "127.0.0.1"

app.listen(port, ()=>{
    console.log(`server run on: http://${hostname}:${port}`);
});
//Get
app.get('/getAll', (req, res) =>{
    res.send(projectData).status(200).end();
    projectData=[];
})

//Post
app.post('/addData',  (req,res) =>{
    newEntry = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
        // req.body;
    }
    projectData.push(newEntry)
})


