import React from "react"
import {
	View,
	TextInput,
	Text,
	Button,
	FlatList,
	TouchableOpacity
} from "react-native"

export default class HomeScreen extends React.Component {
	// create the title for the screen
	static navigationOptions = {
		title: "Home"
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
				<Text>Mistä:n (klikkaus vie toiselle sivulle)</Text>
				<TextInput
					value={this.state.startAddress}
					style={{ height: 40 }}
					placeholder="Lähtöpaikka"
					onTouchStart={this.onItemPressed.bind(this, "item")}
				/>
				<Text>tähän kartta.</Text>
			</View>
		)
	}
}
