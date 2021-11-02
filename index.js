// Initilize packages needed for app to work
const fs = require('fs');
var inquirer = require('inquirer');

// Require classes
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");

// Main menu questions
const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'questions',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
    'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    }
]

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

const employeeManager = 
`
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                                                                                                      
███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗        
████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗       
██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝       
██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗       
██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║       
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝                                                                                         
`;

// Main menu function
function menuOptions() {
    
console.log(employeeManager);

    inquirer
        .prompt(menu)
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
                  break;
                default:
                    console.log("Menu selection error")
              }
        });
}

// Show all employees
function showEmployees(){

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

function updateEmployeeRole(){

    inquirer
        .prompt(updateRole)
        .then((data) => {



            // Show main manu
            menuOptions();
        });
}

function showRoles(){

}

function role(){
    // Add Role
}

function showDepartements(){

}

function departement(){

    inquirer
        .prompt(addDepartement)
        .then((data) => {

            const newDepartement = new Departement(data.name);

            // Show main manu
            menuOptions();
    });
}

menuOptions()

