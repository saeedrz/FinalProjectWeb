
let DB_URI = "mongodb://192.168.1.6:27017/mydb";


if (process.env.MONGO_DB_URI){
    DB_URI=process.env.MONGO_DB_URI;
}

module.exports = {
    DB_URI
};
/*
const connectDb = () => {
    return mongoose.connect(DB_URI);
   };
   module.exports = connectDb;
   */