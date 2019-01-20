import React from "react"
import {
	View,
	TextInput,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity
} from "react-native"

export default class HomeScreen extends React.Component {
	// create the title for the screen
	static navigationOptions = {
		title: "FinTaxi"
	}

	// create constructor to get access to props
	constructor(props) {
		super(props)

		this.state = {
			startAddress: ""
		}
	}

	searchAddress = value => {
		console.log("HomeScreenille palautui osoite: ", value.formatted_address)
		this.setState({...this.state, startAddress:  value.formatted_address})
	}

	onItemPressed(_item) {
		console.log(_item)
		this.props.navigation.navigate("Address", {
			searchAddress: this.searchAddress
		})
	}

	render() {
		return (
			<View>
				<TextInput
					value={this.state.startAddress}
					style={styles.startAddress}
					placeholder="  Lähtöpaikka"
					onTouchStart={this.onItemPressed.bind(this, "item")}
				/>
				<Text style={styles.orderButton}>JATKA TILAAMAAN</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
		marginTop: 20
	},
	startAddress: {
		backgroundColor: "#ddd",
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 40
	},
	map: {
		backgroundColor: "#ddd",
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
	},
	orderButton: {
		backgroundColor: "#FFEB3B",
		color: "#000",
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 50,
		fontSize: 20,
		fontWeight: 'bold',
		textShadowColor: '#000',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
		textAlign: 'center',
		borderRadius: 27 ,
		borderWidth: 2,
		borderColor: '#FF5722',
		paddingTop: 7,

	}
})
