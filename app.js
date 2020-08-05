const express = require('express');
const app = express();

// import routes
const authRoute = require('./routes/auth');

app.listen(3000, () => console.log(`The server has started in port 3000 - http://localhost:3000/`));