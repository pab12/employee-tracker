const inquirer = require('inquirer');
const db = require('./config/connection');

mainMenu();
function mainMenu(){
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
  ]).then(result=> {
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

      break;
      case 'update an employee role':

      break;
      case 'Done':

      break;

    }
  });
};


  // db.query(`SELECT * FROM Department`, (err, result) => {
  //   console.table(result);
  // });

  

function getRole() {
  db.query(`SELECT Role.id, Role.title, Role.salary, Department.name AS Department
  FROM Role
  LEFT JOIN Department
  on Role.department_id = Department.id`, (err,result)=> {
    console.table(result);
  });
};

function getDepartment(){
  db.query(`SELECT * FROM Department`, (err, result) => {
    console.table(result);
  });
};

function getEmployee(){
  db.query(`SELECT * FROM employee`, (err, result) => {
    console.table(result);
  } )
};

function addDepartment(){
  inquirer
  .prompt([{
    message: 'What is the department name?',
    name: 'departmentName',
    type: 'input'
  }]).then((results) => {
    let name = results.departmentName;
    db.query(`INSERT INTO department (name) VALUES ('${results.departmentName}')`, (err, newName) => {
      if(err)throw err;
      return mainMenu();
    });
  })
};

function addRole(){
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
      if(err) throw err;
      return mainMenu();
    })
  })
}