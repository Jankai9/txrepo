import React from "react"
import {
	View,
	TouchableHighlight,
	TextInput,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Dimensions
} from "react-native"
import { MapView, PROVIDER_GOOGLE } from "expo"
import posed from "react-native-pose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setLocationAndAddressAction } from "../redux/OrderActions"
import { Constants, Location, Permissions } from "expo"

// tässä luuri-ympyrä-animaatio
// https://snack.expo.io/Hyvx_zkVV

const screen = Dimensions.get("window")

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.005
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

// ks. https://popmotion.io/pose/learn/dynamic-props/

const AnimatedButton = posed.View({
	hidden: {
		opacity: 0.1,
		y: props => 1000 // Resolved on `visible` enter
	},
	visible: {
		opacity: 1,
		x: 0,
		y: props => 370,
		transition: {
			x: { type: "tween" },
			y: props => ({ type: "spring" })
		}
	}
})

export class HomeScreen extends React.Component {
	// create the title for the screen
	static navigationOptions = {
		title: "Title"
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

	onStartAddressPressed(_item) {
		console.log(_item)
		this.props.navigation.navigate("Address", {
			addressHandler: value => {
				this.setState({
					...this.state,
					region: value.geometry.location
				})

				this.props.setLocationAndAddress({
					startAddress: value.formatted_address,
					startLocation: value.geometry.location
				})
			}
		})
	}

	onContinueToOrderPressed() {
		this.props.navigation.navigate("OrderDetails")
	}

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status !== "granted") {
			console.log({
				errorMessage: "Permission to access location was denied"
			})
			return
		}
		console.log("haetaan sijaintia...")
		const location = (await Location.getCurrentPositionAsync({})).coords
		console.log("GPS location and address")
		console.log(location)
		const address = (await Location.reverseGeocodeAsync(location))[0]
		console.log(address)
		this.props.setLocationAndAddress({
			startAddress: address.name + ", " + address.city,
			startLocation: {
				lng: location.longitude,
				lat: location.latitude
			}
		})
	}

	componentWillMount() {
		this.getLocationAsync()
	}

	render() {
		console.log("PROPS FROM REDUX")
		console.log(this.props.order)

		let regionAttributes = {}
		if (this.props.order.startLocation) {
			let region = {
				latitude: this.props.order.startLocation.lat,
				longitude: this.props.order.startLocation.lng,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
			regionAttributes = { region }
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
					{...regionAttributes}
				>
					{this.props.order.startLocation && (
						<MapView.Marker
							coordinate={{
								latitude: this.props.order.startLocation.lat,
								longitude: this.props.order.startLocation.lng
							}}
							anchor={{ x: 0.5, y: 0.5 }}
							pinColor={"red"}
						/>
					)}
				</MapView>

				<View style={{ flex: 1, width: "100%", position: "absolute" }}>
					<View style={{ width: "100%", borderWidth: 0 }}>
						<TextInput
							style={styles.startAddress}
							value={this.props.order.startAddress}
							placeholder="  Lähtöpaikka"
							onTouchStart={this.onStartAddressPressed.bind(
								this,
								"item"
							)}
						/>
					</View>
					<AnimatedButton
						style={styles.animatedButton}
						pose={
							this.props.order.startLocation
								? "visible"
								: "hidden"
						}
					>
						<TouchableHighlight style={styles.orderButton}>
							<Text
								style={styles.orderButtonText}
								onTouchStart={this.onContinueToOrderPressed.bind(
									this
								)}
							>
								JATKA TILAAMAAN
							</Text>
						</TouchableHighlight>
					</AnimatedButton>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return { order: state.order }
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setLocationAndAddress: setLocationAndAddressAction
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen)

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
		marginLeft: 20,
		marginRight: 20,
		height: 50,
		borderRadius: 27,
		borderWidth: 2,
		borderColor: "#FF5722",
		paddingTop: 7,
		position: "absolute"
	},
	orderButtonText: {
		color: "#000",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	animatedButton: { position: "absolute" }
})
