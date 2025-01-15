const checksession = (req, res, next) => {


    // Check if the user is logged in as admin
    if (req.session.admin) {
        next();  // Proceed to the next middleware or route handler
    } else {
        res.redirect("/admin/login");  // Redirect to admin login page if not logged in
    }
};

const islogin = (req, res, next) => {
 
    // If the admin is already logged in, redirect to the admin dashboard
    if (req.session.admin) {
        res.redirect("/admin/dashboard");
    } else {
        next();  // Proceed to the login page
    }
};

module.exports = { checksession, islogin };
