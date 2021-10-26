const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    const [tokenType, userToken] = req.headers.authorization.split(" ");
    try {
      const tokenData = jwt.verify(userToken, process.env.SECRET_KEY);
      req.user_id = tokenData.user_id;

      if (!tokenData.admin) {// if not admin continue
        return next();
      } else {
        return res.status(403).send("you are an admin user"); // Forbidden, authorized but not allowde
      }
    } catch (ex) {
      return res.status(400).send(ex);
    }
  }
};
