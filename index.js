
//require in your dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDataBase"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstPrompt();
});

// function which prompts the user for what action they should take
function firstPrompt(){
  inquirer.prompt([
  {
    type: 'list',
    name:'userOptions',
    message: 'What would you like to do?',
    choices: [
    'View All Employees',
    'View Employees By Department',
    'Add Employee',
    'Remove Employee',
    'Update Employee Role',
    'Add Role',
    'Add Department',
    'Exit'
    ]
      
  }

  ]).then((res)=>{
    console.log(res.userOptions);
    switch(res.userOptions){
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'View Employees By Department':
        viewEmployeesByDepartment();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Remove Employee':
        removeEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Exit':
        connection.end();
        break;
      }
      
    }).catch((err)=>{
  if(err)throw err;
  });
}

//// 1."View Employees"/ READ all, SELECT * FROM

function viewAllEmployees() {
  let query = 
  `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  LEFT JOIN employee manager
      ON manager.id = employee.manager_id`

  connection.query(query, (err, res)=>{
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

// Make a department array
function viewEmployeesByDepartment(){
  let query =
  `SELECT 
      department.id, 
      department.name, 
      role.salary
  FROM employee
  LEFT JOIN role 
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  GROUP BY department.id, department.name, role.salary`;

connection.query(query,(err, res)=>{
    if (err) throw err;
    const deptChoices = res.map((choices) => ({
        value: choices.id, name: choices.name
    }));
  console.table(res);
  getDept(deptChoices);
});
}

// User choose the department list, then employees pop up
function getDept(deptChoices){
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'department',
              message: 'Departments: ',
              choices: deptChoices
          }
      ]).then((res)=>{ 
      let query = `SELECT 
                      employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name
                  FROM employee
                  JOIN role
                      ON employee.role_id = role.id
                  JOIN department
                      ON department.id = role.department_id
                  WHERE department.id = ?`

      connection.query(query, res.department,(err, res)=>{
      if(err)throw err;
        firstPrompt();
        console.table(res);
      });
  })
}

// Make a employee array
function addEmployee() {
  let query = 
  `SELECT 
      role.id, 
      role.title, 
      role.salary 
  FROM role`

connection.query(query,(err, res)=>{
  if(err)throw err;
  const role = res.map(({ id, title, salary }) => ({
    value: id, 
    title: `${title}`, 
    salary: `${salary}`
  }));

  console.table(res);
  employeeRoles(role);
});
}

// insert new employee
function employeeRoles(role) {
  inquirer
    .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee First Name: "
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee Last Name: "
    },
    {
      type: "list",
      name: "roleId",
      message: "Employee Role: ",
      choices: role
    }
  ]).then((res)=>{
      let query = `INSERT INTO employee SET ?`
      connection.query(query,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId
      },(err, res)=>{
        if(err) throw err;
        firstPrompt();
    });
  });
}


//// 5."Remove Employees" / DELETE, DELETE FROM
function removeEmployee() {
  let query =
  `SELECT
      employee.id, 
      employee.first_name, 
      employee.last_name
  FROM employee`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`
    }));
    console.table(res);
    getDelete(employee);
  });
}

// User choose the employee list, then employee is deleted
function getDelete(employee){  
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Employee To Be Deleted: ",
        choices: employee
      }
    ]).then((res)=>{
      let query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: res.employee },(err, res)=>{
        if(err) throw err;
        firstPrompt();
      });
    });
}


//// 6."Update Employee Role" / UPDATE,
function updateEmployeeRole(){
  let query = `SELECT 
                  employee.id,
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.name, 
                  role.salary, 
                  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              JOIN role
                  ON employee.role_id = role.id
              JOIN department
                  ON department.id = role.department_id
              JOIN employee manager
                  ON manager.id = employee.manager_id`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
       name: `${first_name} ${last_name}`      
    }));
    console.table(res);
    updateRole(employee);
  });
}
function updateRole(employee){
  let query = 
  `SELECT 
    role.id, 
    role.title, 
    role.salary 
  FROM role`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    let roleChoices = res.map(({ id, title, salary }) => ({
      value: id, 
      title: `${title}`, 
      salary: `${salary}`      
    }));
    console.table(res);
    getUpdatedRole(employee, roleChoices);
  });
}
  
function getUpdatedRole(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Employee who's role will be Updated: `,
        choices: employee
      },
      {
        type: "list",
        name: "role",
        message: "Select New Role: ",
        choices: roleChoices
      },

    ]).then((res)=>{
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      connections.query(query,[ res.role, res.employee],(err, res)=>{
          if(err)throw err;
          firstPrompt();
        });
    });
}

//// 7."Add Role" / CREATE: INSERT INTO
function addRole(){
  var query = 
  `SELECT 
    department.id, 
    department.name, 
    role.salary
  FROM employee
  JOIN role
    ON employee.role_id = role.id
  JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    const department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`
    }));
    console.table(res);
    addToRole(department);
  });
}

function addToRole(department){
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: "
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: "
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department
      },
    ]).then((res)=>{
      let query = `INSERT INTO role SET ?`;

      connection.query(query, {
          title: res.title,
          salary: res.salary,
          department_id: res.department
      },(err, res)=>{
          if(err) throw err;
          firstPrompt();
      });
  });
}

//ADD DEPARTMENT
function addDepartment(){
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Department Name: "
    }
  ]).then((res)=>{
  let query = `INSERT INTO department SET ?`;
  connection.query(query, {name: res.name},(err, res)=>{
    if(err) throw err;
    //console.log(res);
    firstPrompt();
  });
});
}
