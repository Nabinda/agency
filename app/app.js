// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require("./services/db");

// Use the Pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views");
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a route for root - /
app.get("/", function (req, res) {
  res.render("main");
});

app.get("/admin-login", function (req, res) {
  res.render("admin/admin_login");
});

app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  res.redirect("admin-dashboard");
});

app.get("/admin-dashboard", function (req, res) {
  res.render("admin/admin_dashboard");
});

app.get("/employee-login", function (req, res) {
  res.render("employee/employee_login");
});

app.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;
  res.redirect("employee-dashboard");
});

app.get("/employee-dashboard", function (req, res) {
  res.render("employee/employee_dashboard");
});

// Create a route for testing the db
app.get("/db_test", function (req, res) {
  // Assumes a table called test_table exists in your database
  sql = "select * from test_table";
  db.query(sql).then((results) => {
    console.log(results);
    res.send(results);
  });
});

// Start server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
