const db = require("../services/db");

class Employee {
  static async getList() {
    const sql =
      "SELECT id, name, email, role, hourly_rate, status FROM employees;";

    return db.query(sql);
  }

  static async getById(id) {
    const sql = "SELECT * FROM employees where id=?";

    return db.query(sql, [id]);
  }
}

module.exports = Employee;
