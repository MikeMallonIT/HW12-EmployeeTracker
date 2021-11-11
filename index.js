// Initilize packages needed for app to work
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
});

// Require classes
const Employee = require("./lib/Employee");

// Require files with text variables
const mainMenu = require('./lib/mainMenu');
const splash = require('./lib/splash');


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
            console.table(res);
            menuOptions();
        }
    )
}

async function testResults() { 
    let roles = await getRoles();
    
    //console.log(roles);
    return roles;
    }


async function getRoles(){

    // let rolesArray = [];
    
    // const sql = `SELECT * FROM ROLES`
    // connection.query(sql, (err, res) => {
    //     rolesArray = res;
    // })

    // return rolesArray;

    const sql = `SELECT * FROM ROLES`;

    try{
        const results = await connection.promise().query(sql);

        return results;
    }

    catch (err){
        console.log("error");
        throw err;
    }  
};

        // for(let i=0; i<rolesArray.length; i++){
        //     output.push(rolesArray[i]);
            
        // }
        //console.log(rolesArray[1])
        //console.log(rolesArray[1].roles_title);
        


            //for(let i=0; i<rolesArray.length; i++){

            //    output.push(rolesArray[i]);
        

                        //    console.log(rolesArray[i].roles_id);
            //    console.log(rolesArray[i].roles_title);

            //rolesArray.forEach(function(entry){
                //console.log(entry);

            //})


//var a = ["a", "b", "c"];
//a.forEach(function(entry) {
//  console.log(entry);
//});

function log(data){
    console.log(data);
}

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
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'role',
        choices: ['1', '2', '3'],
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: ['1', '2', '3'],
    },
];

// Add a new employee
function employee(){

    inquirer
        .prompt(addEmployee)
        .then((data) => {
            console.log(data);

            //const newEmployee = new Employee(data.firstName, data.lastName, data.role, data.manager)

            const sql = `INSERT INTO employee SET ?`;

            var query = connection.query(
                sql,
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    roles_id: data.role,
                    manager_id: data.manager
                }
            )

            console.log(query.sql);

            // Show main manu
            menuOptions();
        });
}

const updateRole = [
    
    // Which employee’s role do you want to update?
    // ****** ADD LIST OF EMPLOYEES

    // Which role do you want to adding to the selected employee?
    // ****** ADD LIST OF EMPLOYEES
];


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
            console.table(res);
            menuOptions();
        }
    )
}

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
            console.table(res);
            menuOptions();
        }
    )
}

// Ask for departement name
const addDepartement = [
    {
        type: 'input',
        name: 'name',
        message: "What is the name of the departement?",
    }
];

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

//console.log(splash);
//menuOptions();
//getRoles();

//myFunc();


console.log(testResults());

