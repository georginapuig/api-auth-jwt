const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));
  

// import routes
const authRoute = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log(`The server has started in port 3000 - http://localhost:3000/`));