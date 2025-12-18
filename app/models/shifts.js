const { query } = require("../config/db"); // your query helper

class Shift {
  constructor(id, employeeId, startDate, endDate, startTime, endTime) {
    this.id = id;
    this.employeeId = employeeId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  // ===== STATIC METHODS =====

  // Create a new shift
  static async create({ employeeId, startDate, endDate, startTime, endTime }) {
    const result = await query(
      "INSERT INTO shifts (employee_id, start_date, end_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)",
      [employeeId, startDate, endDate, startTime, endTime]
    );

    return new Shift(
      result.insertId,
      employeeId,
      startDate,
      endDate,
      startTime,
      endTime
    );
  }

  // Optional: get all shifts
  static async getAll() {
    const rows = await query("SELECT * FROM shifts");
    return rows.map(
      (r) =>
        new Shift(
          r.id,
          r.employee_id,
          r.start_date,
          r.end_date,
          r.start_time,
          r.end_time
        )
    );
  }
}

module.exports = Shift;
