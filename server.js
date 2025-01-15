const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");
const nocache = require("nocache");

app.use(nocache());

app.use(session({
    secret:"verysecret",
    resave:false,
    saveUninitialized:true,
  }))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));
  
app.use(express.urlencoded({extended:true}));
app.use(express.json())
  

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const baseRouter = require("./routes/base")


app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use("/",baseRouter)



const connectDB = require('./db/connectDB');

connectDB();



app.listen(3333, () => {
  console.log('Server is running on port 3333');
});


