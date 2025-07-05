import Category from "../models/category.model.js";

// add category : /api/category/add
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
    const category = new Category({ name, description });
    const savedCategory = await category.save();
    res.status(201).json({
      success: true,
      category: savedCategory,
      message: "Category added successfully",
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding category",
    });
  }
};

// get categories : /api/category/get
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update category : /api/category/update
export const updateCategory = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating category",
    });
  }
};

// delete category : /api/category/delete
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting category",
    });
  }
};
