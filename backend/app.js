const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
app.use(express.json());
app.use(cookieparser());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//route import

const product = require("./routes/productRoute");

const user = require("./routes/userRouts");

const order = require("./routes/orderroute");

const payment = require("./routes/paymentroutes");

app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

app.use("/api/v1", payment);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
