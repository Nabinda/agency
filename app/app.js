const express = require("express");
const session = require("express-session");
const path = require("path");



// Create express app
const app = express();

// Routes
const adminRoutes = require("./routes/adminRoute.js");
const employeeRoutes = require("./routes/employeeRoute");

// Pug setup
app.set("view engine", "pug");
app.set("views", "./app/views");

// Middleware
app.use(express.static("static"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
  session({
    secret: "someStrongSecret123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// Root route
app.get("/", (req, res) => res.render("main"));

// Use modular routes
app.use("/", adminRoutes);
app.use("/", employeeRoutes);

// 404
app.use((req, res) => res.status(404).render("404", { url: req.originalUrl }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT}/`)
);
