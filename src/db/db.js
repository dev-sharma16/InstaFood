const mongoose = require("mongoose");

function connectDb(){
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{ 
        console.log("Database is connected");
    })
    .catch((error)=>{
        console.log("Error in connecting to Database : ",error);
    })
}

module.exports = connectDb;
