USE employeesDataBase;

INSERT INTO department (name)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), 
("Accountant", 125000, 3), 
("Legal Team Lead", 250000, 4), 
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Sansa", "Stark", 1), 
("Kabir", "Faisal", 2), 
("Cersei", "Lannister", 3),
("Tyrion", "Lannister", 4), 
("Arya", "Stark", 5), 
("Jon", "Snow", 6), 
("Obi-Wan", "Kenobi", 7), 
("Han", "Solo", 5), 
("Daisy", "Rey", 4); 
