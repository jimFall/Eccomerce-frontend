const mongoose = require("mongoose")

const product = require("../models/productmodel")

const user = require("./usermodels")

const oderschema = mongoose.Schema({

    shippingifo: {

        Address: { required: true, type: String },

        City: { required: true, type: String },

        state: { required: true, type: String },

        country: { required: true, type: String },

        Pincode: { required: true, type: Number },

        phonenumber: { required: true, type: Number },
    },
    orderitems: [

        {

            name: { required: true, type: String },

            price: { required: true, type: String },

            quantity: { required: true, type: Number },

            image: { required: true, type: String },

            product: {

                type: mongoose.Schema.ObjectId,
                ref: product,
                required: true,

            },
        }

    ],
    User: {

        type: mongoose.Schema.ObjectId,
        ref: user,
        required: true,

    },
    Paymentinfo: {
        id: { required: true, type: String },

        status: { required: true, type: String }
    },



    PaidAt: { required: true, type: Date },

    itemsprice: { required: true, default: 0, type: Number },

    taxprice: { required: true, default: 0, type: Number },

    shippingprice: { required: true, default: 0, type: Number },

    totalprice: { required: true, default: 0, type: Number },

    orderstatus: { required: true, default: "processing", type: String },

    deleveredAt: Date,

    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("order", oderschema);