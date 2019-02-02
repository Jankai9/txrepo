import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { AddressComponent } from "../components/AddressComponent"

export default class AddressScreen extends React.Component {
	// create constructor to get access to props
	constructor(props) {
		super(props)
	}

	static navigationOptions = {
		header: null
	}

	render() {
		console.log("TULTIIN addressscreeniin. navigation.state.params")
		console.log(this.props.navigation.state.params)

		return (
			<View style={styles.container}>
				<View style={styles.addressTextContainer}>
					<Text style={styles.startLocationText}>Anna osoite</Text>
				</View>
				<AddressComponent navi={this.props.navigation} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginTop: 20
	},
	addressTextContainer: {
		backgroundColor: "#fff",
		marginLeft: 20,
		marginTop: 10,
		marginBottom: 10
	},
	startLocationText: {
		color: "#bbb",
		fontSize: 20,
		fontWeight: "bold"
	}
})
