const User = require("../model/userModel");
const asyncHandler = require('async-handler');
const bcrypt = require("bcryptjs");

//-------get register page--------

const registerGet= (req,res)=>{
    res.render('signup')
}

    //-----------register-post--------

const register = async (req, res) => {
    try {
        const { username,email, mobile, password } = req.body;
        

        const findUser = await User.findOne({
            email: email
        })

        if (!findUser) {
            //create new user
            newUser = await User.create(req.body)
            await newUser.save();
            res.status(201).json({ success: true, message: 'User created successfully' });
         
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
//-------get register page--------

const signinGet= (req,res)=>{
    res.render('signin')
}

//for user signin

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email: email });

        if (findUser) {
                res.json({ success: false, message: "Account already exists" });
                return;
            }else {
                res.json({ success: false, message: "No user found" });
            }

            const passwordMatch = await bcrypt.compare(password, findOne.password);

            if (passwordMatch) {
                if (!findOne.is_blocked) {
                    req.session.user_id = findOne._id;
                    res.json({ success: true, message: "Login successful" });
                } else {
                    res.json({ success: false, message: "You are blocked from accessing this website" });
                }
            } else {
                res.json({ success: false, message: "Wrong email or password" });
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
   

module.exports = { registerGet,register,signinGet,signin};