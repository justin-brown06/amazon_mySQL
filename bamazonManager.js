const mysql = require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    appStart();
});

let blue = chalk.blue;
let green = chalk.green;
let red = chalk.red;
let productArr = [];
let line = chalk.gray("-------------------------")

function appStart() {
    console.log(green("\n************WELCOME TO BAMAZON (Manager Edition)!***********\n"))
    initOption();
};

function initOption() {

    inquirer
        .prompt([

            {
                type: "list",
                message: chalk.inverse("What would you like to do: \n"),
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Bamazon"],
                name: "option",
            },
        ]).then(function (res) {

            switch (res.option) {
                case ("View Products for Sale"):
                    viewProducts();
                    break;
                case ("View Low Inventory"):
                    viewLow();
                    break;
                case ("Add to Inventory"):
                    addInv();
                    break;
                case ("Add New Product"):
                    newProducts();
                    break;
                case ("Exit Bamazon"):
                    exit();
                    break;
            }
        });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (i) {
            console.log("\n--------- Item ID: " + red(i.item_id) + " ------------")
            console.log(green("Product: ") + blue(i.product_name) + green("\nPrice: $") + blue(i.price) + green("\nQuantity: ") + blue(i.stock_quantity));

        });
        initOption();
    });
};

function viewLow() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (i) {
            if (i.stock_quantity < 5) {
                console.log(chalk.gray("\n----------") + red("ALERT!") + chalk.gray("----------\n") + blue(i.product_name + " has low inventory.\nItem ID: " + i.item_id + "\nCurrent Inventory: " + i.stock_quantity));
                console.log(line);
            };
        });
        console.log(line);
        console.log(green("Looks like all inventories not listed are doing good!"));
        console.log(line);
        initOption();
    });
};

function addInv() {
    products();
    // console.log(red("Sorry we are still under development!"))
    // exit();
};

function products() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (i) {
            // console.log("Item " + count++  + ": " + red(i.item_name) + " highest bid is: " + red(i.highest_bid) + ".");
            // console.log(i.item_name)
            productArr.push(i.item_id);
        });
        productId();
    });
};

function productId() {
    inquirer
        .prompt([
            {
                type: "input",
                message: chalk.inverse("Enter a product ID to add Inventory:"),
                name: "product"
            }
        ]).then(function (resProduct) {
            // console.log(resSongs.product)
            addInventory(resProduct.product);
        });
};

// function grabHighestBid(productId) {
//     connection.query("SELECT * FROM products WHERE item_id = ?", [productId], function (err, res) {
//         if (err) throw err;

//         res.forEach(function(i){
//             console.log("-----------Product " + i.item_id + "------------")
//             console.log("\nSong Name: " + red(JSON.stringify(i.song_name)));
//             console.log("Release Year: " + red(JSON.stringify(i.year)));
//             console.log("------------------------------")
//         });
//         initOption();
//     });
// };

function addInventory(product) {
    inquirer
        .prompt([
            {
                type: "input",
                message: chalk.inverse("How many would you like to add?"),
                name: "userPurchase"
            }
        ]).then(function (resPurchase) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [product], function (err, res) {

                let newQuantity = res[0].stock_quantity + parseInt(resPurchase.userPurchase);

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: product
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;

                        console.log("\nCongratulations! You added to your invento!");
                        console.log("----------------------------------");
                        console.log("Your new quantity is: " + newQuantity);
                        console.log("----------------------------------");
                        initOption();
                    }
                );
            });

        });
}

function newProducts() {
    // console.log("Inserting a new bid item...\n");
    inquirer
        .prompt([

            {
                type: "input",
                message: "What product would you like to add?",
                name: "item",
            },
            {
                type: "input",
                message: "What department will it be sold in?",
                name: "category",
            },
            {
                type: "input",
                message: "What will the price of the product be?",
                name: "price",
            },
            {
                type: "input",
                message: "How many would you like to?",
                name: "quantity",
            }
        ]).then(function (resItem) {
            connection.query(

                "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(" + JSON.stringify(resItem.item) + ", " + JSON.stringify(resItem.category) + ", " + JSON.stringify(resItem.price) + ", " + JSON.stringify(resItem.quantity) + ")"

            );
            // console.log(query.sql);
            console.log(line)
            console.log("-----Your new product has been added!-----");
            console.log(line);
            initOption();
        });
};

function exit() {
    connection.end()
}