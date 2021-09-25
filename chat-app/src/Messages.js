import React, { useEffect, useState } from "react";
import { io } from "./SocketClient";

function Messages(props) {
	const [room, setRoom] = useState("");
	const [name, setName] = useState("");
	useEffect(() => {
		io.on("joined", (data) => {
			setName(data.name);
			setRoom(data.room);
			console.log(data);
		});
	}, []);
	return (
		<>
			{room !== "" && name !== "" && (
				<h1>
					<span className="name">{name}</span> hase joined{" "}
					<span className="room">{room} </span> room
				</h1>
			)}
			<div className="messageBox">
				<div>
					{name !== "" &&
						room !== "" &&
						props.messages.map((data) => {
							return (
								<div
									className={data.name === name ? "message" : "messageOther"}
								>
									{data.name !== name && <b>{data.name} :</b>} {data.message}
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
}

export default Messages;
