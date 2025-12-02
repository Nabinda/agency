const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeesController");

// Employee login page
router.get("/employee-login", (req, res) => {
  res.render("employee/employee_login");
});

// Handle employee login POST (TODO: implement proper login)
router.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;
  res.redirect("/employee-dashboard");
});

// Employee dashboard
router.get("/employee-dashboard", (req, res) => {
  res.render("employee/employee_dashboard");
});

// Employee list (admin only)
router.get("/admin/employees", employeeController.employees);
router.get("/admin/employees/:id", employeeController.employee_id);

module.exports = router;
