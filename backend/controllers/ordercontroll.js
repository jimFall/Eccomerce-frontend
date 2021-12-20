const Order = require('../models/ordermodel')
const Product = require("../models/productmodel")
const ErrorHandler = require("../utils/errorhander")
const catchAsyncError = require("../middleware/catchasyncerror")


//create new order

exports.neworder = catchAsyncError(async (req, res, next) => {

    const { shippingifo,
        orderitems,
        Paymentinfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice
    } = req.body

    const order = await Order.create({
        shippingifo,
        orderitems,
        Paymentinfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice,
        PaidAt: Date.now(),
        User: req.User._id

    })

    res.status(200).json({
        success: true,
        order

    })

});

///get singal order
exports.singalorder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("User", "name email")

    if (!order) {

        return next(new ErrorHandler("order not Found with this id with this id ", 404));

    }

    res.status(200).json({
        success: true,
        order,
    })

})

//get logged in user orders seee

exports.myorders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ User: req.User._id })

    res.status(200).json({
        success: true,
        orders,
    })

})

//get all order admin

exports.getallorders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalamount = 0

    orders.forEach((order) => { totalamount += order.totalprice })

    console.log(totalamount)

    res.status(200).json({
        success: true,
        orders,
        totalamount,
    })

})

//update order status admin

exports.updateorder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {

        return next(new ErrorHandler("order not Found with this id with this id ", 404));

    }

    if (order.orderstatus === "Deliverd") {
        return next(new ErrorHandler("you have already delivered this order", 400));

    }

    order.orderitems.forEach(async (order) => {
        //database mai order mai orderitems ke inside jo product or quantity hai bo hai ye order product,order qunatity
        await updateStock(order.product, order.quantity)

    }

    )
    //jab status deleverver ho chuka ho tab

    order.orderstatus = req.body.status

    if (req.body.status === "Deliverd") {

        order.deleveredAt = Date.now()

        await order.save({ validateBeforeSave: false })

    }

    res.status(200).json({
        success: true,
    })

})

async function updateStock(id, quantity) {

    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })

}


// Delet order-----admin

exports.deleteorder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {

        return next(new ErrorHandler("order not Found with this id", 404));
    }
    await Order.remove()

    res.status(200).json({
        success: true,
    })

})







