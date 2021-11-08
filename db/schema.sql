DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departement (
  departement_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departement_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roles_title VARCHAR(30) NOT NULL,
    roles_salary DECIMAL(8,2),
    departement_id INT,
    FOREIGN KEY (departement_id)
    REFERENCES departement(departement_id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id)
    REFERENCES roles(roles_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
    ON DELETE SET NULL
);