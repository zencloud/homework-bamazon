CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE store_inventory (
	ID INT NOT NULL AUTO_INCREMENT,
	item_name VARCHAR(40) NOT NULL,
	item_dept VARCHAR(40) NOT NULL,
	item_price DECIMAL (13, 2) NOT NULL,
	item_stock INT NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Eggs", "Grocery", 1.50, 30);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Bread", "Grocery", 2.50, 25);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Cheese", "Grocery", 5.00, 100);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Nice Shirt", "Clothing", 79.99, 3);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Dress Socks", "Clothing", 39.99, 8);

INSERT INTO store_inventory (item_name, item_dept, item_price, item_stock)
VALUES ("Headphones", "Electronics", 299.99, 5);