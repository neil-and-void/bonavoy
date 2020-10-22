const mongoose = require("mongoose");
const user = new mongoose.Schema({
    firstname:String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    DateCreated: Date,
    verified: Boolean,
    trips:[],
});
module.exports = mongoose.model("User", user);