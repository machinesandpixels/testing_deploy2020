const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;


// Db
const db = require('./models');

// Init BodyParser
app.use(bodyParser.json());

// Home
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/checkout', (req, res) => {
    res.json({
        "name": "little",
        "price": 8
    });
});

// Post routes
app.post('/checkout', (req, res) => {
    
    // POST Create
    const create = (req, res) => {
    console.log(req.body); // Without body-parser, body will be undefined
  
    db.Product.create(req.body, (err, newProduct) => {
      if (err) return res.json(err);
        newProduct = {
            "name": "little",
            "price": 8
        };
      res.json(newProduct);
    });
    };
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});