import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { io } from "./SocketClient";

const ChatHome = () => {
	const [room, setRoom] = useState("");
	const [name, setName] = useState("");

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([{}]);

	const handleJoin = (e) => {
		e.preventDefault();
		io.emit("join", { name, room });
	};
	const handleSend = (e) => {
		e.preventDefault();
		setMessages([...messages, { name, message }]);
		io.emit("getMessage", { name, room, message });
		setMessage("");
	};
	useEffect(() => {
		io.on("sendMessage", ({ name, message }) => {
			setMessages([...messages, { name, message }]);
			console.log("message : ", messages, name);
		});
	});
	return (
		<>
			<label htmlFor="">name : </label>
			<input
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
			/>
			<br />
			<label htmlFor="">room : </label>
			<input
				type="text"
				onChange={(e) => setRoom(e.target.value)}
				value={room}
			/>
			<button onClick={handleJoin}>join</button>
			<br />
			<input
				onChange={(e) => setMessage(e.target.value)}
				type="text"
				placeholder="message..."
				value={message}
			/>
			<button type="submit" onClick={handleSend}>
				send
			</button>

			<Messages messages={messages} />
		</>
	);
};

export default ChatHome;
