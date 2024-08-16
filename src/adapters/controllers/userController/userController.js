// ================== file to show the user controller for the application =================== //

// importing the required modules
const userUseCase = require("../../../application/usecase/userUseCase/userUseCase");
const tutorUseCase = require("../../../application/usecase/tutorUseCase/tutorUseCase");
const EmailService = require("../../../infrastructure/services/mailer");
const Razorpay = require("razorpay");

// function to generate otp
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// creating the controller for the user
const userController = {
  // creating the controller for the initial landing page
  getHome: async (req, res) => {
    try {
      const response = await userUseCase.getHome();
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(response.data);
    }
  },

  //controller for getting the login page
  getLogin: async (req, res) => {
    const user = req.body;
    try {
      const details = await userUseCase.findUser(user);
      if (details.success) {
        res
          .cookie("access_token", details.token, { httpOnly: true })
          .status(202)
          .json({ data: details.data, token: details.token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  },

  // controller for getting the signup page
  postSignup: async (req, res) => {
    try {
      const role = req.body.role;
      const userData = req.body;
      const otp = generateOTP();
      userData.otp = otp;
      let result;
      if (role === "student") {
        result = await userUseCase.userSignup(userData);
      } else if (role === "tutor") {
        result = await tutorUseCase.tutorSignup(userData);
      }

      const emailService = new EmailService();
      emailService.sendOtpEmail(userData.email, otp);

      if (result.success) {
        res.status(201).json({ ...result.data, otp });
      } else {
        res.status(409).json(result.data);
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  // signing the user/tutor after validating the correct otp
  validateOtp: async (req, res) => {
    try {
      const otp = req.body;

      const userOtp = Object.entries(otp)
        .filter(([key]) => key.startsWith("otp"))
        .map(([_, value]) => value)
        .join("");

      const role = otp.selectedRole;

      let result;
      if (role === "student") {
        result = await userUseCase.validateUser(userOtp);
      } else if (role === "tutor") {
        result = await tutorUseCase.validateOtp(userOtp);
      }

      if (result.success) {
        res.status(201).json("user signed successfully");
      } else {
        res.status(400).json("invalid otp");
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  // controller for otp resend
  resendOtp: async (req, res) => {
    try {
      const email = req.body.email;
      // regenerate the new otp
      const newOTP = generateOTP();

      const emailService = new EmailService();
      emailService.sendOtpEmail(email, newOTP);
      const response = await userUseCase.resendOtp(email, newOTP);
      if (response.success) {
        res.status(201).json("otp resending success");
      } else {
        res.status(400).json("invalid user");
      }
    } catch (error) {
      console.error("error", error);
      res.status(500).json(response.data);
    }
  },

  // controller for validating the payment
  handler: async (req, res) => {
    if (req.method === "POST") {
      try {
        const { amount, user, course } = req.body;
        const response = await userUseCase.verifyPayment(amount, course, user);
        if (response.success) {
          res.status(200).json(response.data);
        } else {
          res.status(400).json(response.data);
        }
      } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
      }
    } else {
      // Respond with Method Not Allowed for non-POST requests
      res.status(405).json({ error: "Method not allowed" });
    }
  },

  // controller for payment verification
  verifyPayment: async (req, res) => {
    try {
      const { course, user } = req.body;
      const response = await userUseCase.paymentSuccess(course, user);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  },

  // controller for editing the student details
  editStudent: async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const profileImage = req.file
        ? `https://app.codesprint.live/uploads/image/${req.file.filename}`
        : null;

      const response = await userUseCase.editStudent(
        userData,
        profileImage,
        userId
      );
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  },

  // controller for unsubscribing the course
  unSubscribe: async (req, res) => {
    try {
      const courseId = req.params.id;
      const userId = req.body.user_id;
      const response = await userUseCase.unSubscribe(courseId, userId);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(404).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // controller for getting all the tutor's from the subscribed courses
  getAllTutors: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await userUseCase.getAllTutors(id);
      if (response.success) {
        res.status(202).json(response.data);
      } else {
        res.status(400).json(response.data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // controller for log-out
  logoutUser: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await userUseCase.logoutUser(id);
      if (response.success) {
        res
          .clearCookie("access_token")
          .status(200)
          .json({ message: "Logged out successfully" });
      } else {
        res.status(404).json("logout failed");
      }
    } catch (error) {
      console.error("error", error);
    }
  },
};

// exporting the controller
module.exports = userController;
