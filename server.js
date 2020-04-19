if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

// Db
const db = require('./models');

// Init BodyParser
app.use(bodyParser.json());



// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// ejs
app.set('view engine', 'ejs');

// Using json
app.use(express.json());

// Home
// app.get('/', (req, res) => {
//     res.send('Home Page');
// });

app.get('/order', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('order', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      const itemsJson = JSON.parse(data)
      const itemsArray = itemsJson.menu;
      let total = 0
      req.body.items.forEach(function(item) {
        const itemJson = itemsArray.find(function(i) {
          return i.id == item.id
        })
        total = total + itemJson.price * item.quantity
      })

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'usd'
      }).then(function() {
        console.log('Charge Successful')
        res.json({ message: 'Successfully purchased items' })
      }).catch(function() {
        console.log('Charge Fail')
        res.status(500).end()
      })
    }
  })
})

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