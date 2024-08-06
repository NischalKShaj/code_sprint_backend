// file to login the user using the OAuth

// importing the required modules
const OAuthUseCase = require("../../../application/usecase/oAuthUseCase/oAuthUseCase");

// creating the controller for the OAuth
const oAuth = {
  // postOAuth: async (req, res) => {
  //   const user = req.body;
  //   console.log("user", user);
  //   try {
  //     const result = await OAuthUseCase.oAuth(user);
  //     console.log("result", result);
  //     if (result.success) {
  //       res
  //         .cookie("access_token", result.token, { httpOnly: true })
  //         .status(202)
  //         .json({ data: result.data, token: result.token });
  //     } else {
  //       res.status(404).json("user not found");
  //     }
  //   } catch (error) {
  //     res.status(500).json("internal server error");
  //   }
  // },

  // controller for the OAuth
  googleAuth: async (req, res) => {
    try {
      const user = req.user;
      console.log("user", user);
      const result = await OAuthUseCase.oAuth(user);
      const userData = result.data;
      if (result.success) {
        res.cookie("access_token", result.token, { httpOnly: true });
        const encodedUserData = encodeURIComponent(JSON.stringify(userData));
        res.redirect(
          `https://codesprint.live/login?token=${result.token}&user=${encodedUserData}`
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
