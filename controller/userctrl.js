const User = require("../model/userModel");
const asyncHandler = require('async-handler');
const bcrypt = require("bcryptjs");



    //-----------signup--------

const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const findUser = await User.findOne({
            email: email
        })

        if (!findUser) {
            //create new user
            newUser = await User.create(req.body)
            res.status(200).redirect("/")
        } else {
            //user already exist
            res.status(404).json({ success: false, message: "User Already Exist" })
        }

    }
    catch (err) {
        //server error
        console.error(err);
        res.status(500).json({ message: "interval server error" });
    }

};

//for user signin



let signin = async (req, res) => {

    try {
        //finding registered user

        const { email, password } = req.body;

        //Find the user in the database
       const findUser = await User.findOne({ email: email})

         if(!findUser){
            res.status(401).json({success:false, message :"Invalid email id"})
         }
       
       const isMatch = await bcrypt.compare(password,findUser.password);

        if (isMatch) {
            //store user session information
            req.session.findUser = { id: findUser._id, email: findUser.email };
            res.status(200).json({success:true, message:"successfully"});
        }
        else {
            res.status(401).json({success:false,  message:"invalid email id and password"})
        }
    } catch (err) {
        //server error passing
        console.error(err);
        res.status(500).json({success :false, message: "interval server error" })


    }
};

module.exports = { createUser,signin };