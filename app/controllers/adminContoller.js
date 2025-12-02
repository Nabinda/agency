const Admin = require("../models/admin.js"); // your Admin model

// GET admin login page
exports.showLogin = (req, res) => {
  res.render("admin/admin_login", { error: null });
};

// POST admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findByEmail(email);
    if (!admin) {
        console.log("incorrect email or password");
        
      return res.render("admin/admin_login", {
        error: "Invalid email or password",
      });
    }

    // Verify password
    const isValid = await admin.verifyPassword(password);
    if (!isValid) {
      return res.render("admin/admin_login", {
        error: "Invalid email or password",
      });
    }

    // Store admin info in session
    req.session.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    // Redirect to dashboard
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
