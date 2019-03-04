import { Request, Response } from "../Constants"

const SERVER = "http://vps141269.ovh.net:8082/"

export class FakeSocketIOClient {
	target = undefined

	on(type, handler) {
		this.handler = handler
	}

	emit(type, msg) {
		message = JSON.parse(msg)
		console.log("FakeSocketIOClient received message: ")
		console.dir(message)

		switch (message.msgId) {
			case Request.SRV_CREATE_PASSENGER_REQ: {
				this.handler(
					JSON.stringify(this.getResponseForSrvCreatePassengerReq())
				)
				break
			}
			case Request.SRV_LOGIN_PASSENGER_REQ: {
				this.handler(
					JSON.stringify(this.getResponseForLoginPassengerReq())
				)
				break
			}
			default: {
				break
			}
		}
	}

	getResponseForSrvCreatePassengerReq() {
		return {
			param1: 1,
			param2: 0
		}
	}

	getResponseForLoginPassengerReq() {
		return {
			param1: 1,
			param2: 0
		}
	}
}
