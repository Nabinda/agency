const express = require("express");
const router = express.Router();

// Employee login page
router.get("/employee-login", (req, res) => {
  res.render("employee/employee_login");
});

// Handle employee login POST (TODO: implement proper login)
router.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;
  res.redirect("/employee/dashboard");
});

// Employee dashboard
router.get("/employee/dashboard", (req, res) => {
  res.render("employee/employee_dashboard");
});

// Employee request holiday
router.get("/employee/request-holiday", (req, res) => {
  res.render("employee/holiday_request");
});
// Employee request advance payment
router.get("/employee/request-advance-payment", (req, res) => {
  res.render("employee/advance_payment");
});
module.exports = router;
