import React from "react"
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer
} from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import MainTabNavigator from "./MainTabNavigator"

import { screensEnabled } from "react-native-screens"
import AddressScreen from "../screens/AddressScreen"
export const createSwitchNavigator2 = createSwitchNavigator({
	// You could add another route here for authentication.
	// Read more at https://reactnavigation.org/docs/en/auth-flow.html
	Main: MainTabNavigator
})

export const TaxiAppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Address: AddressScreen
	},
	{
		initialRouteName: "Home"
	}
)
