require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session")
const dbconnect=require("./config/dbconnect")
dbconnect()

const authRoute=require("./routes/authRoute")
const homeRoute=require('./routes/homeroute')
const {notfound,errorhandler} = require("./middleware/error-handler")

const PORT = process.env.P0RT || 3008;

app.use(
    session({
        secret: 'your_secret_key',
        resave: false, 
        saveUninitialized: false,
        cookie: { secure:false } 
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static("public"))


app.use("/user",authRoute);
app.use(homeRoute);


app.use(notfound),app.use(errorhandler);


app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});

