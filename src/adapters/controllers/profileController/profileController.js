// ================== file to show the admins controller for the application =================== //

// importing the required modules
const profileUseCase = require("../../../application/usecase/profileUseCase/profileUseCase");

// creating the profile Controller for the user and the tutor
const profileController = {
  // controller for getting the user profile page
  postUserProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      const response = await profileUseCase.userProfile(userId);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // controller for getting the tutor profile Page
  postTutorProfile: async (req, res) => {
    try {
      const tutorId = req.params.id;
      const response = await profileUseCase.tutorProfile(tutorId);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // controller for getting the graph for showing in the tutor page
  getGraph: async (req, res) => {
    const tutorId = req.params.id;
    try {
      const response = await profileUseCase.getGraphs(tutorId);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // controller for editing the tutor data
  editTutor: async (req, res) => {
    try {
      const tutorId = req.params.id;
      const tutorData = req.body;
      const profileImage = req.file
        ? `https://code-sprint-backend.onrender.com/uploads/image/${req.file.filename}`
        : null;

      const response = await profileUseCase.editTutor(
        tutorData,
        profileImage,
        tutorId
      );
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // controller for getting the solved problems
  getSolvedProblems: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await profileUseCase.getSolvedProblems(id);
      if (response.success) {
        res.status(200).json(response.data);
      } else {
        res.status(400).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // for getting the streak for the code submission
  getStreak: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await profileUseCase.getStreak(id);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(400).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // for getting all the users
  getAllUsers: async (req, res) => {
    try {
      const response = await profileUseCase.getAllUsers();
      if (response.success) {
        res.json(response.data);
      } else {
        res.json(response.data);
      }
    } catch (error) {
      res.json(error.message);
    }
  },

  // controller for getting all the tutors
  getAllTutors: async (req, res) => {
    try {
      const response = await profileUseCase.getAllTutors();
      if (response.success) {
        res.json(response.data);
      } else {
        res.json(response.data);
      }
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = profileController;
