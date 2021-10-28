import {CustomElement} from "../modules/utils";
import React, {useEffect} from "react";

export default function App(): CustomElement {
	useEffect(() => {
		let link = document.createElement("a");
		link.download = "Skylire.apk";
		link.href = "https://github.com/LanGvest/skylire-android-app/blob/master/app/release/Skylire.apk?raw=true";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, []);

	return (
		<div className="download-container">
			<img src={"/logo.png"} alt="logo"/>
			<h1>Skylire.apk</h1>
			<p>4.23 МБ</p>
		</div>
	)
}