USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("FieldTeam");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("SDET", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("QA Engineer", 85000, 2;
INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 97000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sansa", "Stark", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kabir", "Faisal", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arya", "Stark", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyrion", "lannister", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cersei", "lannister", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brienne", "Gwendoline", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Cruise", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Snow", 1, 2);

