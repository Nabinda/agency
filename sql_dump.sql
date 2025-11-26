CREATE DATABASE IF NOT EXISTS agency_management;
USE agency_management;

-- Remove the table if it exists to start fresh
DROP TABLE IF EXISTS `employees`;

-- Create the employees table
CREATE TABLE `employees` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `role` VARCHAR(50) NOT NULL,          -- e.g., 'Developer', 'Designer'
  `hourly_rate` DECIMAL(10,2) NOT NULL, -- e.g., 45.00
  `status` ENUM('Active', 'Inactive', 'On Leave') NOT NULL DEFAULT 'Active',
  `password` VARCHAR(255) NOT NULL,     -- In a real app, store hashed passwords!
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- Insert dummy data matching your UI
INSERT INTO `employees` (`name`, `email`, `role`, `hourly_rate`, `status`, `password`) VALUES
('John Smith', 'john@agency.com', 'Developer', 45.00, 'Active', 'password123'),
('Sarah Johnson', 'sarah@agency.com', 'Designer', 40.00, 'Active', 'password123'),
('Mike Brown', 'mike@agency.com', 'Project Manager', 55.00, 'Active', 'password123'),
('Emma Davis', 'emma@agency.com', 'Developer', 42.00, 'Inactive', 'password123'),
('James Wilson', 'james@agency.com', 'QA Engineer', 38.00, 'Active', 'password123');