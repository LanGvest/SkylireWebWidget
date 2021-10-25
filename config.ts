const standardHashSymbols: string = "8UDBuv456ESdeClz0HKLhc23nopRj9AwxXYytfgVIMiq1PQJWF7rTNsmkGOZab";
const standardSpecialSymbols: string = "+-*^~_!@#$%&?";

const Config = {
	PROTOCOL: "https",
	DOMAIN: "skylire.langvest.by",
	TITLE: "Skylire Live Chat",
	SHS: `${standardHashSymbols}`,
	SSS: `${standardSpecialSymbols}`,
	MPL: 8
}

const p: string = "png";
const g: string = "gif";

const IconFormats: Array<string> = [
	p,
	p,
	g,
	p,
	g,
	p,
	p,
	g,
	g,
	g, //9
	g,
	g,
	g,
	g,
	g,
	p, //15
	g,
	g,
	g,
	g,//19
	g,
	p,
	g,
	g,
	p,//24
	g,
	g,
	g,
	g,//28
	g,
	g,
	g,
	g,//32
	g,
	g,
	g,//35
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,//47
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,//56
	g,
	g,
	g,
	g,
	g,
	g,
	p,
	g,//64
	p,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g,
	g, //74
	p,
	p,
	p,
	p,
	p
];

const Colors: Array<string> = [
	"#FF6464",
	"#FF62B3",
	"#FB50D6",
	"#DE53FD",
	"#B059FD",
	"#8C5CFD",
	"#686AFF",
	"#6296FF",
	"#5CBDFD",
	"#58D2F8",
	"#4DFBFB",
	"#53F6C8",
	"#45F494",
	"#51FF53",
	"#A1F145",
	"#DCED3B",
	"#FBDE48",
	"#FFBF53",
	"#FF9955",
	"#E2E3E7"
];

interface Message {
	text: string
	username: string
	color: string
	icon: string
	email: string
	timestamp: number
	_key: string | null
}

function getColorConstant(colorIndex: number): string {
	return Colors[colorIndex];
}

function getMeta(message: Message): string {
	return message.email + "-" + message.color + "-" + message.icon;
}

function getMetaWithTime(message: Message): string {
	let date: Date = new Date(message.timestamp);
	return message.email + "-" + message.color + "-" + date.getHours() + "-" + date.getMinutes() + "-" + message.icon;
}

function getIconConstant(icon: string): string {
	if(icon.startsWith("https")) return icon;
	return `/icons/${icon}.${IconFormats[+icon]}`;
}

export {getColorConstant, getIconConstant, getMetaWithTime, getMeta};
export type {Message};
export default Config;