import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/add", authSeller, addCategory);
router.get("/get", getCategories);
router.put("/update", authSeller, updateCategory);
router.delete("/delete", authSeller, deleteCategory);

export default router;
