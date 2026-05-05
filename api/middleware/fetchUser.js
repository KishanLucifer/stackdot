import jwt from "jsonwebtoken";

const fetchuser = (req, res, next) => {
  const access_token = req.header("access_token");
  if (!access_token) {
    return res.status(401).json({ message: "Access token missing" });
  }
  jwt.verify(access_token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};

export default fetchuser;
