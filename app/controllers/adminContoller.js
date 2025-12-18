const Admin = require("../models/admin.js"); 
const bcrypt = require('bcryptjs')
const Employee = require("../models/employee");
const { query } = require("../config/db");
const Shift = require("../models/shifts.js")

// const bcrypt = require("bcryptjs");
// bcrypt.hash("Agency123", 10).then(console.log);

// GET admin login page
exports.showLogin = (req, res) => {
  res.render("admin/admin_login", { error: null });
};

// POST admin login
exports.adminLogin = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    console.log("EMAIL:", email);
    console.log("INPUT PASSWORD:", password);

    const admin = await Admin.findByEmail(email);
    console.log("ADMIN FROM DB:", admin);

    if (!admin) {
      console.log("Admin not found");
      return res.render("admin/admin_login", {
        error: "Invalid email or password",
      });
    }

    console.log("DB PASSWORD:", admin.password);

    const bcryptResult = await bcrypt.compare(password, admin.password);
    console.log("BCRYPT RESULT:", bcryptResult);

    if (!bcryptResult) {
      console.log("❌ Password mismatch");
      return res.render("admin/admin_login", {
        error: "Invalid email or password",
      });
    }

    req.session.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    console.log("✅ Admin login successful");

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Admin login error:", err);
    res.render("admin/admin_login", { error: "Something went wrong" });
  }
};

// GET admin logout
exports.adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.send("Error logging out");
    }
    res.redirect("/admin-login");
  });
};


// create employee


exports.createEmployee = async (req, res) => {
  try {
    const { name, email, role, hourly_rate, password, status } = req.body;

    // Simple validation
    if (!name || !email || !role || !password || !status) {
      return res.render("admin/add_employee", {
        error: "Please fill in all required fields.",
      });
    }

    // Check if employee already exists
    const existing = await Employee.findByEmail(email);
    if (existing) {
      return res.render("admin/add_employee", {
        error: "Email already in use.",
      });
    }

    // Create employee
    await Employee.create({ name, email, role, hourly_rate, status, password });

    // Redirect to employee list or show success
    res.redirect("/admin/employees");
  } catch (err) {
    console.error("Error creating employee:", err);
    res.render("admin/add_employee", { error: "Failed to create employee." });
  }
};


// assign shifts

exports.assignShift =  async (req, res) => {
  try {
    const { employee, start_date, end_date, start_time, end_time } = req.body;

    if (!employee || !start_date || !end_date || !start_time || !end_time) {
      return res.status(400).send("All fields are required.");
    }

    // Save to DB
    await Shift.create({
      employeeId: employee,
      startDate: start_date,
      endDate: end_date,
      startTime: start_time,
      endTime: end_time,
    });

    res.redirect("/admin/dashboard?success=Shift assigned successfully");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard?error=Failed to assign shift");
  }
}





exports.getDashboard = async (req, res) => {
  try {
    const employees = await Employee.getList();

    res.render("admin/admin_dashboard", {
      admin: req.session.admin,
      employees,
    });
  } catch (err) {
    console.error(" Error fetching employees:", err);
    res.render("admin/admin_dashboard", {
      admin: req.session.admin,
      employees: [],
    });
  }
};


 