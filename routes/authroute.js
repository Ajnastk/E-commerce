let express = require("express")
let router = express.Router()
let {registerGet,register,signin,signinGet}=require("../controller/userCtrl")
let {forgotpasswordGet, forgotPassword,verifyotpGet,verifyOtp,resetpasswordGet,resetPassword}= require("../controller/profileCtrl")



router.get("/signup",registerGet)
router.post("/signup",register)

router.get("/signin",signinGet)
router.post("/signin",signin)

router.get("/forgotPassword",forgotpasswordGet)
router.post("/forgotPassword",forgotPassword)

router.get("/verifyOtp",verifyotpGet)
router.post("/verifyOtp",verifyOtp)

router.get("/resetPassword",resetpasswordGet)
router.post("/resetPassword",resetPassword)

module.exports=router ;

