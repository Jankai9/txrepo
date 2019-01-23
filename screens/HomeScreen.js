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
import { MapView, PROVIDER_GOOGLE } from "expo"

export default class HomeScreen extends React.Component {
	// create the title for the screen
	static navigationOptions = {
		title: "FinTaxi"
	}

	// create constructor to get access to props
	constructor(props) {
		super(props)

		this.state = {
			startAddress: "",
			location: {
				"lat" : -33.866651,
				"lng" : 151.195827
			 },
		}
	}

	searchAddress = value => {
		console.log("HomeScreenille palautui osoite: ", value.formatted_address)
		this.setState({ ...this.state, startAddress: value.formatted_address })
	}

	onItemPressed(_item) {
		console.log(_item)
		this.props.navigation.navigate("Address", {
			searchAddress: this.searchAddress
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				/>

				<View style={{ flex: 1, width: "100%", position: "absolute" }}>
					<View style={{ width: "100%", borderWidth: 0 }}>
						<TextInput
							style={styles.startAddress}
							value={this.state.startAddress}
							placeholder="  Lähtöpaikka"
							onTouchStart={this.onItemPressed.bind(this, "item")}
						/>
					</View>
						<Text style={styles.orderButton}>JATKA TILAAMAAN</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	startAddress: {
		backgroundColor: "#fff",
		marginTop: "10%",
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 10,
		height: 40,
		borderWidth: 2,
		borderColor: "#666",
		borderRadius: 11,
		fontSize: 20,
	},
	map: {
		flex: 1
	},
	orderButton: {
		backgroundColor: "#FFEB3B",
		color: "#000",
		marginTop: "99%",
		marginLeft: 20,
		marginRight: 20,
		height: 50,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		borderRadius: 27,
		borderWidth: 2,
		borderColor: "#FF5722",
		paddingTop: 7
	}
})
