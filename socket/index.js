const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
io.on("connection", (socket) => {
  console.log("user connected");
  //EMIT IS USED TO SEND MESSAGE TO EVERYONE
  //name of socket and then the message
  socket.on("adduser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
});
