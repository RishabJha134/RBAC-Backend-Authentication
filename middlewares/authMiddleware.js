const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      res.status(403).json({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (!decoded) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }
    console.log("decoded: " + JSON.stringify(decoded));
    req.user = decoded;
    console.log("req.user: " + JSON.stringify(req.user));
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};



module.exports = { verifyToken};
