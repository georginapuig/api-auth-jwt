const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to db
mongoose.connect();

// import routes
const authRoute = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log(`The server has started in port 3000 - http://localhost:3000/`));