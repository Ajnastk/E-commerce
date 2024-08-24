let User = require("../model/usermodel");

let createUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    findUser = await User.findOne({
        email: email
    })

    if (!findUser) {
        newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        res.json(" User name Already exist")
    }

}
//for user login
 
let login = async (req,res)=>{
    try{
        //finding registered user

        const {email,password}= req.body;
    finduser = await user.findOne({email:email,password:password})
    if(finduser){
 //session creation

  req.session.email = finduser.email;
  res.json("login successfully")
    }
    else{
        res.json("invalid email id and password")
    }
    }catch(err){
 //server error passing
 console.error(err);
 res.status(500).json({message:"interval server error" })
 

    }
};



module.exports = { createUser,login };