import Product from "../models/Product.js";

export const productController = {
  //GET ALL PRODUCT
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();

      res.status(200).json({ products, count: products.length });
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //GET PRODUCT BY ID
  getProducById: async (req, res) => {
    try {
      const product = await Product.find({ _id: req.params.id });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //GET ALL PRODUCT BY ID
  getProductByCategoryId: async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.cid });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //ADD PRODUCT
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      res.status(200).json(await newProduct.save());
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //UPDATE PRODUCT
  updateProduct: async (req, res) => {
    try {
      const p = await Product.findById(req.params.id);
      await p.updateOne({ $set: req.body });
      res.status(200).json("Update successfully !");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //DELETE PRODUCT
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully !");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //SEARCH PRODUCT
  searchProduct: async (req, res) => {
    try {
      const products = await Product.find({
        name: { $regex: ".*" + req.params.text + ".*", $options: "i" },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //SORT PRODUCT
  sortProduct: async (req, res) => {
    try {
      let products;
      if (req.params.sorters === "desc") {
        products = await Product.find().sort({
          name: -1,
        });
      } else if (req.params.sorters === "asc") {
        products = await Product.find().sort({
          name: 1,
        });
      } else if (req.params.sorters === "pdesc") {
        products = await Product.find().sort({
          price: -1,
        });
      } else if (req.params.sorters === "pasc") {
        products = await Product.find().sort({
          price: 1,
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //FILTER PRODUCT
  filterProduct: async (req, res) => {
    try {
      res.status(200).json("Filter");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //PAGINATION
  getAllProductAndPaging: async (req, res) => {
    try {
      const pageSize = 4;
      const products = await Product.find()
        .skip((req.params.page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //PAGINATION BY CATEGORY
  getAllProductByIdAndPaging: async (req, res) => {
    try {
      res.status(200).json("Paging by ID");
    } catch (error) {
      res.status(500).json(req.body);
    }
  },

  //GET RANDOM PRODUCT
  getRandomProdut: async (req, res) => {
    try {
      const product = await Product.aggregate([{ $sample: { size: 1 } }]);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(req.body);
    }
  },
};
