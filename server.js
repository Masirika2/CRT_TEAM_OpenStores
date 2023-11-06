const express = require('express');
const { MongoClient } = require('mongo');

const app = express();
const port = 3000;

// Connection URL and Database Name
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const dbName = 'yourDatabaseName'; // Replace with your database name

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);

    // Define your API endpoints
    // For example, if you want to retrieve order data
    app.get('/orders', async (req, res) => {
      const orders = await db.collection('orders').find({}).toArray();
      res.json(orders);
    });

    // Add an order to the database
    app.post('/orders', async (req, res) => {
      const newOrder = { orderNumber: req.body.orderNumber, /* other order details */ };
      const result = await db.collection('orders').insertOne(newOrder);
      res.status(201).json(result.ops[0]);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
