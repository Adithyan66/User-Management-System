const userSchema = require("../model/userModel")
const bcrypt = require("bcrypt");
const saltround = 10;

const registerUser = async (req, res) => {

    try {

        const { email,
            password,
            firstname,
            lastname,
            monthofbirth,
            dayofbirth,
            yearofbirth,
            gender } = req.body

        const user = await userSchema.findOne({ email })

        if (user) return res.render("user/register", { message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, saltround);

        const newUser = new userSchema({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            monthofbirth,
            dayofbirth,
            yearofbirth,
            gender
        })

        await newUser.save()

        res.render("user/login", { message: "User created succesfully" })

    } catch (error) {
        res.render("user/login", { message: "something went wrong" })

    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) return res.render("user/login", { message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.render("user/login", { message: "Incorrect password" });

        req.session.user = req.body.email;
        
        console.log(req.session.user);

        res.render("user/userhome")

    } catch (error) {
        res.render("user/login", { message: "something went wrong" })
    }
}

const loadRegister = (req, res) => {
    res.render("user/register")
}

const loadLogin = (req, res) => {
    res.render("user/login")
}

const loadHome = (req, res) => {
    res.render("user/userhome")
}

const logout = (req, res) => {
    req.session.user = ""
    console.log(req.session.user);

    res.redirect("/user/login");
}

module.exports = {
    registerUser,
    loadLogin,
    loadRegister,
    login,
    loadHome,
    logout
}