const Film = require("./src/Film.model");
const express = require("express");
const app = express();
const PORT = 3001;
var cors = require('cors')
const jwt = require('jsonwebtoken');

app.use(cors()) // Use this after the variable declaration
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies



app.get("/api/v1/films", async (req, res) => {
 const films = await Film.find();
 res.json(films);
});

app.post("/api/v1/films", verifyToken, async (req, res) => {

//create a new film object 
 const film = new Film({ title: req.body.title, rating: req.body.rating });
 
await film.save();
 res.send("Film added successfully \n");
});

app.get('/api/v1/films/:film_id', async (req, res) => {
    const films = await Film.findById(req.params.film_id);
    res.json(films);
});

app.put('/api/v1/films/:film_id', async (req, res) => {
Film.findOneAndUpdate({_id: req.params.film_id}, {
  rating: req.body.rating,
}).then(Film => {
  res.json(Film)
});
});

app.post("/api/v1/login", (req, res) =>{

  const user = {
    username: req.body.username
  }
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token
    })
  });
});



function verifyToken(req, res, next){

const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefiend'){
  const bearerToken = bearerHeader.split(' ')[1];
  jwt.verify(bearerToken, 'secretkey', (err, authData) => {

    if(err){
      res.sendStatus(403);
    }else{
      next();
    }
  })
}else{
  res.sendStatus(403);
}
}



module.exports = app;
