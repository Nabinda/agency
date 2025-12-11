const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeesController");

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

// Employee list (admin only)
router.get("/admin/employees", isAdminLoggedIn, employeeController.employees);
router.get("/admin/add-employee", isAdminLoggedIn, (req, res) => {
  res.render("admin/add_employee");
});
router.get("/admin/holiday-requests", isAdminLoggedIn, (req, res) => {
  res.render("admin/holiday_requests");
});

router.get("/admin/advance-requests", isAdminLoggedIn, (req, res) => {
  res.render("admin/advance_requests");
});
router.get(
  "/admin/employees/:id",
  isAdminLoggedIn,
  employeeController.employee_id
);
// Logout
router.get("/admin-logout", isAdminLoggedIn, adminLogout);

module.exports = router;
