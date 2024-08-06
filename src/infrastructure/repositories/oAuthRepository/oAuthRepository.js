// file for the oAuth repository

// import all the required modules
const UserCollection = require("../../../core/entities/user/userCollection");
const bcryptjs = require("bcryptjs");

// creating the repository for the oAuth
const oAuthRepository = {
  // method for registering and logging in the user according to the oAuth
  oAuth: async (userData) => {
    try {
      const email = userData.emails?.[0]?.value;
      if (!email) {
        throw new Error("Email is required.");
      }
      const userDetail = await UserCollection.findOne({ email });
      console.log("userDetail", userDetail);
      if (userDetail) {
        const updatedUserData = await UserCollection.findByIdAndUpdate(
          {
            _id: userDetail._id,
          },
          { isOnline: true },
          { new: true }
        );
        return updatedUserData;
      } else {
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = new UserCollection({
          username: userData.displayName,
          email,
          password: hashedPassword,
          profile: userData.photos[0].value,
        });
        console.log("user", user);
        await user.save();
        console.log("user", user);
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = oAuthRepository;
