const express = require('express');
const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

router.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname + '/../'
    });
})

router.get('/order', function(req, res) {
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

router.post('/purchase', function(req, res) {
  fs.readFile('items.json', function(error, data) {
      if (error) {
      res.status(500).end();
      } else {
      const itemsJson = JSON.parse(data)
      const itemsArray = itemsJson.menu;
      let total = 0;
      req.body.items.forEach(function(item) {
          const itemJson = itemsArray.find(function(i) {
          return i.id == item.id
          })
          total = total + itemJson.price * item.quantity;
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
          res.status(500).end();
      })
      }
  })
})

module.exports = router;