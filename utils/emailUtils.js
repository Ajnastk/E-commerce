const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration (Gmail setup)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS   // Your app password (not the regular Gmail password)
    }
});

// Utility function to send an email
const sendEmail = async (email, subject, message, html) => {
   
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender email
        to: email,  // Recipient email
        subject: subject,
        text: message,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};



// Utility function to generate JWT token
generateToken = (payload, expiresIn = '1h') => {
    try {
        // Generate a JWT token using the secret from .env file
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

// Utility function to verify JWT token
verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};

module.exports = { 
    sendEmail,
    generateToken,
    verifyToken
 };