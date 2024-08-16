// ================== file to show the oAuth use-case for the application =================== //

// importing the required modules
const oAuthRepository = require("../../../infrastructure/repositories/oAuthRepository/oAuthRepository");
const generateJWT = require("../../../infrastructure/services/jwtServices");

// creating the oAuth Usecase
const OAuthUseCase = {
  // method for the OAuth
  oAuth: async (userData) => {
    try {
      const result = await oAuthRepository.oAuth(userData);
      if (result) {
        const token = generateJWT.generateJWT(result.email);
        return { success: true, data: result, token };
      } else {
        return { success: false, data: "user not found" };
      }
    } catch (error) {
      console.log("error", error);
      return { success: false, data: error.message };
    }
  },
};

module.exports = OAuthUseCase;
