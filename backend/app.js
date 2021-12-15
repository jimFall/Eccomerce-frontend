const express = require("express");

const app = express();
const morgan = require('morgan')
const cookieparser = require("cookie-parser");

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieparser())
app.use(morgan('dev'))
//route import

const product = require('./routes/productRoute');

const user = require('./routes/userRouts');

const order = require('./routes/orderroute');


app.use('/api/v1', product)

app.use('/api/v1', user);

app.use("/api/v1", order)
//Middleware for error
app.use(errorMiddleware);

module.exports = app;








