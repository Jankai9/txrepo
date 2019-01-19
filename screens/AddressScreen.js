import React from "react"
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native"
import AddressComponent from "../components/AddressComponent"

export default class AddressScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Mistä:</Text>
				<AddressComponent />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginTop: 20
	}
})
