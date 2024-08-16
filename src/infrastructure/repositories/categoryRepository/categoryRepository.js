// ================== file to show the category repository for the application =================== //

// importing the required modules
const CategoryCollection = require("../../../core/entities/category/category");

// creating the repository
const categoryRepository = {
  addCategory: async (category) => {
    try {
      const categoryData = await CategoryCollection.findOne({
        category_name: category,
      });
      if (categoryData) {
        return null;
      } else {
        const newCategory = new CategoryCollection({ category_name: category });
        await newCategory.save();
        let message = "category added";
        if (newCategory) {
          return message;
        }
      }
    } catch (error) {
      throw error;
    }
  },

  // method to find all the categories
  showCategory: async () => {
    const category = await CategoryCollection.find();
    if (category) {
      return category;
    } else {
      return null;
    }
  },
};

module.exports = categoryRepository;
