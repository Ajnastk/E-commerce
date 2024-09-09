const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


//Email cofiguration


//Utility function to send an email

sendEmail = async (email,subject,message,html)=>{

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
           user:process.env.EMAIL_USER,
           pass:process.env.EMAIL_PASS
        }    
   
   });
   
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to :email,
        subject:subject,
        text:message,
        html:html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email send successfully to',to);
        
    } catch (error) {
        console.error('Error sending email',error);
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

 module.exports={sendEmail}