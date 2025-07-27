export const sendToken = (user, statusCode, res, message) => {
  const taken = user.geJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *1000
    ),
    httpOnly: true,
  }
  res.status(statusCode).cookie("token", taken, options).json({
    success: true,
    user,
    message,
    taken,
  })
};