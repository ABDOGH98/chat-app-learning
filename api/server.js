const cors = require("cors");
const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

app.use(cors());

io.on("connection", (socket) => {
	console.log("Connected !!!!!!!");

	socket.on("join", (data) => {
		socket.join(data.room);
		socket.emit("joined", data);
		console.log(data.name, "joined");
	});
	socket.on("getMessage", ({ name, room, message }) => {
		socket.broadcast.to(room).emit("sendMessage", { name, message });
	});
	socket.on("disconnect", () => {
		console.log("Disconnected !!!!!!!");
	});
});
server.listen(4000);
