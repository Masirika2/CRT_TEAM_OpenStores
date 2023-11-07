const express = require('express');
const mongoose = require('mongoose');
const Order = require('./order'); // Exporting model

// Calling Express to serve the application
const app = express();
exports.app = app;

// Connecting to the MongoDB
mongoose.connect('mongodb+srv://masirika:goma2023.com@cluster0.hqy9pky.mongodb.net/Cus_ord_num?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Confirming connection to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function () {
    console.log('Connected to Cus_ord_num');
});
app.use(express.urlencoded({ extended: true }));

// Setting up a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
});

// Handling the form request to save orders to the database
app.post('/order', async (req, res) => {
    const { ornumber, orname } = req.body;

    try {
        const existingOrder = await Order.findOne({ ornumber: ornumber });

        if (existingOrder) {
            res.status(400).send('Order number already exists. Please use a different order number.');
        } else {
            const order = new Order({ ornumber: ornumber, orname: orname });
            await order.save();
            console.log(order.ornumber + ', is Received and Saved');
            res.send('Order is Received and saved');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while saving order');
    }
});


// Route to retrieve and display orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({}); // Retrieve all orders from the database

        if (orders.length === 0) {
            res.send('No orders found.'); // If there are no orders, send a message to the user
        } else {
            let ordersTable = `
                <h2>Orders:</h2>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Order Number</th>
                                <th>Order Name</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            orders.forEach(order => {
                ordersTable += `
                    <tr>
                        <td>${order.ornumber}</td>
                        <td>${order.orname}</td>
                    </tr>
                `;
            });

            ordersTable += `
                        </tbody>
                    </table>
                </div>
            `;
            res.send(`
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                ${ordersTable}
            `); // Send the styled HTML table of orders back to the user
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while retrieving orders');
    }
});

// Starting the app
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
