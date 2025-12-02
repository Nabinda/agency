const express = require("express");
const router = express.Router();
const {
  showLogin,
  adminLogin,
  adminLogout,
} = require("../controllers/adminContoller.js");

// Middleware to protect dashboard
function isAdminLoggedIn(req, res, next) {
  if (req.session.admin) return next();
  res.redirect("/admin-login");
}

// Admin login page
router.get("/admin-login", showLogin);

// Handle login form POST
router.post("/admin-login", adminLogin);

// Dashboard (protected)
router.get("/admin/dashboard", isAdminLoggedIn, (req, res) => {
  res.render("admin/admin_dashboard", { admin: req.session.admin });
});

// Logout
router.get("/admin-logout", adminLogout);

module.exports = router;
