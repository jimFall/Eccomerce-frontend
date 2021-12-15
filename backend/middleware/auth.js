const ErrorHandler = require('../utils/errorhander')
const catchAsynceError = require('./catchasyncerror')
const jwt = require('jsonwebtoken')

const User = require('../models/usermodels')

exports.isAuthenticated = catchAsynceError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {

        return next(new ErrorHandler("Please Login to access this resource", 401));

    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    await User.findById(decodedData.id)

    req.User = await User.findById(decodedData.id)
    next()
})
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.User.role)) {

            return next(new ErrorHandler(`Role:${req.User.role} is not allowed to acces this resouce`, 403))

        }
        next()
    }
}