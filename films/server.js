const app = require('./app');


app.listen('3000', function() {
    console.log(`Listening on 3001`);
  // connectDb().then(() => {
    //console.log("MongoDb connected");
    });
   //});


   setTimeout(() => { 
 
    const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

    
    }, 10000);


/*
const connectDb = require("./src/config");
app.listen('3001', function() {
    console.log(`Listening on 3001`);
   connectDb().then(() => {
    console.log("MongoDb connected");
    });
   });*/


/*const mongoose = require("mongoose");
const Film = require("./Film.model");
const connection = "mongodb://192.168.1.100:27017/mydbs";
const connectDb = () => {
 return mongoose.connect(connection);
};
module.exports = connectDb;*/


