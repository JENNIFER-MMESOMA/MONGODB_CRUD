const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    dob: {
        type: Date,
        default: Date.now(),
        require: true,

    },
    password: {
        type: String,
    },
},
 {timestamps: true}
);


const User = mongoose.model("user", userSchema);

module.exports = User;