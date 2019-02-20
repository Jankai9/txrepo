import { combineReducers } from "redux"

const INITIAL_STATE = {
	startAddress: undefined,
	startLocation: undefined,
	destinationAddress: undefined,
	destinationLocation: undefined,
	vehicleType: "any",
	picktime: "asap",
	payType: "vehicle"
}

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_LOCATION_AND_ADDRESS":
			return {
				...state,
				startLocation: action.payload.startLocation,
				startAddress: action.payload.startAddress
			}
		case "SET_OPTIONS":
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}

export default combineReducers({
	order: orderReducer
})
