CREATE DATABASE IF NOT EXISTS agency_management;
USE agency_management;

------------------------------------------------------------
-- DROP OLD TABLES (optional — for clean setup)
------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `employees`;

------------------------------------------------------------
-- CREATE ADMINS TABLE
------------------------------------------------------------
CREATE TABLE `admins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,  -- store hashed passwords in real apps
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- Insert dummy admin data
INSERT INTO `admins` (`name`, `email`, `password`)
VALUES 
('Main Administrator', 'admin@agency.com', 'admin123'),
('Super Admin', 'superadmin@agency.com', 'super123');


------------------------------------------------------------
-- CREATE EMPLOYEES TABLE
------------------------------------------------------------
CREATE TABLE `employees` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `role` VARCHAR(50) NOT NULL,          -- e.g., Developer, Designer, PM
  `hourly_rate` DECIMAL(10,2) NOT NULL,
  `status` ENUM('Active', 'Inactive', 'On Leave') NOT NULL DEFAULT 'Active',
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);



-- Insert dummy employee data
INSERT INTO `employees` (`name`, `email`, `role`, `hourly_rate`, `status`, `password`)
VALUES
('John Smith', 'john@agency.com', 'Developer', 45.00, 'Active', '$2a$12$tSUIgGIZbMwJV5pVmcRILeZ9MLVJxLiqsrkSCaPnM4gGcILPGr.66'),
('Sarah Johnson', 'sarah@agency.com', 'Designer', 40.00, 'Active', '$2a$12$tSUIgGIZbMwJV5pVmcRILeZ9MLVJxLiqsrkSCaPnM4gGcILPGr.66'),
('Mike Brown', 'mike@agency.com', 'Project Manager', 55.00, 'Active', '$2a$12$tSUIgGIZbMwJV5pVmcRILeZ9MLVJxLiqsrkSCaPnM4gGcILPGr.66'),
('Emma Davis', 'emma@agency.com', 'Developer', 42.00, 'Inactive', '$2a$12$tSUIgGIZbMwJV5pVmcRILeZ9MLVJxLiqsrkSCaPnM4gGcILPGr.66'),
('James Wilson', 'james@agency.com', 'QA Engineer', 38.00, 'Active', '$2a$12$tSUIgGIZbMwJV5pVmcRILeZ9MLVJxLiqsrkSCaPnM4gGcILPGr.66');
