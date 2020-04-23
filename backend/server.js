const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

require('dotenv').config();

const app = express();

// Connect to DB...
const mongoose = require('mongoose');
const URI =  process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
connection.then(
  () => {
    console.log('Database connected')
  },
  error => {
    console.log("Database can't be connected: " + error)
  }
);

// Add cors...
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Import Routes...
const indexRouter = require('./routes/index.route');
const usersRouter = require('./routes/users.route');
const customersRouter = require('./routes/customers.route');
const productsRouter = require('./routes/products.route');
const invoicesRouter = require('./routes/invoices.route');
const citiesRouter = require('./routes/cities.route');
const categoriesRouter = require('./routes/categories.route');
const administratorsRouter = require('./routes/administrators.route');
// const uploadsRouter = require('./routes/uploads.route');

// View engine setup...
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES...
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', customersRouter);
app.use('/products', productsRouter);
app.use('/invoices', invoicesRouter);
app.use('/cities', citiesRouter);
app.use('/categories', categoriesRouter);
app.use('/administrators', administratorsRouter);
// app.use('/uploads', uploadsRouter);

// Catch 404 and forward to error handler...
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler...
app.use((err, req, res, next) => {
  // Set locals, only providing error in devlopement...
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'devlopement' ? err : {};

  // Render the error page...
  res.status(err.status || 500);
  res.render('error');
});

// How to we start listening to the app...
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
