import React from "react"
import { GoogleAutoComplete } from "react-native-google-autocomplete"
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native"
import { withNavigation } from "react-navigation"
import { Icon } from "react-native-elements"

class LocationItem extends React.PureComponent {
	// create constructor to get access to props
	constructor(props) {
		super(props)
	}

	handleAddressPressed = async () => {
		try {
			// haetaan tarkemmat osoitetiedot googlelta
			const addressDetails = await this.props.fetchDetails(
				this.props.place_id
			)
			console.log("addressDetails: ", addressDetails)
			this.props.addressHandler(addressDetails)
			this.props.navi.goBack()
		} catch (error) {
			throw error
		}
	}

	render() {
		console.log("OSOITTERIVIN TIEDOT")
		console.log(this.props)
		return (
			<TouchableOpacity onPress={this.handleAddressPressed}>
				<View style={styles.addressItemContainer}>
					<Icon
						name="map-pin"
						type="feather"
						color="#517fa4"
						size={23}
					/>
					<Text style={styles.addressItem}>
						{this.props.structured_formatting.main_text}
					</Text>
					<View style={styles.addressSecondaryTextContainer}>
						<Text style={styles.addressSecondaryText}>
							{this.props.structured_formatting.secondary_text}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

export class AddressComponent extends React.Component {
	// create constructor to get access to props
	constructor(props) {
		super(props)
	}

	render() {
		console.log("AddressComponent: navi")
		console.log(this.props.navi)
		console.log("SA: ", this.props.navi.getParam("addressHandler"))
		return (
			<GoogleAutoComplete
				apiKey="AIzaSyBlXzW_f3mZD6bOVIsP6bsHhvcICbLD2PQ"
				debounce={300}
				components="country:fi"
			>
				{({
					inputValue,
					handleTextChange,
					locationResults,
					fetchDetails
				}) => (
					<React.Fragment>
						<TextInput
							style={styles.addressInput}
							value={inputValue}
							onChangeText={handleTextChange}
							placeholder="Location..."
						/>
						<View style={styles.addressList}>
							<ScrollView style={{}}>
								{locationResults.map((el, i) => (
									<LocationItem
										{...el}
										fetchDetails={fetchDetails}
										key={String(i)}
										navi={this.props.navi}
										addressHandler={this.props.navi.getParam(
											"addressHandler"
										)}
									/>
								))}
							</ScrollView>
						</View>
					</React.Fragment>
				)}
			</GoogleAutoComplete>
		)
	}
}
const styles = StyleSheet.create({
	root: {},

	addressInput: {
		color: "black",
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderBottomWidth: 2,
		borderBottomColor: "#333",
		marginLeft: 20,
		marginRight: 20,
		borderWidth: 1,
		height: 40,
		fontSize: 20,
		fontWeight: "bold"
	},
	addressList: {
		marginTop: 15,
		marginLeft: 20,
		marginRight: 20,
		height: 400
	},
	addressItem: {
		color: "black",
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 6,
		fontSize: 15
	},
	addressItemContainer: {
		flex: 0,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#444",
		marginTop: 6
	},

	addressSecondaryText: {
		color: "gray",
		marginLeft: 10,
		marginRight: 10,
		fontSize: 10
	},
	addressSecondaryTextContainer: {
		marginTop: 5
	}
})
