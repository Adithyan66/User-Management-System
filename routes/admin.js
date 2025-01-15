const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController")
const adminAuth = require("../middleware/adminauth")


router.get('/login',adminAuth.islogin, adminController.loadlogin)

router.post("/login",adminController.login)

router.get("/dashboard",adminAuth.checksession,adminController.loadDashboard)

router.get("/logout",adminAuth.checksession,adminController.logout)

router.post("/edit-user",adminAuth.checksession,adminController.editUser)

router.get("/delete-user/:id",adminAuth.checksession,adminController.deleteuser)

router.post("/add-user",adminAuth.checksession,adminController.addUser)

router.post("/search",adminAuth.checksession,adminController.search)

module.exports = router;

