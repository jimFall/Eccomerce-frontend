const { stackTraceLimit } = require("..//utils/errorhander");
const ErrorHandler = require("..//utils/errorhander")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;//Its Working//
    err.message = err.message || "internal servar error";//Its Working//


    //Wrong Mongodb id Error Small Big Etc--
    if (err.name === "CastError") {

        const message = `Resource not found.invalid:${err.path}`;
        err = new ErrorHandler(message, 400);

    }


    res.status(err.statusCode).json({

        success: false,

        error: err.message
        //message clear krke Stack bhi use kr skte h file errorhandler.js //

    });

};

