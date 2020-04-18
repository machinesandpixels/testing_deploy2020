if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const STRIPE_SECRET = process.env.SECRET_KEY;
const STRIPE_PUBLIC = process.env.PUBLIC_KEY;
const fs = require('fs');


console.log(STRIPE_PUBLIC);
console.log(STRIPE_SECRET);
// Db
const db = require('./models');

// Init BodyParser
app.use(bodyParser.json());



// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// ejs
app.set('view engine', 'ejs');

// Home
// app.get('/', (req, res) => {
//     res.send('Home Page');
// });

app.get('/store', (req, res) => {
  // res.render('stores');
    fs.readFile('items.json', function(error, data){
      if (error){
        res.status(500).end();
      }

      else{
        res.render('stores.ejs', {
          STRIPE_PUBLIC: STRIPE_PUBLIC,
          items: JSON.parse(data)
        });
      }
    })
});

app.post('/purchase', (req, res) => {
  // res.render('stores');
    fs.readFile('items.json', function(error, data){
      if (error){
        res.status(500).end();
      }

      else{
        console.log('purchase');
      }
    })
});

// app.get('/checkout', (req, res) => {
//     // res.json({
//     //     "name": "little",
//     //     "price": 8
//     // });

//     db.Product.find({}, (err, allProducts) => {
//         if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//         res.json(allProducts);
//       });
// });

// // Post routes
// app.post('/checkout', (req, res) => {
    
//     // POST Create
//     const create = (req, res) => {
//     console.log(req.body); // Without body-parser, body will be undefined
  
//     db.Product.create(req.body, (err, newProduct) => {
//       if (err) return res.json(err);
//         newProduct = {
//             "name": "little",
//             "price": 8
//         };
//       res.json(newProduct);
//     });
//     };

//     create(req, res);
// });

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});