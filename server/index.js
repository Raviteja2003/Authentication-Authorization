const express =  require('express');
const mongoose  = require('mongoose');
const UserModel = require("./models/UserSchema");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://127.0.0.1:5173"],
    methods:["GET","POST"],
    credentials:true
}));
app.use(cookieParser());

mongoose.connect('mongodb+srv://Raviteja:Ravi%40123@crudusers.pbhddgv.mongodb.net/employees');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(`Token in cookie:`,token);
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard',verifyUser,(req,res)=>{
    res.json("Success")
})

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash => {
       UserModel.create({name,email,password:hash})
       .then(user => 
           res.json("Success")
       )
       .catch(err => res.json(err));
    })
    .catch(err =>  res.json(err))

})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  
                        console.log(`Token generated: `,token)
                    res.cookie('token', token,{
                        httpOnly:true
                    })
                    return res.json({Status: "Success", role: user.role,user})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.listen(3001,()=>{
    console.log("server is running");
})