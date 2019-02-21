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

	// TODO tarvitaanko tätä?
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
						OK
					</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		order: state.order
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setOptions: setOptionsAction
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
	address: {
		backgroundColor: "#fff",
		paddingTop: 4,
		marginRight: 20,
		paddingLeft: 10,
		paddingBottom: 3,
		height: 25,
		fontSize: 10,
		fontWeight: "bold"
	}
})
