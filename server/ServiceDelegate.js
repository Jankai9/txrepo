import SocketIOClient from "react-native-socket.io-client"
import { FakeSocketIOClient } from "./FakeSocketIOClient"

const SERVER = "http://vps141269.ovh.net:8082/"

const isFake = true

export function openWebSocket() {
	if (isFake) {
		openFakeWebSocket()
	} else {
		openRealWebSocket()
	}
}

function messageFromServer(msg) {
	console.log("messageFromServer()")
	var msgObject = JSON.parse(msg)
	console.log(msgObject)
}

export function openRealWebSocket() {
	this.socket = SocketIOClient(SERVER)
	this.socket.on("msg_from_server", messageFromServer.bind(this))
	// this.sendSrvCreatePassengerReq()
	console.log("soketti luotu")
}

export function openFakeWebSocket() {
	console.log("avataan fake soketti")
	this.socket = new FakeSocketIOClient()
	this.socket.on("msg_from_server", messageFromServer.bind(this))
	sendSrvCreatePassengerReq()
	console.log("fake websoketti luotu")
}

export function sendSrvCreatePassengerReq() {
	var msg = {
		msgId: 1,
		passengerId: 0,
		phoneNumber: "3123123123",
		password: "passwordStr",
		masterPassword: "xYzJee"
	}
	this.socket.emit("msg_from_client", JSON.stringify(msg))
}

export function sendSrvRequestTaxi(startLocation, endLocation) {
	var msg = {
		msgId: 99,
		param1: ""
	}
	this.socket.emit("msg_from_client", JSON.stringify(msg))
}
