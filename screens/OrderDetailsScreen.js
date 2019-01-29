import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { Icon } from "react-native-elements"

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
				<View style={styles.addresses}>
					<View style={styles.addressContainer}>
						<Text style={styles.addressText}>Noutopaikka</Text>
						<Text
							style={styles.address}
							onTouchStart={this.onStartAddressPressed.bind(this)}
						>
							{this.state.startAddress}
						</Text>
					</View>
					<View style={styles.addressContainer}>
						<Text style={styles.addressText}>Määränpää</Text>
						<Text
							style={styles.address}
							onTouchStart={this.onDestinationAddressPressed.bind(
								this
							)}
						>
							{this.state.destinationAddress
								? this.state.destinationAddress
								: "Lisää määränpää (valinnainen)"}
						</Text>
					</View>
				</View>
				<View style={styles.optionsContainer}>
					<View style={styles.optionBoxContainer}>
						<Icon
							name="truck"
							type="feather"
							color="#517fa4"
							size={30}
						/>
						<View style={styles.optionValueAndHintContainer}>
							<Text style={styles.optionValue}>
								Mikä tahansa auto
							</Text>
							<Text style={styles.optionHint}>
								Vaihda autotyyppi napauttamalla
							</Text>
						</View>
					</View>
					<View style={styles.optionContainer}>
						<View style={styles.optionBoxContainer}>
							<Icon
								name="clock"
								type="feather"
								color="#517fa4"
								size={30}
							/>
							<View style={styles.optionValueAndHintContainer}>
								<Text style={styles.optionValue}>
									Kyyti heti
								</Text>
								<Text style={styles.optionHint}>
									Aseta myöhempi aika napauttamalla
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.optionContainer}>
						<View style={styles.optionBoxContainer}>
							<Icon
								name="dollar-sign"
								type="feather"
								color="#517fa4"
								size={30}
							/>
							<View style={styles.optionValueAndHintContainer}>
								<Text style={styles.optionValue}>
									Maksu autossa
								</Text>
								<Text style={styles.optionHint}>
									Voit maksaa myös pankkikortilla
									napauttamalla tätä
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

// https://facebook.github.io/react-native/docs/view-style-props

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
		marginTop: 20
	},
	addresses: {
		marginTop: 10
	},
	addressContainer: {
		backgroundColor: "#fff",
		marginTop: 10,
		marginLeft: 20
	},
	address: {
		backgroundColor: "#fff",
		paddingTop: 4,
		marginRight: 20,
		paddingLeft: 10,
		paddingBottom: 3,
		height: 25,
		fontSize: 10,
		fontWeight: "bold"
	},
	addressText: {
		paddingLeft: 10,
		paddingTop: 3,
		fontSize: 10,
		color: "#aaa"
	},
	optionsContainer: {
		marginTop: 20,
		marginLeft: 20
	},
	optionContainer: {
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#aaa"
	},
	optionImage: {
		width: 50,
		height: 60
	},
	optionValue: {
		fontSize: 15,
		fontWeight: "bold"
	},
	optionHint: {
		marginTop: 3,
		paddingBottom: 3,
		fontSize: 13,
		color: "#aaa"
	},
	optionBoxContainer: {
		flex: 0,
		flexDirection: "row"
	},
	optionValueAndHintContainer: {
		marginLeft: 15
	}
})
