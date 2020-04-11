const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Home
app.get('/', (req, res) => {
    res.send('Home Page');
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});