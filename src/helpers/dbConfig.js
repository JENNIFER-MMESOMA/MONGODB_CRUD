const mongoose =require("mongoose");
const {DB_URI} = require("../config/index")


const connectDb = async() => {
    try {
        await mongoose
        .connect(DB_URI)
        .then(() => console.log("connected to database"));
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;