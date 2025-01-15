const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");



    router.get('/login',auth.islogin, userController.loadLogin)

    router.post("/login",userController.login)

    router.get("/register",auth.islogin,userController.loadRegister)

    router.post("/register",userController.registerUser)

    router.get("/home",auth.checksession,userController.loadHome)

    router.get("/logout",auth.checksession,userController.logout)

    module.exports = router;