const simpleTextMessage = (sendCmd: (arg0: string) => void, receiver: string, text: string) => {
	sendCmd(`PRIVMSG ${receiver} :${text}`);
}

const HandleCommand = (sendCmd: (arg0: string) => void, sender: string, receiver: string, command: string) => {
	switch (command) {
		case "help": simpleTextMessage(sendCmd, receiver, `no one can help you, ${sender}`); return;
		case "racko": simpleTextMessage(sendCmd, receiver, 'i hope racko explodes.'); return;
		case "buren": simpleTextMessage(sendCmd, receiver, 'buren is the one for me <3'); return;

		default: simpleTextMessage(sendCmd, receiver, `i don't know what ${command} is supposed to do!`); return;
	}
}

const cmdHelp = () => {
	
}

module.exports = HandleCommand