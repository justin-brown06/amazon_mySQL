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

function appStart() {
    console.log(green("\n************WELCOME TO BAMAZON!***********\n"))
    viewProducts()
};

function initOption() {

    inquirer
        .prompt([

            {
                type: "list",
                message: chalk.inverse("What would you like to do: \n"),
                choices: ["Purchase an item", "Exit Bamazon"],
                name: "option",
            },
        ]).then(function (res) {

            switch (res.option) {
                case ("Purchase an item"):
                    getProducts();
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
            console.log(green("Product: ") + blue(i.product_name) + green("\nPrice: $") + blue(i.price));

        });
        initOption();
    });
};

function getProducts() {
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
                message: chalk.inverse("Enter a product ID to purchase:"),
                name: "product"
            }
        ]).then(function (resProduct) {
            // console.log(resSongs.product)
            makePurchase(resProduct.product);
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

function makePurchase(product) {
    inquirer
        .prompt([
            {
                type: "input",
                message: chalk.inverse("How many would you like to purchase?"),
                name: "userPurchase"
            }
        ]).then(function (resPurchase) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [product], function (err, res) {
                if (parseInt(resPurchase.userPurchase) > parseInt(res[0].stock_quantity)) {
                    console.log(blue("\nSorry we don't have enough in stock for that purchase.\nPlease keep quantity at " + res[0].stock_quantity + " or less."));
                    makePurchase(product);
                } else {
                    let newQuantity = res[0].stock_quantity - parseInt(resPurchase.userPurchase);
                    let total = (res[0].price * parseInt(resPurchase.userPurchase));

                    // console.log(newQuantity)
                    // console.log(total)
                    // console.log(product)

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
                            // console.log(res.affectedRows + "Hello");
                            console.log("\nCongratulations! You made a purchase!");
                            console.log("----------------------------------");
                            console.log("Your total is: $" + total);
                            console.log("----------------------------------");
                            initOption();
                        }
                    );

                };
            });

        });
}

function exit() {
    connection.end()
}