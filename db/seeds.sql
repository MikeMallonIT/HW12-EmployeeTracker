USE company_db;

INSERT INTO departement (departement_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal"),
       ("Management");


INSERT INTO roles (roles_title, roles_salary, departement_id)
VALUES ("Sales Lead", 150000, 5),
       ("Salesperson", 80000, 3),
       ("CTO", 140000, 5),
       ("Load Engineer", 60000, 1),
       ("Software Engineer", 75000, 1),
       ("Account Manager", 100000, 5),
       ("Accountant", 60000, 2),
       ("Legal Team Lead", 105000, 5),
       ("Lawyer", 120000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Mike", "Mallon", 1, null),
       ("Luke", "Anderson", 2, 1),
       ("Mitchell", "Carlson", 3, null),
       ("Ryan", "Shrier", 4, 3),
       ("Eric", "Crowel", 5, 3),
       ("Ryan", "Hopson", 6, null),
       ("Nicole", "Ambrose", 7, 6),
       ("Claire", "Sabers", 8, null),
       ("Hanna", "Ruttey", 9, 8);
