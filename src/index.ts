const net = require("node:net");
const HandleCommand = require("./handler.ts")

const address = 'irc.libera.chat';
const port = 6667;

const channel = "##"

// start connection
const client = net.createConnection(port, address);

// send commands to the server
const sendCommand = (command: string)  => {
	client.write(`${command}\r\n`);
}

client.on("connect", () => {
	sendCommand("NICK RackoBot");
	sendCommand("USER rackobot 0 * :RackoBot");

})

// receiving data during open connection
client.on("data", (data: Buffer) => {
	var messages = data.toString().split('\r\n');

	messages.forEach(msg => {
		if (!msg) return;

		console.log('<<', msg);

		if (msg.startsWith('PING')) {
			var server = msg.split(':')[1];
			sendCommand(`PONG :${server}`);
			console.log('>> PONG sent')
		}

		if (msg.includes(' 376 ')) {
			sendCommand(`JOIN ${channel}`);
		}

		if (msg.includes('PRIVMSG')) {
			var match = msg.match(/^:([^!]+)!.* PRIVMSG ([^ ]+) :(.+)$/);

			if (match) {
				var from = match[1];
				var to = match[2];
				var text = match[3];

				if (text.startsWith('r!')) {
					HandleCommand(sendCommand, from, to, text.replace("r!", ""))
				}
			}
		}
	})
});

// close connection
client.on("end", () => {
	console.log("Disconnected from server");
});

// connection didn't open
client.on("error", (err: any) => {
	console.error("Connection error:", err);
});
