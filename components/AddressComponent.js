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

const styles = {
	root: {}
}

class LocationItem extends React.PureComponent {
	handlePress = async () => {
		try {
			const addressDetails = await this.props.fetchDetails(
				this.props.place_id
			)
			console.log("addressDetails: ", addressDetails)
			this.props.searchAddress(addressDetails)
		} catch (error) {
			throw error
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={this.handlePress}>
				<View style={styles.root}>
					<Text>{this.props.description}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

export class AddressComponent extends React.Component {
	render() {
		console.log("FOOXXX")
		console.log(this.props.navi)
		console.log("SA: ",this.props.navi.getParam("searchAddress"))
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
							style={{
								height: 40,
								width: 300,
								borderWidth: 1,
								paddingHorizontal: 16
							}}
							value={inputValue}
							onChangeText={handleTextChange}
							placeholder="Location..."
						/>
						<ScrollView style={{ maxHeight: 100 }}>
							{locationResults.map((el, i) => (
								<LocationItem
									{...el}
									fetchDetails={fetchDetails}
									key={String(i)}
									searchAddress={this.props.navi.getParam(
										"searchAddress"
									)}
								/>
							))}
						</ScrollView>
					</React.Fragment>
				)}
			</GoogleAutoComplete>
		)
	}
}

// miksi tämä ei toimi. nyt pitää antaa navi propsina sisään
export default withNavigation(AddressComponent)
