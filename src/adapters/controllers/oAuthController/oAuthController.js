// ================== file to show the oAuth controller for the application =================== //

// importing the required modules
const OAuthUseCase = require("../../../application/usecase/oAuthUseCase/oAuthUseCase");

// creating the controller for the OAuth
const oAuth = {
  // controller for the OAuth
  googleAuth: async (req, res) => {
    try {
      const user = req.user;
      const result = await OAuthUseCase.oAuth(user);
      const userData = result.data;
      if (result.success) {
        res.cookie("access_token", result.token, { httpOnly: true });
        const encodedUserData = encodeURIComponent(JSON.stringify(userData));
        res.redirect(
          `https://www.codesprint.live/login?token=${result.token}&user=${encodedUserData}`
        );
      } else {
        res.status(404).json("user not found");
      }
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },
};

module.exports = oAuth;
