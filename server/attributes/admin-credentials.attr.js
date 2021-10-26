const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

module.exports = function (req, res, next) {
  const [tokenType, userToken] = req.headers.authorization.split(" ");
  try {
    const tokenData = jwt.verify(userToken, process.env.SECRET_KEY);
    req.user_id = tokenData.user_id;
    req.admin = tokenData.admin;
    if (tokenData.admin) {
      // if admin continue
      return next();
    } else {
      // return res.status(403).json({ message: "You are not an admin user!" }); // Forbidden, authorized but not allowde
      return res.json({ message: "You are not an admin user!" }); // Forbidden, authorized but not allowde
    }
  } catch (ex) {
    return res.status(404).send(ex);
  }
};
