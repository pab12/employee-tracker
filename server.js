const db = require('./config/connection');
const mysql = require('mysql2');

// db.query(`DESCRIBE TABLE Department`, (err, result) => {
//   console.log(result);
// });

// db.query(`SELECT * FROM Department`, (err, result) => {
//   console.table(result);
// });

// db.query(`SELECT Role.id, Role.title, Role.salary, Department.name AS Department
//   FROM Role
//   LEFT JOIN Department
//   ON Role.department_id = Department.id`, (err,result)=> {
//     console.table(result);
//   });

const PORT = process.env.PORT || 3001;