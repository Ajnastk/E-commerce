const dotenv= require('dotenv').config();
const express = require("express");
const app = express();
const path = require ("path");
const session = require("express-session")
const dbconnect=require("./config/dbconnect")
dbconnect()

const authRoute=require("./routes/authRoute")
const homeRoute=require('./routes/homeRoute')
const adminRoute=require('./routes/adminRoute')
const {notfound,errorhandler} = require("./middleware/error-handler")

const PORT = process.env.PORT || 3008


app.use(
    session({
        secret: 'yoursecretkey',
        resave: false, 
        saveUninitialized: true,
        cookie: { secure:false }
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static("public"))

//user routes
app.use("/",authRoute);
app.use(homeRoute);

// Admin Route
app.use(adminRoute);


app.use(notfound),app.use(errorhandler);



app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});

