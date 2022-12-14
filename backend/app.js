const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

// Sequelize Error-Handler
const { ValidationError } = require('sequelize');

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

//import routes
const routes = require('./routes');
app.use(routes); //connect all the routes

//Resource Not Found Error-Handler
app.use((_req,_res,next)=>{
  const err = new Error("The requested resource couldn't be found.")
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
})

// Sequelize Error-Handler
app.use((err, _req, _res, next)=> {
  if( err instanceof ValidationError ) {
    err.errors = err.errors.map((e)=> e.message);
    err.title = "Validation error"
  }
  next (err)
})

//Error Formatter Error-Handler
app.use((err, _req, res, _next)=> {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  })
})













//bottom
module.exports = app
