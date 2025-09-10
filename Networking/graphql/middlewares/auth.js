const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    {
      req.isAuth = false;
      return next();
    }
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );
    req.user = decoded;
    req.isAuth = true;
    next();
  } catch (ex) {
    req.isAuth = false;
    next();
  }
}

module.exports = isAuth;