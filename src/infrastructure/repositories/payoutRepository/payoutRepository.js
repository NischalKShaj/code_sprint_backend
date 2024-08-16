// ================== file to show the payout repository for the application =================== //

// importing the required modules
const PayoutCollection = require("../../../core/entities/paymentRequest/paymentRequest");
const TutorCollection = require("../../../core/entities/user/tutorCollection");
const UserCollection = require("../../../core/entities/user/userCollection");
const PaymentCollection = require("../../../core/entities/payment/paymentCollection");

// creating the repository for creating the payout repository
const payoutRepository = {
  // method for adding the payout request
  addPaymentRequest: async (id, wallet) => {
    try {
      const payoutData = new PayoutCollection({
        tutor: id,
        wallet: wallet,
      });
      await payoutData.save();
      if (payoutData) {
        const message = "successfully added the payment request";
        return message;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for showing all the payouts
  showPayouts: async () => {
    try {
      const payouts = await PayoutCollection.find();
      const tutorId = payouts.map((tutor) => tutor.tutor);
      const tutorData = await TutorCollection.find(
        { _id: { $in: tutorId } },
        { username: 1, email: 1 }
      );

      if (payouts) {
        return { payouts, tutorData };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // method for updating the tutor wallet and payment confirmation
  confirmPayment: async (id) => {
    try {
      const payoutData = await PayoutCollection.findById({ _id: id });
      if (!payoutData) {
        return null;
      }
      const tutor = payoutData.tutor;
      const tutorData = await TutorCollection.findById({ _id: tutor });
      if (!tutorData) {
        return null;
      }

      // updating the payout data
      const updatedPayoutData = await PayoutCollection.findByIdAndUpdate(
        id,
        {
          wallet: 0,
          status: false,
        },
        { new: true }
      );

      // updating the tutorData
      const updatedTutorData = await TutorCollection.findByIdAndUpdate(
        tutor,
        { wallet: 0 },
        { new: true }
      );

      if (updatedPayoutData && updatedTutorData) {
        let message = "payment confirmed";
        return message;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  // enabling the premium subscription for the user
  premiumSubscription: async (userId) => {
    try {
      const userData = await UserCollection.findOne({ _id: userId });
      if (!userData) {
        return null;
      }

      // after successful payment enable premium feature
      const premiumUser = await UserCollection.findByIdAndUpdate(
        userId,
        {
          premium: true,
        },
        { new: true }
      );
      if (!premiumUser) {
        return null;
      }

      return premiumUser;
    } catch (error) {
      throw error;
    }
  },

  // method for showing the payment history for the user
  getPaymentHistory: async (id) => {
    try {
      const paymentRecords = await PaymentCollection.find({ userId: id });

      const paymentHistory = [];

      // filtered data
      for (const record of paymentRecords) {
        // Fetch the tutor's data for the current payment record
        const tutor = await TutorCollection.findById(record.paymentTo);

        const filteredData = {
          _id: record.userId,
          amount: record.amount,
          tutor: tutor.username,
          course_name: record.paymentFor,
          date: record.createdAt,
          status: record.status,
        };

        // Add the filtered data to the payment history array
        paymentHistory.push(filteredData);
      }

      if (!paymentHistory) {
        return null;
      } else {
        return paymentHistory;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = payoutRepository;
