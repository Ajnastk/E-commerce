let express=require("express")
let router=express.Router()

const {homepage,shop,about,shopdetails,cart,checkout,blogdetails,blog,contact,signin}=require('../controller/homectrl')

router.get("/",homepage)

router.get("/shop",shop)

router.get("/about",about)

router.get("/shopdetails",shopdetails)

router.get("/cart",cart)

router.get("/checkout",checkout)

router.get("/blogdetails",blogdetails)

router.get("/blog",blog)

router.get("/contact",contact)

router.get("/signin",signin)

module.exports=router ;