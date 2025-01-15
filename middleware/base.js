const basechecksession = (req, res, next) => {


    // Check for active user or admin session
    if (req.session.user) {
        res.redirect("/user/home");  // Redirect to user home
    } else if (req.session.admin) {
        res.redirect("/admin/dashboard");  // Redirect to admin dashboard
    } else {
        res.render("user/login");  // Render login page (use view name, not URL path)
    }
};

module.exports = { basechecksession };
