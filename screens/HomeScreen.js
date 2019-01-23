import React from "react"
import {
	View,
	TextInput,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Dimensions
} from "react-native"
import { MapView, PROVIDER_GOOGLE } from "expo"

const screen = Dimensions.get("window")

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.005
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

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
			initialRegion: {
				lat: -33.866651,
				lng: 151.195827
			},
			region: undefined
		}
	}

	searchAddress = value => {
		console.log("HomeScreenille palautui osoite: ", value.formatted_address)
		this.setState({ ...this.state, startAddress: value.formatted_address })
		this.setState({ ...this.state, region: value.geometry.location })

		console.log(value.geometry.location)
		console.log(this.map)
	}

	onItemPressed(_item) {
		console.log(_item)
		this.props.navigation.navigate("Address", {
			searchAddress: this.searchAddress
		})
	}

	render() {
		let regionAttribute = {}
		if (this.state.region) {
			let region = {
				latitude: this.state.region.lat,
				longitude: this.state.region.lng,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
			regionAttribute = { region }
		}

		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: this.state.initialRegion.lat,
						longitude: this.state.initialRegion.lng,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA
					}}
					{...regionAttribute}
				>
					{this.state.region && (
					<MapView.Marker
						coordinate={{ latitude: this.state.region.lat, longitude: this.state.region.lng }}
						anchor={{ x: 0.5, y: 0.5 }}
						pinColor={"red"}
					/>)}
				</MapView>

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
		fontSize: 20
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
