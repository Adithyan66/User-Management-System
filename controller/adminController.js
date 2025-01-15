const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const userSchema = require("../model/userModel");
const Swal = require('sweetalert2')




const loadlogin = async (req, res) => {

    res.render("admin/login");
}


const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const admin = await adminModel.findOne({ email });

        if (!admin) return res.render("admin/login", { message: "Invalid Credentials" })

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) return res.render("admin/login", { message: "Invalid Credentials" })

        req.session.admin = true

        res.redirect("/admin/dashboard")

    } catch (error) {
        res.send(error)
    }

}


const loadDashboard = async (req, res) => {

    try {
        const admin = req.session.admin
        if (!admin) return res.redirect("/admin/login")

        const users = await userModel.find({})

        res.render("admin/dashboard", { users })

    }
    catch (error) {

    }
}


const editUser = async (req, res) => {
    try {

        const { firstname, lastname, email, password, _id } = req.body;

        const updatedata = { firstname, lastname, email }

        if (password) {
            const harshPassword = await bcrypt.hash(password, 10);
            updatedata.password = harshPassword
        }



        const user = await userModel.findOneAndUpdate({ _id }, { $set: updatedata });

        const allUsers = await userModel.find({});

        res.render("admin/dashboard", { message: "User Updated Succesfully", users: allUsers });

    }
    catch (error) {
        console.log(error);

    }
}


const deleteuser = async (req, res) => {

    try {
        const { id } = req.params
        const user = await userModel.findOneAndDelete({ _id: id })
        console.log("rech");

        res.redirect("/admin/dashboard")
    }
    catch (error) {
        console.log(error);

    }
}


const addUser = async (req, res) => {

    try {
        const { email,
            password,
            firstname,
            lastname,
            monthofbirth,
            dayofbirth,
            yearofbirth,
            gender } = req.body

         

            const user = await userSchema.findOne({email})
            
            if(user){
                const users = await userModel.find({})
                return res.render("admin/dashboard",{message:"user already exist",users})
            }

            const hashedPassword  = await bcrypt.hash(password,10);

            const newUser = userSchema({
                email,
                password : hashedPassword,
                firstname,
                lastname,
                monthofbirth,
                dayofbirth,
                yearofbirth,
                gender
            })

            await newUser.save()

            const users = await userModel.find({})

            res.render("admin/dashboard",{message:"User Created Succesfully",users});
            

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

}





    const search = async (req, res) => {
        try {
            const searchQuery = req.body.search;
            console.log("Search Query:", searchQuery);
    
            const users = await userSchema.find({ email: new RegExp(searchQuery, 'i') });
    
            if (users.length === 0) {
                const allUsers = await userSchema.find({});
                return res.render("admin/dashboard", { message: "User not found", users: allUsers });
            }
    
            res.render("admin/dashboard", { users });
        } catch (error) {
            console.error("Search Error:", error);
            res.send("Something went wrong");
        }

}


const logout = (req, res) => {
    req.session.admin = null
    res.redirect("/admin/login");
}








module.exports = {
    loadlogin,
    login,
    loadDashboard,
    logout,
    editUser,
    deleteuser,
    addUser,
    search
}