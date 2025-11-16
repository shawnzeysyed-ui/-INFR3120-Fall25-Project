/* Install 3rd party packages */
const createError = require('http-errors'); 
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const DB = require('./db');

/* Routers connecting with routes in /routes */
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const assignmentRouter = require('../routes/assignment');

/* App using express */
const app = express();

/* Test DB connection */
if (!DB.URI) {
    console.error("MongoDB URI is undefined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const MongoDB = mongoose.connection;
MongoDB.on('error', console.error.bind(console, 'Connection error:'));
MongoDB.once('open', () => {
    console.log('Connected to MongoDB');
});

/* View engine setup */
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); 

/* Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

/* Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignment', assignmentRouter);

/* Catch 404 and forward to error handler */
app.use((req, res, next) => {
    next(createError(404));
});

/* Error handler */
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { title: "Error" });
});

module.exports = app;
