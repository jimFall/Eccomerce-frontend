const ErrorHandler = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchasyncerror");
const user = require("../models/usermodels");
const sendtoken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//function for Register user////////////////////////////////
exports.rigisteruser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

console.log("myclouddddddddd",{
  name,
  email,
  password,
  public_id: myCloud.public_id,
  url: myCloud.secure_url,
})

  const User = await user.create({
    name,
    email,
    password,
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  });
  // console.log("user", User);

  // const token = User.getJWTToken()
  // res.status(201).json({
  //     success: true,
  //     token

  // })
  //token can replace jwt function

  sendtoken(User, 201, res);
});

//login user

exports.LoginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both`
  if (!email || !password) {
    return next(new ErrorHandler("please Enter Email and password"));
  }
  const User = await user.findOne({ email }).select("+password");
  if (!User) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await User.comparepasswords(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // const token = User.getJWTToken()
  // res.status(200).json({
  //     success: true,
  //     token

  // })
  //token can replace jwt function

  sendtoken(User, 200, res);
});

//logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logged out",
  });
});

//forget password
exports.forgetpassword = catchAsyncError(async (req, res, next) => {
  const User = await user.findOne({
    email: req.body.email,
  });

  if (!User) {
    return next(new ErrorHandler("user not found", 404));
  }

  //get reset password token

  const resettoken = User.getResetpasswordToken();

  await User.save({ validateBeforeSave: false });

  const resetpasswordurl = `${process.env.FRONTED_URL}/password/reset/${resettoken}`;

  const message = `your password reset token is :-\n\n${resetpasswordurl}\n\nif you have not requested this email then,please ignore it.`;
  // console.log(User)
  // console.log(resettoken)
  // console.log(resetpasswordurl)

  try {
    await sendEmail({
      email: User.email,
      subject: `Ecommerce password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${User.email}successfully`,
    });
  } catch (error) {
    console.log("errorrrrrr", error);

    User.resetpasswordtoken = undefined;
    User.resetpasswordexpire = undefined;
    await User.save({ validateBeforeSave: false });
    return next(new ErrorHandler("error.messsage,500"));
  }
});

//reset password---------------

exports.resetpassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token) //jo token req hua hai use acces kr rhe h
    .digest("hex");
  const User = await user.findOne({
    resetpasswordtoken,
    resetpasswordexpire: { $gt: Date.now() },
  });

  if (!User) {
    return next(
      new ErrorHandler("Reset password token is invalid has been expire", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not password", 400));
  }

  User.password = req.body.password;
  User.resetpasswordtoken = undefined;
  User.resetpasswordexpire = undefined;
  await User.save();

  sendtoken(User, 200, res);
});

//Get User Detales

exports.getuserdetales = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.User.id);
  res.status(200).json({
    success: true,
    User,
  });
});

//Change user password//ya upateuser password
exports.changeUserpassword = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.User.id).select("+password");

  const isPasswordMatched = await User.comparepasswords(req.body.oldpassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password incorrect"), 400);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not Match"), 400);
  }

  User.password = req.body.newPassword;

  await User.save();

  sendtoken(User, 200, res);
});

//update user profile

exports.updateuserprofile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,

    name: req.body.name,
  };

  //cloudnary added succusfully
  if (req.body.avatar !== "undefined") {
    const User = await user.findById(req.User.id);

    const imageId = User.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const User = await user.findByIdAndUpdate(req.User.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get All User

exports.GetAllUser = catchAsyncError(async (req, res, next) => {
  const Users = await user.find();

  res.status(200).json({
    success: true,

    Users,
  });
});

//get singal user detales(admin)
exports.getSingalUser = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.params.id);

  if (!User) {
    return next(
      new ErrorHandler("User does not exist with id:{req.params.id}", 400)
    );
  }

  res.status(200).json({
    success: true,

    User,
  });
});

//update user Role----Admin

exports.updateuserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,

    name: req.body.name,

    role: req.body.role,
  };
  console.log(newUserData);

  const User = await user.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//delet user ----Admin
exports.DeleteUser = catchAsyncError(async (req, res, next) => {
  //we will Remove cloudnary later

  const User = await user.findById(req.params.id);

  if (!User) {
    return next(
      new ErrorHandler("User does not exist with id:{req.params.id},", 400)
    );
  }
  await User.remove();

  res.status(200).json({
    success: true,
    message: "User delet Succesfully",
  });
});
