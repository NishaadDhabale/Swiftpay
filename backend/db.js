
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://nishaaddhabale:AA@cluster0.lazqubi.mongodb.net/';

mongoose.connect(dbURI)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
}); 
const AccountsSchema = new mongoose.Schema({
    userid:{type: mongoose.Schema.Types.ObjectId,ref:"User",
    required:true
    },
    balance:{
    type:Number,
    required:true }
}); 

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Accounts",AccountsSchema);

module.exports ={
    User,
    Account
};