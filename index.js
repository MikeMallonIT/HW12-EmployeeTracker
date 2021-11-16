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
                    addEmployee();
                  break;
                case "Update Employee Role":
                    updateEmployeeRole();
                  break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                  break;  
                case "View All Roles":
                    showRoles();
                  break;
                case "Add Role":
                    addRole();
                  break;
                case "View All Departments":
                    showDepartements();
                  break;
                case "Add Department":
                    addDepartement();
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

// Display all of the employees, sort by either manager or departement
function showEmployees(){

    const runner = [
        {
            type: 'list',
            message: "How would you like to sort the data?",
            name: 'questions',
            choices: ['By departement', 'By manager'],
        },
    ]

    inquirer
        .prompt(runner)
        .then((data) => {
 
            switch (data.questions) {
                case "By departement":
                    connection.query(
                        "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.roles_title, roles.roles_salary, departement.departement_name, manager_id FROM employee INNER JOIN roles ON employee.roles_id = roles.roles_id INNER JOIN departement ON roles.departement_id = departement.departement_id ORDER BY departement.departement_name;",
                        function (err, res) {
                            if (err) throw err;
                            console.table(res);
                            menuOptions();
                        }
                    )
                  break;
                case "By manager":
                    connection.query(
                        "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.roles_title, roles.roles_salary, departement.departement_name, manager_id FROM employee INNER JOIN roles ON employee.roles_id = roles.roles_id INNER JOIN departement ON roles.departement_id = departement.departement_id ORDER BY employee.manager_id;",
                        function (err, res) {
                            if (err) throw err;
                            console.table(res);
                            menuOptions();
                        }
                    )
                  break;
                default:
                    console.log("Menu selection error")
              }
        });
}

// Add a new employee
async function addEmployee(){

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
        }
    ];

inquirer        
        .prompt(addEmployee)
        .then((data) => {
            //console.log("first, last", data);
            askRoleManager(data);
        })
}

// Helper function for addEmployee()
async function askRoleManager(firstLast) { 
    let roles = await getRoles();
    let managers = await getManagers();

    let otherRoles = roles[0];
    let final = [];

    for(let i=0; i<otherRoles.length; i++){

        final.push(otherRoles[i].roles_title);
    }


    let otherManagers = managers[0];
    let finalManagers = [];
    
    for(let i=0; i<otherManagers.length; i++){
        finalManagers.push(otherManagers[i].first_name+" "+otherManagers[i].last_name)
    }

    const runner = [
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'role',
            choices: final,
        },

        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: finalManagers,
        },
    ]

    inquirer        
        .prompt(runner)

        .then((data) => {
            //console.log("User selection", data);

            roleIndex = final.indexOf(data.role)+1;
            //console.log("ROLE INDEX", roleIndex);


            managerIndex = finalManagers.indexOf(data.manager)+1;
            //console.log("MANAGER INDEX", managerIndex);

            const sql = `INSERT INTO employee SET ?`;
      
            connection.query(sql,
                {
                    first_name: firstLast.firstName,
                    last_name: firstLast.lastName,
                    roles_id: roleIndex,
                    manager_id: managerIndex
                }
            )
            console.log(`* Employee "${firstLast.firstName} ${firstLast.lastName}" Added *`)
            // Show main manu
            menuOptions();
        })
}

// Update existing employee role
async function updateEmployeeRole(){

    let roles = await getRoles();
    let employees = await getEmployees();

    let otherRoles = roles[0];
    let final = [];

    for(let i=0; i<otherRoles.length; i++){

        final.push(otherRoles[i].roles_title);
    }


    let otherEmployees = employees[0];
    let finalEmployees = [];
    
    for(let i=0; i<otherEmployees.length; i++){
        finalEmployees.push(otherEmployees[i].first_name+" "+otherEmployees[i].last_name)
    }


    const runner = [
        {
            type: 'list',
            message: "Which employee's role would you like to update?",
            name: 'employee',
            choices: finalEmployees,
        },

        {
            type: 'list',
            message: "What would you like thier new role to be?",
            name: 'role',
            choices: final,
        },
    ]

    inquirer
        .prompt(runner)
        .then((data) => {
            //console.log("User selection", data);

            employeeIndex = finalEmployees.indexOf(data.employee)+1;
            //console.log("EMPLOYEE INDEX", employeeIndex);


            roleIndex = final.indexOf(data.role)+1;
            //console.log("ROLE INDEX", roleIndex);

            const sql = `UPDATE employee SET roles_id = ${roleIndex} WHERE employee_id = ${employeeIndex}`;
    
            connection.query(sql)

            console.log(`* Role Updated for ${data.employee} *`)
            // Show main manu
            menuOptions();
        })
}

// Update existing employee's manager
async function updateEmployeeManager(){

    let managers = await getManagers();
    let employees = await getEmployees();

    let otherManagers = managers[0];
    let final = [];

    for(let i=0; i<otherManagers.length; i++){

        final.push(otherManagers[i].first_name+" "+otherManagers[i].last_name);
    }


    let otherEmployees = employees[0];
    let finalEmployees = [];
    
    for(let i=0; i<otherEmployees.length; i++){
        finalEmployees.push(otherEmployees[i].first_name+" "+otherEmployees[i].last_name)
    }


    const runner = [
        {
            type: 'list',
            message: "Which employee's manager would you like to update?",
            name: 'employee',
            choices: finalEmployees,
        },

        {
            type: 'list',
            message: "Who would you like thier new manager to be?",
            name: 'manager',
            choices: final,
        },
    ]

    inquirer
        .prompt(runner)
        .then((data) => {
            //console.log("User selection", data);

            employeeIndex = finalEmployees.indexOf(data.employee)+1;
            //console.log("EMPLOYEE INDEX", employeeIndex);


            managerIndex = final.indexOf(data.manager)+1;
            //console.log("MANAGER INDEX", managerIndex);

            const sql = `UPDATE employee SET manager_id = ${managerIndex} WHERE employee_id = ${employeeIndex}`;
    
            connection.query(sql)

            console.log(`* Manager Updated for ${data.employee} *`)
            // Show main manu
            menuOptions();
        })
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

// Add a new role
async function addRole(){
    let departements = await getDepartements();

    let otherRoles = departements[0];
    let final = [];

    for(let i=0; i<otherRoles.length; i++){

        final.push(otherRoles[i].departement_name);
    }

    //console.log(departements);

    const runner = [
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the role",
        },
        {
            type: 'input',
            name: 'sal',
            message: "What is the salary of the role?",
        },
        {
            type: 'list',
            message: "Which departement does it belong to?",
            name: 'departement',
            choices: final,
        },
    ]

    inquirer
        .prompt(runner)
        .then((data) => {
            //console.log("User selection", data);

            departementIndex = final.indexOf(data.departement)+1;
            //console.log("DEPARTEMENT INDEX", departementIndex);

            const sql = `INSERT INTO roles SET ?`;
    
            connection.query(sql,
                {
                    roles_title: data.name,
                    roles_salary: data.sal,
                    departement_id: departementIndex
                }
            )
            console.log(`* Role "${data.name}" Added *`)
                // Show main manu
                menuOptions();
        })
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

// Add a new departement
function addDepartement(){

    const runner = [
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the departement",
        }
    ]    

    inquirer
        .prompt(runner)
        .then((data) => {

            const sql = `INSERT INTO departement SET ?`;
    
            connection.query(sql,
                {
                    departement_name: data.name
                }
            )

            console.log(`* Departement "${data.name}" Added *`)
            // Show main manu
            menuOptions();
    });
}

// Async function that returns Roles
async function getRoles(){

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

// Async function that returns Managers
async function getManagers(){

    const sql = `SELECT * FROM EMPLOYEE WHERE manager_id IS NULL`;

    try{
        const results = await connection.promise().query(sql);

            return results;
    }

    catch (err){
        console.log("error");
        throw err;
    }  
};

// Async function that returns Employees
async function getEmployees(){

    const sql = `SELECT first_name, last_name FROM EMPLOYEE`;

    try{
        const results = await connection.promise().query(sql);

            return results;
    }

    catch (err){
        console.log("error");
        throw err;
    }  
};

// Async function that returns departements
async function getDepartements(){
    const sql = `SELECT * FROM departement`;

    try{
        const results = await connection.promise().query(sql);
            return results;
    }
    catch (err){
        console.log("error");
        throw err;
    }  
};

// Show the splash screen then the main menu
console.log(splash);
menuOptions();