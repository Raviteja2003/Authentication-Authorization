const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    name :String,
    email:String,
    password:String,
    role:{
        type : String,
        enum :["admin","visitor"],
        default :"visitor"
    }
}
)

const UserModel = mongoose.model('credentials',UserSchema);
module.exports = UserModel;