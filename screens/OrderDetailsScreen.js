import React from "react"
import { TouchableHighlight, StyleSheet, Text, View, Image } from "react-native"
import { Icon } from "react-native-elements"
import { connect } from "react-redux"
import {
	setLocationAndAddressAction,
	setOptionsAction,
	setOrderStateAction
} from "../redux/OrderActions"
import { bindActionCreators } from "redux"

export class OrderDetailsScreen extends React.Component {
	// create constructor to get access to props
	constructor(props) {
		super(props)

		console.log("ORDERDETAISCREEN state:")
		console.log(this.state)
	}

	static navigationOptions = {
		header: null
	}

	onStartAddressPressed() {
		this.props.navigation.navigate("Address", {
			addressHandler: value => {
				this.props.setOptions({
					startAddress: value.formatted_address,
					startLocation: value.geometry.location
				})
			}
		})
	}

	onDestinationAddressPressed() {
		this.props.navigation.navigate("Address", {
			addressHandler: value => {
				this.props.setOptions({
					destinationAddress: value.formatted_address,
					destinationLocation: value.geometry.location
				})
			}
		})
	}

	onConfirmPressed() {
		this.props.setOrderState({
			orderState: "WAITING_FOR_AVAILABLE_TAXI"
		})
	}

	render() {
		console.log("ORDER DETAILS SCREEN. navigation.state.params")
		console.log(this.props.navigation.state.params)

		let picktimeText =
			this.props.order.picktime == "asap"
				? "Kyyti heti"
				: this.props.order.picktime

		return (
			<View style={styles.container}>
				<View style={styles.addresses}>
					<View style={styles.addressContainer}>
						<Text style={styles.addressText}>Noutopaikka</Text>
						<Text
							style={styles.address}
							onTouchStart={this.onStartAddressPressed.bind(this)}
						>
							{this.props.order.startAddress}
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
							{this.props.order.destinationAddress
								? this.props.order.destinationAddress
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
									{picktimeText}
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
				<Text style={styles.getPrice}>Laske hinta etukäteen</Text>
				{this.props.order.orderState == "FILLING_ORDER" && (
					<TouchableHighlight style={styles.confirm}>
						<Text
							style={styles.confirmText}
							onTouchStart={this.onConfirmPressed.bind(this)}
						>
							VAHVISTA TILAUS
						</Text>
					</TouchableHighlight>
				)}

				{this.props.order.orderState ==
					"WAITING_FOR_AVAILABLE_TAXI" && (
					<Text
						style={styles.waitingForAvailableTaxi}
						onTouchStart={this.onConfirmPressed.bind(this)}
					>
						Etsitään vapaita takseja...
					</Text>
				)}
			</View>
		)
	}
}

const mapStateToProps = state => {
	const { order } = state
	x = { order }
	console.log("OrderDetailsScreen: MapStateToProps palauttaa orderin: ")
	console.log(x)
	return {
		order: state.order
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setOptions: setOptionsAction,
			setLocationAndAddress: setLocationAndAddressAction,
			setOrderState: setOrderStateAction
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderDetailsScreen)

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
		marginTop: 30,
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
	},
	getPrice: {
		paddingTop: 20,
		color: "gray",
		marginLeft: 20,
		marginRight: 20,
		height: 50,
		fontSize: 13,
		fontWeight: "bold",
		textAlign: "center"
	},
	confirm: {
		backgroundColor: "#222",
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 50,
		borderRadius: 27,
		borderWidth: 2,
		paddingTop: 7
	},
	confirmText: {
		color: "#FFEB3B",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		paddingTop: 4
	},
	waitingForAvailableTaxi: {
		color: "blue",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		paddingTop: 4
	}
})
