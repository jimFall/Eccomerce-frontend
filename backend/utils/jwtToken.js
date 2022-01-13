//creting token and saving cookie

const sendtoken = (User, statusCode, res) => {
  const token = User.getJWTToken();
  //option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httponly: true,
  };
  console.log("User", statusCode);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    User,
    token,
  });
};

module.exports = sendtoken;
