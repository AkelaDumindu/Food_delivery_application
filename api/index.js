const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();

// const customerRoute = require('./route/customerRoute');
const userRoute = require('./route/userRoute');
const productRoute = require('./route/productRoute');
// const orderRoute = require('./route/orderRoute');

const app = express();
app.use(cors())
const port = process.env.SERVER_PORT || 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/resturant_delivery')
.then(() => {
    app.listen(port, () => {
        console.log(`API started & running on port ${port}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
});

// Root route
app.get('/', (req, resp) => {
    resp.send('<h1>Server Works!</h1>');
});

// Customer route
// app.use('/api/v1/customers', userRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);
// app.use('/api/v1/orders', orderRoute);


module.exports = app;
