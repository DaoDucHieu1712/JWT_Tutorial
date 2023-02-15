import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let refreshTokens = [];

const authController = {
  //REGISTER
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashed,
        fullName: req.body.fullName,
        role: req.body.role || 1,
      });
      res.status(200).json(await newUser.save());
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GENERATE ACCESSTOKEN
  generateAccessToken: (user) => {
    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    return accessToken;
  },
  //GENERATE REFRESHTOKEN
  generateRefreshToken: (user) => {
    const refreshToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return refreshToken;
  },
  //SIGNIN
  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username !");
      }
      const validPassword = bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json("Wrong password !");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, role, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      console.log(refreshToken);
      if (!refreshToken) {
        return res.status(401).json("You're not authenticated !");
      }
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh Token not valid !");
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            console.log(err);
          }
          refreshTokens = refreshTokens.filter(
            (token) => token !== refreshToken
          );
          const newAccessToken = authController.generateAccessToken(user);
          const newRefreshToken = authController.generateRefreshToken(user);
          refreshTokens.push(newRefreshToken);
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          res.status(200).json({ accessToken: newAccessToken });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      res.status(200).json("Logout successful !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default authController;
