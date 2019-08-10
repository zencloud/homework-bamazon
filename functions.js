const mysql = require('mysql');
const inq = require('inquirer');
const ConsoleTable = require('cli-table');

let conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypass',
    database: 'bamazon_db'
});

// Connect to Database
conn.connect(function (err) {
    if (err) throw err;
    module.exports.render_store_inventory();
});


// Setup Module export
module.exports = {

    // Welcome Function
    render_item_choice: function () {

        inq.prompt([
            {
                name: "itemID",
                message: "Please enter the ID of the product you wish to buy:"
            },
            {
                name: "itemAmount",
                message: "How many would you like to buy?"

            }
        ]).then(function (res) {

            // Set Item ID and Purchase Amount
            let itemID = res.itemID;
            let itemAmount = res.itemAmount;

            conn.query("SELECT * FROM store_inventory WHERE ID = ?", [itemID], function (err, res) {

                // Database Error
                if (err) throw err;

                // Result Invalid
                if (res.length === 0) {
                    console.log('Invalid Item ID, please try again');
                    module.exports.render_item_choice();
                }

                // Found Result
                if (res.length > 0) {

                    if (res[0].item_stock - itemAmount < 0) {
                        console.log('--------------------------------------------------');
                        console.log('Sorry! Not enough in stock!');
                        console.log('--------------------------------------------------');
                        module.exports.render_item_choice();
                    }

                    if (res[0].item_stock - itemAmount >= 0) {

                        // Purchase config
                        let cost = res[0].item_price * itemAmount;
                        let newStock = res[0].item_stock - itemAmount;

                        // Updates to SQL
                        let updateArray = [
                            { item_stock: newStock },
                            { ID: itemID }
                        ];

                        conn.query("UPDATE store_inventory SET ? WHERE ?", updateArray, function (err, data) {

                            // Print to Screen
                            console.log('--------------------------------------------------');
                            console.log(`Congrats! You bought (${itemAmount}) of ${res[0].item_name} for a total of $${cost}.`);
                            console.log('--------------------------------------------------');
                            module.exports.render_store_inventory();
                        });
                    }
                }
            });

        });
    },

    //
    render_store_inventory: function () {

        conn.query("SELECT * FROM store_inventory", function (err, results) {

            // Create new table
            let itemTable = new ConsoleTable({
                head: ['ID', 'Name', 'Cost', 'Stock'],
                colWidths: [5, 15, 10, 10]
            });

            // Loop through table and print result
            for (let i = 0; i < results.length; i++) {
                itemTable.push([results[i].ID, results[i].item_name, `$${results[i].item_price}`, results[i].item_stock]);
            }
            console.log('Welcome to Bamazon!');
            console.log('Please review our selection:');
            console.log(itemTable.toString());

            module.exports.render_item_choice();

        });
    }
}