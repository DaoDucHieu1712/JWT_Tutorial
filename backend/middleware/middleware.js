import jwt from "jsonwebtoken";

const middleware = {
  //VERIFYTOKEN
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  //AUTHORIZE
  authozire: (req, res, next) => {
    middleware.verifyToken(req, res, () => {
      if (req.user.role === 2) {
        next();
      } else {
        return res.status(403).json("Forbidden");
      }
    });
  },
};

export default middleware;
