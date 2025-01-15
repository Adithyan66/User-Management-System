

const checksession = (req, res, next) => {
    
    // Check if the user is logged in
    if (req.session.user) {
       
         next();  // Proceed to the next middleware or route handler
    } else {
         res.redirect("/user/login");  // Redirect to login page if not logged in
    }
};

const islogin = (req, res, next) => {


    // If the user is already logged in, redirect to the home page
    if (req.session.user) {
         res.redirect("/user/home");
    } else {
         next();  // Proceed to the login page
    }
};

module.exports = { checksession, islogin };
