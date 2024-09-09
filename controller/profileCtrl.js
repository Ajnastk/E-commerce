//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const crypto = require('crypto')
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel'); // Your user model
const {sendEmail} = require('../utils/emailUtils')



//--------get forgot page------------
const forgotpasswordGet = (req, res) => {
    res.render('forgot-password');  
};

//----------post forgot password --------

const forgotPassword = async (req, res)=>{
    const {email}= req.body;



    try{
        //find the user by email
     
        const user = await User.findOne({email});
     if (!User) {
       return res.status(404).json({success :false, message: 'user not found'})
        
     }
     // generate a reset token using the utility function
     const resetToken = generateToken({id:user._id}, '1h');
     
     //cnostruct the password reset link 
      
     const resetLink = `http://localhost:3008/reset-password/${resetToken}`;

//or

const otp =crypto.randomInt(100000,999999).toString();

 // Store OTP in the session
 req.session.otp = otp;
 req.session.email= email;
 req.session.otpExpiresAt = Date.now() + 300000;
  // Set expiry for 5 minutes
 
 

//use utility function to sendmail // send the otp to the user's email
await sendEmail({
    email,
    subject:"password reset request",
    message: `your reqested password reset . plz used th following otp password ${otp}`,
    html:   `
    <div style="font-family: Arial, sans-serif; color: #333;">
    <img src="" alt="MaleFashion Clothing Store Logo" style="display: block; margin: 0 auto;" />
    
            <h2 style="color: #000; text-align: center;">Reset Your Password</h2>
            <p style="text-align: center; font-size: 16px;">
                Dear Customer,
            </p>
            <p style="text-align: center; font-size: 16px;">
                We received a request to reset the password for your <strong>MaleFashion Clothing Store</strong> account.
            </p>
            <div style="text-align: center; padding: 20px; background-color: #f4f4f4; margin: 20px 0; border-radius: 8px;">
                <p style="font-size: 18px; margin: 0;">Your OTP is:</p>
                <p style="font-size: 24px; font-weight: bold; color: #333; margin: 0;">${otp}</p>
                <p style="font-size: 14px; color: #777;">(It is valid for 5 minutes)</p>
            </div>
            <p style="text-align: center; font-size: 16px;">
                If you did not request this, please ignore this email or 
                <a href="https://localhost:3008/contact" style="color: #000; text-decoration: underline;">contact our support team</a>.
            </p>
            <p style="text-align: center; font-size: 16px;">
                Thank you,<br />
                <strong>MaleFashion Clothing Store Team</strong>
            </p>
            <hr />
            <p style="text-align: center; font-size: 12px; color: #777;">
                © 2024 MaleFashion Clothing Store. All rights reserved.
            </p>
        </div>
        `

  
   
 
    });
  
return res.status(200).json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        console.error('Error during password reset request:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports ={forgotpasswordGet,forgotPassword}