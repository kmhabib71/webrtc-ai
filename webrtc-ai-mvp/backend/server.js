const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("offer", (data) => io.to(data.target).emit("offer", data));
  socket.on("answer", (data) => io.to(data.target).emit("answer", data));
  socket.on("candidate", (data) => io.to(data.target).emit("candidate", data));
});

server.listen(5000, () => console.log("Signaling Server running on port 5000"));
