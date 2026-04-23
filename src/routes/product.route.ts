import express from 'express'
import { upload } from "../utils/multer.js";
import { getProducts, postAddProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.get('/products',getProducts)
router.post(
  "/add-product",
  upload.single("image"),
  postAddProduct
);



export default router;

