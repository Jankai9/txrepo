import React from "react"
import { createStackNavigator } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import OrderDetailsScreen from "../screens/OrderDetailsScreen"
import AddressScreen from "../screens/AddressScreen"

export const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Address: AddressScreen,
		OrderDetails: OrderDetailsScreen
	},

	{
		initialRouteName: "Home"
	}
)
