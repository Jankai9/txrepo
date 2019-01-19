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

const styles = {
	root: {}
}
class LocationItem extends React.PureComponent {
    render () {
        return (
            <View style={styles.root}>
                    <Text>{this.props.description}</Text>
            </View>
        );
    }
}

export default class PlaceComponent extends React.Component {
	render() {
		return (
			<GoogleAutoComplete
				apiKey="AIzaSyBlXzW_f3mZD6bOVIsP6bsHhvcICbLD2PQ"
				debounce={300}
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
								/>
							))}
						</ScrollView>
					</React.Fragment>
				)}
			</GoogleAutoComplete>
		)
	}
}
