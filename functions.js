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
    module.exports.items_render();
});


// Setup Module export
module.exports = {

    // Welcome Function
    welcome: function () {

        inq.prompt([
            {
                name: "question",
                message: "Hello!"
            }
        ]).then(function (res) {
            //
        });


    },

    //
    items_render: function () {

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
            //console.log(results);
        });
    }
}