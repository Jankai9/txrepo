import React from "react"
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
import { WebBrowser } from "expo"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import  PlaceComponent  from "../components/PlaceComponent"
// TODO katso toppadding täältä: https://snack.expo.io/@unafridi/react-native-google-places-autocomplete-example

const homePlace = {
	description: "Home",
	geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
}
const workPlace = {
	description: "Work",
	geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
}

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	// tässä on ensimmäisenä equimperin esimerkki (https://github.com/EQuimper/react-native-google-autocomplete)
	render() {
		return (
			<View style={styles.container}>
				<Text>Mistä:</Text>
				<PlaceComponent />
				<GooglePlacesAutocomplete
					placeholder="Lähtöpaikan osoite. Esim. torikatu 1"
					minLength={2} // minimum length of text to search
					autoFocus={false}
					returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
					listViewDisplayed="auto" // true/false/undefined
					fetchDetails={true}
					renderDescription={row => row.description} // custom description render
					onPress={(data, details = null) => {
						console.log(data)
						console.log(details)
					}}
					getDefaultValue={() => {
						return "pou" // text input default value
					}}
					query={{
						// available options: https://developers.google.com/places/web-service/autocomplete
						key: "AIzaSyBlXzW_f3mZD6bOVIsP6bsHhvcICbLD2PQ",
						language: "en", // language of the results
						types: "(cities)" // default: 'geocode'
					}}
					styles={{
						description: {
							fontWeight: "bold"
						},
						predefinedPlacesDescription: {
							color: "#1faadb"
						}
					}}
					currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
					currentLocationLabel="Current location"
					nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					GoogleReverseGeocodingQuery={
						{
							// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
						}
					}
					GooglePlacesSearchQuery={{
						// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
						rankby: "distance",
						types: "food"
					}}
					filterReverseGeocodingByTypes={[
						"locality",
						"administrative_area_level_3"
					]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
					predefinedPlaces={[homePlace, workPlace]}
					debounce={200}
				/>
				<Text>Mihin:</Text>
				<GooglePlacesAutocomplete
					placeholder="Matkan kohde. Esim. torikatu 1"
					minLength={2} // minimum length of text to search
					autoFocus={false}
					returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
					listViewDisplayed="auto" // true/false/undefined
					fetchDetails={true}
					renderDescription={row => row.description} // custom description render
					onPress={(data, details = null) => {
						console.log(data)
						console.log(details)
					}}
					getDefaultValue={() => {
						return "" // text input default value
					}}
					query={{
						// available options: https://developers.google.com/places/web-service/autocomplete
						key: "AIzaSyBlXzW_f3mZD6bOVIsP6bsHhvcICbLD2PQ",
						language: "en", // language of the results
						types: "(cities)" // default: 'geocode'
					}}
					styles={{
						description: {
							fontWeight: "bold"
						},
						predefinedPlacesDescription: {
							color: "#1faadb"
						}
					}}
					currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
					currentLocationLabel="Current location"
					nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					GoogleReverseGeocodingQuery={
						{
							// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
						}
					}
					GooglePlacesSearchQuery={{
						// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
						rankby: "distance",
						types: "food"
					}}
					filterReverseGeocodingByTypes={[
						"locality",
						"administrative_area_level_3"
					]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
					predefinedPlaces={[homePlace, workPlace]}
					debounce={200}
				/>
			</View>
		)
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginTop: 20
	},
	developmentModeText: {
		marginBottom: 20,
		color: "rgba(0,0,0,0.4)",
		fontSize: 14,
		lineHeight: 19,
		textAlign: "center"
	},
	contentContainer: {
		paddingTop: 30
	},
	welcomeContainer: {
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: "contain",
		marginTop: 3,
		marginLeft: -10
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50
	},
	homeScreenFilename: {
		marginVertical: 7
	},
	codeHighlightText: {
		color: "rgba(96,100,109, 0.8)"
	},
	codeHighlightContainer: {
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 3,
		paddingHorizontal: 4
	},
	getStartedText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		lineHeight: 24,
		textAlign: "center"
	},
	tabBarInfoContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOffset: { height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3
			},
			android: {
				elevation: 20
			}
		}),
		alignItems: "center",
		backgroundColor: "#fbfbfb",
		paddingVertical: 20
	},
	tabBarInfoText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		textAlign: "center"
	},
	navigationFilename: {
		marginTop: 5
	},
	helpContainer: {
		marginTop: 15,
		alignItems: "center"
	},
	helpLink: {
		paddingVertical: 15
	},
	helpLinkText: {
		fontSize: 14,
		color: "#2e78b7"
	}
})
