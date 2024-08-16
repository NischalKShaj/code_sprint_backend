// ================== file to show the category controller for the application =================== //

// importing the required modules
const categoryUseCase = require("../../../application/usecase/categoryUseCase/categoryUseCase");

// creating the controller
const categoryController = {
  // controller for adding category
  addCategory: async (req, res) => {
    try {
      const { category_name } = req.body;
      const response = await categoryUseCase.addCategory(category_name);
      if (response.success) {
        res.status(200).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(response.data);
    }
  },

  // showing al the categories
  showCategory: async (req, res) => {
    // try {
    const response = await categoryUseCase.showCategory();
    if (response.success) {
      res.status(202).json(response.data);
    } else {
      res.status(404).json(response.data);
    }
    // } catch (error) {
    //   res.status(500).json(error.message);
    // }
  },
};

module.exports = categoryController;
