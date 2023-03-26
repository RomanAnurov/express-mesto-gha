const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(() => {
  console.log('Connected');
})
.catch((error) => {
  console.log(`Error during connection ${error}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '641c985f8ff7aa519dba9605' 
  };

  next();
});

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  console.log(`Listing on port ${PORT}`)
});


app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardRouter);

