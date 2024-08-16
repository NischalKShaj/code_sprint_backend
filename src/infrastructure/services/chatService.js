// ================== file to show the chat service for the application =================== //

// importing the required modules
const { Server } = require("socket.io");
const messageUseCase = require("../../application/usecase/messageUseCase/messageUseCase");

const chatService = {
  init: (server) => {
    const io = new Server(server, {
      cors: {
        origin: "https://www.codesprint.live",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log(`Socket ${socket.id} connected`);

      socket.on("sendMessage", async (message) => {
        io.emit("message", message);
        await messageUseCase.saveConversation(
          message.senderId,
          message.receiverId,
          message.message,
          message.createdAt,
          message.senderRole,
          message.receiverRole
        );
      });

      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
      });

      socket.on("error", (err) => {
        console.error("Socket.IO error:", err);
      });
    });
  },
};

module.exports = chatService;
