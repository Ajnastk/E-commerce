const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");

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
});


userSchema.pre("save",async function(req,res) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash (this.password,salt);
});
//Export the model
module.exports = mongoose.model('User', userSchema);