let express=require("express")
let router=express.Router()

const {homepage,shop,about,shopDetails,cart,checkout,blogDetails,blog,contact,signin}=require('../controller/homectrl')

router.get("/",homepage)

router.get("/shop",shop)

router.get("/about",about)

router.get("/shopDetails",shopDetails)

router.get("/cart",cart)

router.get("/checkout",checkout)

router.get("/blogDetails",blogDetails)

router.get("/blog",blog)

router.get("/contact",contact)

router.get("/signin",signin)

module.exports=router ;