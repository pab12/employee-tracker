const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',

      name: 'choices',
      message: 'What would you like to do?',
      choices: [
        'View All Employess',
        'View All Employess By Department',
        'View All Employess By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager'
      ]
    }
  ]);