const jwt = require("jsonwebtoken");
const secret = "mySecretKey"; // isey environment variable me daalna production me

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {_id:decoded.userId};
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

module.exports = authMiddleware;