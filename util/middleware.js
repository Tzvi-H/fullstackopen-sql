const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      console.log(req.decodedToken);
      next();
    } catch (e) {
      console.error(e);
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
};

module.exports = { tokenExtractor };
