import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default class OrderDetailsScreen extends React.Component {
	// create constructor to get access to props
	constructor(props) {
		super(props)

		this.state = {
			startAddress: this.props.navigation.state.startAddress,
			startLocation: this.props.navigation.state.startLocation,
			destinationAddress: undefined,
			vehicleType: "any",
			picktime: "asap",
			payType: "vehicle"
		}

		console.log("ORDERDETAISCREEN state:")
		console.log(this.state)
		console.log(this.state.startAddress)
	}

	static navigationOptions = {
		header: null
	}

	onStartAddressPressed() {
		this.props.navigation.navigate("Address", {
			address: this.state.startAddress,
			addressLocation: this.state.startLocation
		})
	}

	onDestinationAddressPressed() {
		this.props.navigation.navigate("Address", {
			address: this.state.destinationAddress,
			addressLocation: this.state.destinationLocation
		})
	}

	componentDidMount() {
		this.setState(previousState => ({
			...previousState,
			startAddress: this.props.navigation.state.params.startAddress,
			startLocation: this.props.navigation.state.params.startLocation
		}))
	}

	render() {
		console.log("ORDER DETAILS SCREEN. navigation.state.params")
		console.log(this.props.navigation.state.params)

		return (
			<View style={styles.container}>
				<View style={{ width: "100%", borderWidth: 0 }}>
					<View>
						<Text style={styles.startAddressText}>Noutopaikka</Text>
						<Text
							style={styles.startAddress}
							onTouchStart={this.onStartAddressPressed.bind(this)}
						>
							{this.state.startAddress}
						</Text>
					</View>
					<View>
						<Text style={styles.destinationAddressText}>
							Määränpää
						</Text>
						<Text
							style={styles.destinationAddress}
							onTouchStart={this.onDestinationAddressPressed.bind(
								this
							)}
						>
							{this.state.destinationAddress
								? this.state.destinationAddress
								: "Valitse määränpää (valinnainen)"}
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ccc",
		marginTop: 20
	},
	startAddress: {
		backgroundColor: "#fff",
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 10,
		height: 40,
		borderWidth: 2,
		borderColor: "#666",
		fontSize: 20
	},
	startAddressText: {
		fontSize: 10
	},
	destinationAddress: {
		backgroundColor: "#fff",
		marginTop: 10,
		backgroundColor: "#fff",
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 10,
		height: 40,
		borderWidth: 2,
		borderColor: "#666",
		fontSize: 20
	},
	destinationAddressText: {
		fontSize: 10
	}
})
