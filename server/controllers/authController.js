 const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')

const dashboard=(req,res)=> {
    try {
        res.json({message:"welcome to Dashboard"})
    } catch (error) {
        res.json({error : error.message});
    }
}

const home = (req,res) => {
    try{
        res.json({message:"Welcome to Home"})
    }
    catch(error)
    {
        res.json({error:error.message})
    }
}

 const login = async (req,res) => {
    //console.log(req.body);
    try{
    const {email,password} = req.body;
    const isUser = await userModel.findOne({email})
    if(!isUser)
    {
        res.json({error : "user not found"});
    }
    else{
        const isMatched  = await bcrypt.compare(password,isUser.password)
        if(!isMatched)
        {
            res.json({ error : "Invalid credentials"});
        }
        const user = await userModel.findOne({email});
        //console.log(user);
        const token = await jwt.sign({id:user._id},process.env.SECRETKEY)
        //console.log(token)
        res.json({status:true,token,role:user.role})
    }
}
    catch(err)
    {
        console.log(err.message)
    }
 }

 const register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password)
        {
            res.json({ error : "enter all fields"});
        }
        const isExist = await userModel.findOne({email})
        if(isExist)
        {
            res.json({message:"user alreday existed"})
        }
        const hashedPassword  = await bcrypt.hashSync(password,10);
        req.body.password = hashedPassword;
        const user = await userModel.create(req.body);
        res.json({message: "user registered successfully",user})
    }
    catch(err)
    {
        console.log(err.message)
    }
 }

 module.exports ={login,register,dashboard,home}