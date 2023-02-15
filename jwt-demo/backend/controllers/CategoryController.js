import Category from "../models/Category.js";

export const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
  //ADD CATEGORY
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      res.status(200).json(await newCategory.save());
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
};
