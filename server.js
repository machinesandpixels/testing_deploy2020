if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

// Db
const db = require('./models');

// Init BodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Init Routes
const routes = require('./routes');

// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// ejs
app.set('view engine', 'ejs');

// Using json
app.use(express.json());

// VIEW ROUTES
app.use('/', routes.views);

// HTML Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Page Not Found</h2>');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});