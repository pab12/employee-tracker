const inquirer = require('inquirer');
const db = require('./config/connection');
let array = ['none'];

// main menu  where they will be sent back to after every completed choice option
mainMenu();
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',

        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View All roles',
          'View All Employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'update an employee role',
          // 'View All Employees By Department',
          // 'View All Employees By Manager',
          // 'Add Employee',
          // 'Remove Employee',
          // 'Update Employee Role',
          // 'Update Employee Manager',
          'Done'
        ]
      }
    ]).then(result => {
      let choice = result.choice;

      switch (choice) {
        case 'View all departments':
          getDepartment();
          break;
        case 'View All Employees':
          getEmployee();
          // call function for Employees
          break;

        case 'View All roles':
          getRole();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'update an employee role':

          break;
        case 'Done':

          break;

      }
    });
};

// see role table
function getRole() {
  db.query(`SELECT Role.id, Role.title, Role.salary, Department.name AS Department
  FROM Role
  LEFT JOIN Department
  on Role.department_id = Department.id`, (err, result) => {
    console.table(result);
    return mainMenu();
  });
};

// see department table
function getDepartment() {
  db.query(`SELECT * FROM Department`, (err, result) => {
    console.table(result);
    return mainMenu();
  });
};

// gets all employees id, first and last name, title, department name, salary, and manager
function getEmployee() {
  db.query(`SELECT E1.id, E1.first_name, E1.last_name,
   role.title, department.name AS Department, role.salary, CONCAT(Mgr.first_name,' ', Mgr.last_name) AS Manager
   FROM employee E1 LEFT JOIN employee Mgr
  ON E1.manager_id = Mgr.id
  LEFT JOIN role
  ON E1.role_id = role.id
  LEFT JOIN department
  ON role.department_id = department.id
  
  `, (err, result) => {
    console.table(result);
    if (err) throw err;
    return mainMenu();
  })
};

// add department to the db table
function addDepartment() {
  inquirer
    .prompt([{
      message: 'What is the department name?',
      name: 'departmentName',
      type: 'input'
    }]).then((results) => {
      let name = results.departmentName;
      db.query(`INSERT INTO department (name) VALUES ('${results.departmentName}')`, (err, newName) => {
        if (err) throw err;
        return mainMenu();
      });
    })
};

// add role to db table
function addRole() {
  inquirer
    .prompt([{
      message: 'What is the role you want to add?',
      type: 'input',
      name: 'roleName'
    },
    {
      message: 'What is the salary for the position?',
      type: 'number',
      name: 'roleSalary'
    },
    {
      message: 'What is the department id number?',
      type: 'number',
      name: 'roleDepartment'
    }
    ]).then((results) => {
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${results.roleName}', ${results.roleSalary}, ${results.roleDepartment});`, (err, results) => {
        if (err) throw err;
        return mainMenu();
      })
    })
};

// add an employee to database table
function addEmployee() {
  employeesManager();
  inquirer
    .prompt([
      {
        message: 'What is the Employees first name?',
        type: 'input',
        name: 'firstName'
      },
      {
        message: 'What is the Employees last name?',
        type: 'input',
        name: 'lastName'
      },
      {
        message: 'What is their role id?',
        type: 'number',
        name: 'roleId'
      },
      {
        message: 'Who is this employees manager?',
        type: 'list',
        name: 'manager',
        choices: array
      }
    ]).then((results) => {
     // compares if the results.manager = employees first and last name then sets theID variable to the corresponding row of employee
      db.query(`SELECT *, employee.id FROM employee`, (err, emDB) => {
        let theId = null;
        for (let i = 0; i < emDB.length; i++) {
          console.log(i);
          if (emDB[i].first_name + ' ' + emDB[i].last_name === results.manager) {
            theId = emDB[i].id;
          };
        }
        // take in both data sets we get from their answers and the corresponding id
        db.query(`INSERT INTO Employee(first_name,last_name,role_id,manager_id) VALUES ('${results.firstName}','${results.lastName}', ${results.roleId},${theId});`, (err, results) => {
          if (err) throw err;
          return mainMenu();
        })
      })

    })
};

function employeesManager() {
// gets the names for the choices options for manager names
  db.query(`SELECT Employee.*, role.title FROM Employee
  LEFT JOIN role
  ON Employee.role_id = role.id`, (err, result) => {
   
    empty();

    for (let i = 0; i < result.length; i++) {

      array.push(`${result[i].first_name} ${result[i].last_name}`);
      if (result[i].first_name + " " + result[i].last_name === array[i]) {
        // console.log("It's a Match");
      };
    };
  });
};

function empty() {
  //empty the array.
  array.length = 1;
};