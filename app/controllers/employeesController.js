

const Employee = require("../models/employee");

// Get list of all employees (Admin view)
const employees = async (req, res) => {
  try {
    const employeeList = await Employee.getList();
    res.render("admin/employee_list", { data: employeeList, error: null });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.render("admin/employee_list", {
      data: [],
      error: "Failed to load employees",
    });
  }
};

// Get a single employee by ID (Admin view or API)
const employee_id = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.getById(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getDashboard = async (req, res) => {
  try {
    const employees = await Employee.getList();
    console.log("🟢 [Dashboard] Employees fetched:", employees);

    res.render("admin/admin_dashboard", {
      admin: req.session.admin,
      employees, // pass to Pug
    });
  } catch (err) {
    console.error("🔴 [Dashboard] Error fetching employees:", err);
    res.render("admin/admin_dashboard", {
      admin: req.session.admin,
      employees: [],
    });
  }
};
module.exports = { employees, employee_id, getDashboard };
