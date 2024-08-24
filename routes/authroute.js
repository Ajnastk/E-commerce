let express=require("express")
let router=express.Router()

let {createUser,login}=require("../controller/userctrl")

router.post("/user_registration",createUser)
router.post("/user_login",login)


module.exports=router

