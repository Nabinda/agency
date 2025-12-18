const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeesController");
const adminController = require("../controllers/adminContoller"); // fixed typo

// Middleware to protect dashboard
function isAdminLoggedIn(req, res, next) {
  if (req.session.admin) return next();
  res.redirect("/admin-login");
}

// ===== Admin Auth Routes =====

// Admin login page
router.get("/admin-login", adminController.showLogin);

// Handle login form POST
router.post("/admin-login", adminController.adminLogin);

// Admin dashboard (protected)
// router.get("/admin/dashboard", isAdminLoggedIn, (req, res) => {
//   res.render("admin/admin_dashboard", { admin: req.session.admin });
// });

router.get("/admin/dashboard", isAdminLoggedIn, adminController.getDashboard);


// Logout
router.get("/admin-logout", isAdminLoggedIn, adminController.adminLogout);

// ===== Employee Management Routes =====

// Employee list (admin only)
router.get("/admin/employees", isAdminLoggedIn, employeeController.employees);

// Show Add Employee form
router.get("/admin/add-employee", isAdminLoggedIn, (req, res) => {
  res.render("admin/add_employee", { error: null });
});

// Handle Add Employee form POST
router.post(
  "/admin/add-employee",
  isAdminLoggedIn,
  adminController.createEmployee
);

// Show single employee details
router.get(
  "/admin/employees/:id",
  isAdminLoggedIn,
  employeeController.employee_id
);

// ===== Other Admin Pages =====
router.get("/admin/timesheets", isAdminLoggedIn, (req, res) => {
  res.render("admin/timesheets");
});

router.get("/admin/holiday-requests", isAdminLoggedIn, (req, res) => {
  res.render("admin/holiday_requests");
});

router.get("/admin/advance-requests", isAdminLoggedIn, (req, res) => {
  res.render("admin/advance_requests");
});

// router.post(
//   "/admin/assign-shift",
//   isAdminLoggedIn,
//   adminController.assignShift
// );

// routes/admin.js
router.post("/admin/assign-shift", isAdminLoggedIn, adminController.assignShift );


// router.get("/admin/dashboard", isAdminLoggedIn, adminController.getDashboard);

module.exports = router;
