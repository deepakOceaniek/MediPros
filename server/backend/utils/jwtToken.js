//Creating Token and Saving in  cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    Secure: true,
    SameSite: "Lax",
  };
  // console.log(`token ${token}`);
  // console.log(`user ${user}`);
  console.log(`admiin ${token}`);
  res.status(statusCode).cookie("jwtoken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
