// routes/employeeRoute.js

const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");

// Middleware to protect employee dashboard
function isEmployeeLoggedIn(req, res, next) {
  if (req.session.employee) return next();
  res.redirect("/employee-login");
}

// ===== Employee Auth Routes =====

// Employee login page
router.get("/employee-login", (req, res) => {
  res.render("employee/employee_login", { error: null });
});

// Handle login POST
router.post("/employee-login", async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const employee = await Employee.findByEmail(email);
    if (!employee) {
      return res.render("employee/employee_login", {
        error: "Invalid email or password",
      });
    }

    const isValid = await bcrypt.compare(password, employee.password);
    if (!isValid) {
      return res.render("employee/employee_login", {
        error: "Invalid email or password",
      });
    }

    // Store employee info in session
    req.session.employee = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    res.redirect("/employee/dashboard");
  } catch (err) {
    console.error("Employee login error:", err);
    res.render("employee/employee_login", { error: "Something went wrong" });
  }
});

// Employee logout
router.get("/employee-logout", isEmployeeLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.send("Error logging out");
    }
    res.redirect("/employee-login");
  });
});

// ===== Employee Dashboard & Pages =====
router.get("/employee/dashboard", isEmployeeLoggedIn, (req, res) => {
  res.render("employee/employee_dashboard", { employee: req.session.employee });
});

router.get("/employee/working-hours", isEmployeeLoggedIn, (req, res) => {
  res.render("employee/working_logs", { employee: req.session.employee });
});

router.get("/employee/request-holiday", isEmployeeLoggedIn, (req, res) => {
  res.render("employee/holiday_request", { employee: req.session.employee });
});

router.get(
  "/employee/request-advance-payment",
  isEmployeeLoggedIn,
  (req, res) => {
    res.render("employee/advance_payment", { employee: req.session.employee });
  }
);

router.get("/employee/payslips", isEmployeeLoggedIn, (req, res) => {
  res.render("employee/payslip_logs", { employee: req.session.employee });
});

module.exports = router;
