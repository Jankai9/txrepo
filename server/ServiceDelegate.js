import SocketIOClient from "react-native-socket.io-client"

const SERVER = "http://vps141269.ovh.net:8082/"

function openWebSocket() {
	this.socket = SocketIOClient(SERVER)
	this.sendSrvCreatePassengerReq()
	this.socket.on("msg_from_server", this.messageFromServer.bind(this))
	console.log("soketti luotu")
}
function messageFromServer(msg) {
	console.log("messageFromServer()")
	var msgObject = JSON.parse(msg)
	console.log(msgObject)
}

function sendSrvCreatePassengerReq() {
	var msg = {
		msgId: 1,
		passengerId: 0,
		phoneNumber: "3123123123",
		password: "passwordStr",
		masterPassword: "xYzJee"
	}
	this.socket.emit("msg_from_client", JSON.stringify(msg))
}
