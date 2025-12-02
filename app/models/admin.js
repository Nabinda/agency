const bcrypt = require("bcryptjs");
const { query } = require("../config/db"); // your query helper

class Admin {
  constructor(id, email, password, role = "admin") {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // ===== STATIC METHODS =====

  // Find admin by email
  static async findByEmail(email) {
    const rows = await query("SELECT * FROM admins WHERE email = ?", [email]);
    if (rows.length === 0) return null;

    const { id, email: userEmail, password, role } = rows[0];
    return new Admin(id, userEmail, password, role);
  }

  // Create a new admin
  static async create(email, password, role = "admin") {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO admins (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );

    // result.insertId comes from MySQL insert
    return new Admin(result.insertId, email, hashedPassword, role);
  }

  // ===== INSTANCE METHODS =====

  // Verify password
  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = Admin;
