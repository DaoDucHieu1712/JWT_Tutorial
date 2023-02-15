import User from "../models/User.js";

const UserController = {
  //GET ALL USER
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("delete successful !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default UserController;
