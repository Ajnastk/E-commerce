const mongoose = require("mongoose"); 


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
      
        
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});



//Export the model
module.exports = mongoose.model('User', userSchema);