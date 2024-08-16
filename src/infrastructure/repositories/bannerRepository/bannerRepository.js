// ================== file to show the banner repository for the application =================== //

// importing the required modules
const BannerCollection = require("../../../core/entities/banner/bannerCollection");

// creating the banner repository
const bannerRepository = {
  // method for showing all the banners
  showBanners: async () => {
    try {
      const bannerData = await BannerCollection.find();
      if (bannerData) {
        return bannerData;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for adding a banner
  addBanner: async (bannerData, bannerImage) => {
    try {
      const banner = new BannerCollection({
        name: bannerData.banner_name,
        description: bannerData.banner_description,
        bannerImage: bannerImage,
      });
      const savedBanner = await banner.save();
      if (savedBanner) {
        return savedBanner;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for finding specific banner
  showBanner: async (bannerId) => {
    try {
      const banner = await BannerCollection.findById({ _id: bannerId });
      if (banner) {
        return banner;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for editing the banner
  editBanner: async (bannerId, bannerData, bannerImage) => {
    try {
      const banner = {
        name: bannerData.banner_name,
        description: bannerData.banner_description,
      };
      if (bannerImage) {
        banner.bannerImage = bannerImage;
      }
      const bannerDetails = await BannerCollection.findByIdAndUpdate(
        bannerId,
        banner,
        { new: true }
      );

      if (bannerDetails) {
        return bannerDetails;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for deleting the banner
  deleteBanner: async (bannerId) => {
    try {
      const banner = await BannerCollection.findByIdAndDelete({
        _id: bannerId,
      });
      if (banner) {
        return "deleted";
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = bannerRepository;
