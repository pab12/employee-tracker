USE employee_tracker_db;

INSERT INTO Department (name)
VALUES
('Sales'),
('Legal'),
('HR');
INSERT INTO Role (title, salary, department_id)
VALUES
('Software Engineer',80000,1),
('Sales Lead',50000,2),
('HR officer',45000,3);

-- INSERT INTO Employee (first_name, last_name, role_id)
-- VALUES
-- ('Paul','Barcenas', 1),
-- ('Jared','Garcia', 2);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('Carl','Jones',2,NULL),
('Paul','Barcenas',1,1);