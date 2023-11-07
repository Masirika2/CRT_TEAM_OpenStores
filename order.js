const mongoose = require('mongoose');

// creating order schema
const orderSchema = new mongoose.Schema({
    ornumber: { type: String }, // Assuming ornumber is a string
    orname: { type: String }, // Assuming orname is a string
});

// calling mongoose to create the model
const Order = mongoose.model('Order', orderSchema);

// exporting order module
module.exports = Order;
