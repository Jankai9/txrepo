import React from "react"
import { Icon, TouchableHighlight, View, Text } from "react-native-elements"

/*
parametrit:
  leftIconName?
  rightIconName
*/

export default class Header extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={styles.leftIcon}
					onTouchStart={this.props.navi.goBack()}
				>
					<Icon
						name="arrow-left" // this.props.leftIconName (jos on annettu)
						type="feather"
						color="#517fa4"
						size={30}
					/>
				</TouchableHighlight>

				<Text style={styles.title}>{this.props.title}</Text>

				{this.props.rightIconName && (
					<TouchableHighlight
						style={styles.rightIcon}
						onTouchStart={this.props.rightIconPressed}
					>
						<Icon
							name={this.props.rightIconName}
							type="feather"
							color="#517fa4"
							size={30}
						/>
					</TouchableHighlight>
				)}
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
	title: {
		backgroundColor: "#fff",
		marginTop: 1,
		marginLeft: 1
	},
	leftIcon: {
		backgroundColor: "#fff",
		marginTop: 1,
		marginLeft: 1
	},
	rightIcon: {
		backgroundColor: "#fff",
		marginTop: 1,
		marginLeft: 1
	}
})
