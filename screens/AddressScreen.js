import React from "react"
import {
	StyleSheet,
	Text,
	View
} from "react-native"
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
		// TODO miksi tämä parametri ei tule perille
        console.log("ADDRESS DEtAILS VANHA")
        console.log(this.props.navigation.getParam("searchAddress"))

		return (
			<View style={styles.container}>
				<Text>Mistä:</Text>
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
	}
})
