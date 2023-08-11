const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv=require("dotenv")
const connectDB = require("./db/config")


dotenv.config()

const app = express();
app.use(express.json());

connectDB();


app.use('/api/auth',require("./routes/authRoutes"))

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})