DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(10, 2),
  stock_quantity INT(10),
  product_sales DECIMAL (10, 2),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 12.50, 100), ("HP Spectre", "Electronics", 1250.00, 10), ("Samsung Galaxy S10", "Electronics", 950.00, 10), ("Oscillating Fan", "Household", 32.50, 50), ("Dyson Ball Vacuum", "Household", 125.00, 30), ("64oz Water Bottle", "Outdoors", 15.00, 200), ("Cliff Bars", "Food", 2.50, 1000), ("Bang Energy Drink", "Food", 1.50, 1500), ("Nixon Mission Smartwatch", "Electronics", 550.00, 60), ("Backpack", "Outdoors", 32.00, 65);