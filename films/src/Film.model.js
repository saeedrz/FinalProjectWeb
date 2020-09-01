const mongoose = require("mongoose");
const FilmSchema = new mongoose.Schema({
  title: {
 type: String, required:[true]
 },
 rating:{
   type: Number, default: 5
 }
});
const Film = mongoose.model("Film", FilmSchema);
module.exports = Film;