/**
 * Created by Orhan SARIBAL on 12.06.2023
 */

import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyIcon } from "../VectorIcon/MyIcon";
import { ThemeContext } from "../../../contexts/ThemeContext";

export const MyIconButton = (props) => {
	let {containerStyle, iconStyle, iconGroup, iconName, onPress, id} = props;

	const {myColors} = useContext(ThemeContext);

	return(
		<TouchableOpacity
			testID={id || ""}
			accessibilityLabel={id || ""}
			onPress={() => onPress()}
			style={{
				width: hp(3.5),
				height: hp(3.5),
				backgroundColor: myColors.viewBGColor,
				borderRadius: 100,
				alignItems: "center",
				justifyContent: "center",
				...containerStyle,
			}}>

			<MyIcon
				iconGroup={iconGroup}
				iconName={iconName}
				iconStyle={{
					color: myColors.darkIconColor,
					fontSize: hp(2.5),
					...iconStyle,
				}}/>

		</TouchableOpacity>
	)
}

MyIconButton.propTypes = {
	containerStyle: PropTypes.object,
	iconStyle: PropTypes.object,
	iconGroup: PropTypes.string,
	iconName: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
}

MyIconButton.defaultProps = {
	iconGroup: "IconSax"
}
