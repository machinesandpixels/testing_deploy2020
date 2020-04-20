const express = require('express');
const request = require('request');
const https = require('https');
const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
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

router.get('/about', (req, res) => {
  res.sendFile('views/about.html', {
      root: __dirname + '/../'
  });
})

router.post('/', (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  console.log(firstName);
  console.log(lastName);
  console.log(email);

  let data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  let signup = JSON.stringify(data);
  
  const url=`https://us4.api.mailchimp.com/3.0/lists/${mailchimpListId}`;
  
  const options = {
    method: "POST",
    auth: `roundhound2020:${mailchimpApiKey}`
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200){
      res.sendFile('views/success.html', {
        root: __dirname + '/../'
    });
    }
    else{
      res.send('failed');
    }
    // res.on("data", function(data){
    //   console.log(JSON.parse(data));
    // });
  });

  request.write(signup);
  request.end();

});


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