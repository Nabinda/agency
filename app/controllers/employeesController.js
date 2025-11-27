// controllers/employeesController.js

const Employee = require("../model/employee");

const employees = async (req, res) => {
  const employees = await Employee.getList();
  // const employee = await Employee.getEmployeeByID(1);

  // console.log(employee);

  res.render("admin/employee_list", { data: employees });
};

const employee_id = async (req, res) => {
  const { id } = req.params;
  const employee_id = await Employee.getById(id);

  console.log(employee_id);
  res.json(employee_id);
};

module.exports = { employees, employee_id };
