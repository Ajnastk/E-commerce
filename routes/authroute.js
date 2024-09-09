let express = require("express")
let router = express.Router()
let {registerGet,register,signin,signinGet}=require("../controller/userctrl")
let {forgotpasswordGet, forgotPassword}= require("../controller/profileCtrl")



router.get("/signup",registerGet)
router.post("/signup",register)

router.get("/signin",signinGet)
router.post("/signin",signin)

router.get("/forgotPassword",forgotpasswordGet)
router.post("/forgotPassword",forgotPassword)



module.exports=router ;

