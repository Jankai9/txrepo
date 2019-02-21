import React from "react"
import { TouchableHighlight, StyleSheet, Text, View, Image } from "react-native"
import { Icon } from "react-native-elements"
import { connect } from "react-redux"
import { setOptionsAction } from "../OrderActions"
import { bindActionCreators } from "redux"
import { setLocationAndAddressAction } from "../OrderActions"

export class CarSelectionScreen extends React.Component {
	// create constructor to get access to props
	constructor(props) {
		super(props)
	}

	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.addresses}>
					<View style={styles.addressContainer} />
				</View>
				<Text style={styles.getPrice}>Laske hinta etukäteen</Text>
				<TouchableHighlight style={styles.confirm}>
					<Text
						style={styles.confirmText}
						onTouchStart={this.onConfirmPressed.bind(this)}
					>
						VAHVISTA TILAUS
					</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const mapStateToProps = state => {
	const { order } = state
	x = { order }
	console.log("CarSelectionScreen: MapStateToProps palauttaa orderin: ")
	console.log(x)
	return {
		order: state.order
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setOptions: setOptionsAction,
			setLocationAndAddress: setLocationAndAddressAction
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CarSelectionScreen)

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
	}
})
