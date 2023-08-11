const mongoose=require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.URL)
        console.log(`Monogdb connected ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`MongoDB Server Error ${error}`)
    }
}

module.exports=connectDB;