const dotenv = require('dotenv')
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const JWT_SECRET=process.env.JWT_SECRET;
module.exports ={JWT_SECRET,GOOGLE_CLIENT_ID};