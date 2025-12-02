const bcrypt = require("bcryptjs");

async function createAdmin() {
  const email = "admin@example.com";
  const password = "AdminPassword123"; // the real password you want

  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

  console.log("Email:", email);
  console.log("Hashed Password:", hashedPassword);
}

createAdmin();
