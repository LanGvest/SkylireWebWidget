import {CustomElement} from "../modules/utils";
import {getDatabase, ref, onValue, onChildAdded, onChildRemoved, query, limitToLast, Database} from "firebase/database";
import {useEffect, useState} from "react";
import React from "react";
import {getColorConstant, getIconConstant, getMetaWithTime, Message} from "../config";
import firebaseApp from "../modules/firebase";

const database: Database | null = firebaseApp ? getDatabase(firebaseApp) : null;

function buildItem(messages: Array<Message>, position: number): CustomElement {
	const prevMessage: Message | null = position > 0 ? messages[position-1] : null;
	const message: Message = messages[position];
	const nextMessage: Message | null = position < messages.length-1 ? messages[position+1] : null;
	const date: Date = new Date(message.timestamp);
	let hideMeta: boolean = prevMessage ? getMetaWithTime(message) === getMetaWithTime(prevMessage) : false;
	let hideBottomPadding: boolean = nextMessage ? getMetaWithTime(message) === getMetaWithTime(nextMessage) : true;
	return (
		<div key={message._key} className="message" style={{paddingBottom: hideBottomPadding ? "0" : "18px"}}>
			{!hideMeta && (
				<div>
					{message.icon && <img src={getIconConstant(message.icon)} alt={message.icon}/>}
					{
						message.color === "g" ?
							<h1 className="gold">{message.username}</h1>
							:
							message.color === "e" ?
								<h1 className="epic">{message.username}</h1>
								:
								<h1 style={{color: getColorConstant(+message.color)}}>{message.username}</h1>
					}
					<p className="time">{date.getHours()}:{date.getMinutes().toString().padStart(2, "0")}</p>
				</div>
			)}
			<p className="text">{message.text}</p>
		</div>
	)
}

export default function Index(): CustomElement {
	const maxDisplayAmount: number = 20;
	const [appMode, setAppMode] = useState<number>(() => 0);
	const [list, setList] = useState<Array<Message>>(() => []);

	useEffect(() => {
		if(database) {
			onValue(ref(database, "mode"), snapshot => {
				setAppMode(() => snapshot.val());
			});
			let minTimestamp: number = 0;
			const messagesQuery = query(ref(database, "messages"), limitToLast(maxDisplayAmount));
			onChildAdded(messagesQuery, data => {
				const value = data.val();
				minTimestamp < value.s && addItem({
					_key: data.key,
					color: value.c,
					email: value.m,
					icon: value.i,
					text: value.t,
					timestamp: minTimestamp = value.s,
					username: value.n
				})
			});
			onChildRemoved(messagesQuery, data => {
				data.key && removeItem(data.key);
			});
		}
	}, []);

	function addItem(item: Message): void {
		setList(prevList => {
			let newArr: Array<Message> = [...prevList, item];
			if(newArr.length <= maxDisplayAmount) return newArr;
			newArr.shift();
			return newArr;
		});
	}

	function removeItem(key: string): void {
		setList(prevList => {
			let newArr: Array<Message> = [...prevList];
			let index: number = -1, i: number;
			for(i = 0; i < newArr.length; i++) if(newArr[i]._key === key) {
				index = i;
				break;
			}
			if(index !== -1) newArr.splice(index, 1);
			return newArr;
		});
	}

	return (
		<>
			{
				appMode === 0 ? (
					<div className="chat-container">
						{list.map((item, index) => buildItem(list, index))}
					</div>
				) : (
					<div className="lock-chat-container">
						<img src={"/logo.png"} alt="logo"/>
						<p className="lock-title">Skylire</p>
						<p className="lock-message">Чат трансляции недоступен.<br/>Возможно, на сервере ведутся технические работы</p>
					</div>
				)
			}
		</>
	)
}