const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userschema = new mongoose.Schema({

    name: {

        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters"],

    },
    email: {

        type: String,
        required: [true, "please Enter your email "],
        unique: true,
        validate: [validator.isEmail, "please Enter a  valid Email"]

    },

    password: {
        type: String,
        required: [true, "please Enter your password "],
        minlength: [8, "password should be greater than 8 characters"],
        select: false

    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },

    role: {

        type: String,
        default: "user"
    },
    resetpasswordtoken: String,
    resetpasswordexpire: Date,
})


userschema.pre("save", async function (next) {

    if (!this.isModified("password")) {

        next();

    }

    this.password = await bcrypt.hash(this.password, 10)


})

//JWT TOKEN

userschema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

        expiresIn: process.env.JWT_EXPIRE

    })
}

//compare password


userschema.methods.comparepasswords = async function (enteredpassword) {


    return await bcrypt.compare(enteredpassword, this.password)
}


//genrating password reset TOKEN


userschema.methods.getResetpasswordToken = function () {

    //generting token/////-

    const resettoken = crypto.randomBytes(20).toString("hex");

    //hasing and adding to user schema using forgetpassword to see reset password token

    this.resetpasswordtoken = crypto.createHash("sha256").update(resettoken).digest("hex");
console.log(this.resetpasswordtoken)//---saving reset password token

    this.resetpasswordexpire = Date.now() + 15 * 60 * 1000

    return resettoken

}

module.exports = mongoose.model("user", userschema);