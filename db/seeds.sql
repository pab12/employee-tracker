USE employee_tracker_db;

INSERT INTO Department (name)
VALUES
('Sales'),
('Legal');

INSERT INTO Role (title, salary, department_id)
VALUES
('Manager',80000,1),
('Sales Lead',50000,2);


INSERT INTO Employee (first_name, last_name, role_id)
VALUES('Paul','Barcenas', 1);