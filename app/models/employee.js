// models/employee.js
const { query } = require("../config/db");
const bcrypt = require("bcryptjs");

class Employee {
  constructor(id, name, email, role, hourly_rate, status, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.hourly_rate = hourly_rate;
    this.status = status;
    this.password = password;
  }

  static async getList() {
    const sql =
      "SELECT id, name, email, role, hourly_rate, status FROM employees;";
    const rows = await query(sql);

    return rows;
  }

  static async getById(id) {
    const sql = "SELECT * FROM employees WHERE id = ?";
    const rows = await query(sql, [id]);
    if (rows.length === 0) return null;
    const {
      id: empId,
      name,
      email,
      role,
      hourly_rate,
      status,
      password,
    } = rows[0];
    return new Employee(
      empId,
      name,
      email,
      role,
      hourly_rate,
      status,
      password
    );
  }

  static async findByEmail(email) {
    const rows = await query("SELECT * FROM employees WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) return null;
    const {
      id,
      name,
      email: userEmail,
      role,
      hourly_rate,
      status,
      password,
    } = rows[0];
    return new Employee(
      id,
      name,
      userEmail,
      role,
      hourly_rate,
      status,
      password
    );
  }

  static async create({ name, email, role, hourly_rate, status, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO employees (name, email, role, hourly_rate, status, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, role, hourly_rate, status, hashedPassword]
    );
    return new Employee(
      result.insertId,
      name,
      email,
      role,
      hourly_rate,
      status,
      hashedPassword
    );
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }


  static async deleteAccount(id) {
  const result = await query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );

  // result.affectedRows === 1 means delete was successful
  return result.affectedRows > 0;
  }

  static async updateAccount(id, { name, role, hourly_rate, status }) {
    const result = await query(
      `UPDATE employees 
      SET name = ?, role = ?, hourly_rate = ?, status = ?
      WHERE id = ?`,
      [name,  role, hourly_rate, status, id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = Employee;
