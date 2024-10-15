const User = require("../model/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")

//-------get register page--------

const registerGet= (req,res)=>{
    res.render('signup')
}

    //-----------register-post--------

    
    const saltRounds = 10;  // Number of salt rounds for hashing the password
     
    const register = async (req, res) => {
        try {
            const { username, email, mobile, password } = req.body;
    
            // Check if the user already exists
            const findUser = await User.findOne({ email: email });
    
            if (!findUser) {
                // Hash the password using bcrypt
                const hashedPassword = await bcrypt.hash(password, saltRounds);
    
                // Create a new user with the hashed password
                const newUser = new User({
                    username: username,
                    email: email,
                    mobile: mobile,
                    password: hashedPassword ,// Store the hashed password
                    isAdmin:false,
                });
    
                await newUser.save();  // Save the user to the database
    
                res.status(201).json({ success: true, message: 'User created successfully' });
            } else {
                // User already exists
                res.status(409).json({ success: false, message: "User already exists" });  // 409 Conflict for existing user
            }
        } catch (err) {
            // Handle server errors
            console.error(err);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
    
//for get signin page

const signinGet= (req,res)=>{
    res.render('signin')
}

//for user signin

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            // If no user is found, return a 404 status with a message
            return res.status(404).json({ success: false, message: "No user found" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
            // If password doesn't match, return 401 status with a message
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Check if the user is blocked
        if (findUser.is_blocked) {
            // If the user is blocked, return a 403 status with a message
            return res.status(403).json({ success: false, message: "You are blocked from accessing this website" });
        }

        
        // If password matches and the user is not blocked, set up the session
        req.session.user_id = findUser._id;
        if (findUser.isAdmin) {
            return res.status(200).json({success:true,message:"Admin Login successful",redirectUrl:"/admin"})   
           }
    


        // Send success response
        return res.status(200).json({ success: true, message: "Login successful",redirectUrl:"/" });

    } catch (error) {
        console.error("Server error during sign-in:", error);
        // Return 500 status for server error
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


   

module.exports = { registerGet,register,signinGet,signin};