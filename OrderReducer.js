import { combineReducers } from "redux"

const INITIAL_STATE = {
	startAddress: undefined,
	startLocation: undefined
}

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_LOCATION_AND_ADDRESS":
			return {
				startLocation: action.payload.startLocation,
				startAddress: action.payload.startAddress
			}
		default:
			return state
	}
}

export default combineReducers({
	order: orderReducer
})
