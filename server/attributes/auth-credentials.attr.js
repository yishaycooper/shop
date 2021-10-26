const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    const [tokenType, userToken] = req.headers.authorization.split(" "); // Bearer token
    // if logged in
    if (tokenType === "Bearer") {
      try {
        const tokenData = jwt.verify(userToken, process.env.SECRET_KEY);
        req.user_id = tokenData.user_id;
        // console.log(req);
      } catch (ex) {
        req.user_id = null;
      }
    }
  }
  next();
};
