// Initilize packages needed for app to work
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

//const consoleTable = require(console.table);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
});

// Require classes
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");

// Require files with text variables
const mainMenu = require('./lib/mainMenu');
const splash = require('./lib/splash');


// Ask for departement name
const addDepartement = [
    {
        type: 'input',
        name: 'name',
        message: "What is the name of the departement?",
    }
];

const addRole = [
    {
        type: 'input',
        name: 'name',
        message: "What is the name of the role?",
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the salary of this role?",
    },
    // Which departement does the role belong to?
    // ****** ADD LIST OF DEPARTEMENTS
];

const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
    },
    // What is the employee's role?
    // ****** ADD LIST OF ROLES

    // Who is the employee's namager?
    // ****** ADD LIST OF MANAGERS
];

const updateRole = [
    
    // Which employee’s role do you want to update?
    // ****** ADD LIST OF EMPLOYEES

    // Which role do you want to adding to the selected employee?
    // ****** ADD LIST OF EMPLOYEES
];


// Main menu function
function menuOptions() {
    
    inquirer
        .prompt(mainMenu)
        .then((data) => {
 
            switch (data.questions) {
                case "View All Employees":
                    showEmployees();
                  break;
                case "Add Employee":
                    employee();
                  break;
                case "Update Employee Role":
                    updateEmployeeRole();
                  break;
                case "View All Roles":
                    showRoles();
                  break;
                case "Add Role":
                    role();
                  break;
                case "View All Departments":
                    showDepartements();
                  break;
                case "Add Department":
                    departement();
                  break;
                case "Quit":
                    console.log("Thanks, have a great day!");
                    process.exit();
                  break;
                default:
                    console.log("Menu selection error")
              }
        });
}

// Show all employees
function showEmployees(){

    connection.query(
        "SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.log(res);
            menuOptions();
        }
    )
}


// Add a new employee
function employee(){

    inquirer
        .prompt(addEmployee)
        .then((data) => {

            const newEmployee = new Employee(data.firstName, data.lastName)

            // Show main manu
            menuOptions();
        });
}

// Update existing employee role
function updateEmployeeRole(){

    inquirer
        .prompt(updateRole)
        .then((data) => {



            // Show main manu
            menuOptions();
        });
}

// Show all roles
function showRoles(){

    connection.query(
        "SELECT * FROM roles",
        function (err, res) {
            if (err) throw err;
            console.log(res);
            menuOptions();
        }
    )
}

// Add a new role
function role(){
    // Add Role
}

// Show all departements
function showDepartements(){
    connection.query(
        "SELECT * FROM departement",
        function (err, res) {
            if (err) throw err;
            console.log(res);
            menuOptions();
        }
    )
}

// Add a new departement
function departement(){

    inquirer
        .prompt(addDepartement)
        .then((data) => {

            const newDepartement = new Departement(data.name);

            // Show main manu
            menuOptions();
    });
}

console.log(splash);
menuOptions();