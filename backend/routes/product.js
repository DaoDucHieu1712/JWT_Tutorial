import { productController } from "../controllers/ProductController.js";
import express from "express";

const router = express.Router();

router.get("/list", productController.getAllProduct);
router.get("/search", productController.getAllProduct);
router.get("/search/:text", productController.searchProduct);
router.get("/list/:page", productController.getAllProductAndPaging);
router.get("/paginationById", productController.getAllProductByIdAndPaging);
router.get("/random", productController.getRandomProdut);
router.get("/:id", productController.getProducById);
router.get("/filter", productController.filterProduct);
router.get("/sort/:sorters", productController.sortProduct);
router.post("/create", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
