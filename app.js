const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler.js');
const tasksRouter = require('./routes/tasksRoute');

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

// middlewares;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// middleware for Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to the Database`);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// connect to Database
connectDB();
