import {CustomElement} from "../modules/utils";
import React, {useEffect, useState} from "react";
import {getDatabase, limitToLast, onChildAdded, onValue, query, ref} from "firebase/database";
import firebaseApp from "../modules/firebase";
import {getColorConstant, getIconConstant, getMeta, Message} from "../config";

const database = getDatabase(firebaseApp);

export default function Info(): CustomElement {
	const [appMode, setAppMode] = useState<number>(() => 0);
	const [message, setMessage] = useState<Message|null>(() => null);

	useEffect(() => {
		onValue(ref(database, "mode"), snapshot => {
			setAppMode(() => snapshot.val());
		});
		const messagesQuery = query(ref(database, "messages"), limitToLast(1));
		onChildAdded(messagesQuery, data => {
			const value = data.val();
			const newMessage: Message = {
				_key: data.key,
				color: value.c,
				email: value.m,
				icon: value.i,
				text: value.t,
				timestamp: value.s,
				username: value.n
			}
			if(!message || getMeta(message) !== getMeta(newMessage)) setMessage(() => newMessage);
		});
	}, []);

	return (
		<>
			{appMode === 0 && message && (
				<div className="last-message-container">
					<div className="icon">
						{message.icon && <img src={getIconConstant(message.icon)} alt={message.icon}/>}
					</div>
					{
						message.color === "g" ?
							<h1 className="gold">{message.username}</h1>
							:
							message.color === "e" ?
								<h1 className="epic">{message.username}</h1>
								:
								<h1 style={{color: getColorConstant(+message.color)}}>{message.username}</h1>
					}
				</div>
			)}
		</>
	)
}