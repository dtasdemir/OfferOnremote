/**
 * Created by Orhan SARIBAL on 26-05-2021.
 */

import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {Text, TouchableOpacity, View} from "react-native";
import {shadowStyle} from "../../../values/Styles/Styles";
import {platform} from "../../../values/Constants/Constants";
import {MyIcon} from "../VectorIcon/MyIcon";
import {MyText} from "../Text/MyText";
import {ThemeContext} from "../../../contexts/ThemeContext";

export const MyPickerButton = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {
        buttonText, rightIcon, leftIcon, textStyle, containerStyle,
        shadow, iconColor, editable
    } = props;

    return(
        <TouchableOpacity
            {...props}
            style={[
                shadow ? shadowStyle : null,
                {
                    flexDirection: "row",
                    marginVertical: 10,
                    height: platform === "ios" ? hp(4.5) : hp(5.5),
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: "white",
                    width: "100%",
                    alignItems: "center",
                    ...containerStyle,

                }
            ]}>

            {/* left icon view */}
            {
                leftIcon &&

                <View
                    style={{
                        flex: 3,
                        alignSelf: "center",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                    <MyIcon
                        iconName={leftIcon}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            textAlign: "center",
                            fontSize: hp(2.5),
                            color: iconColor || myColors.mainColor,
                        }}/>

                </View>
            }

            {/* text view */}
            <MyText
                text={buttonText}
                isTitle={true}
                textStyle={{
                    flex: 17,
                    padding: 10,
                    fontSize: hp(1.8),
                    fontWeight: "500",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "grey",
                    ...textStyle
                }}/>

            {
                rightIcon && editable &&

                <View
                    style={{flex: 3, alignItems: "center"}}>

                    <MyIcon
                        iconName={rightIcon}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            color: myColors.textColor,
                            fontSize: hp(2)
                        }}/>

                </View>
            }

            {
                !rightIcon &&

                <View
                    style={{flex: 3}}/>
            }

        </TouchableOpacity>

    )
}

MyPickerButton.propTypes = {
    buttonText: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    textStyle: PropTypes.object,
    shadow: PropTypes.bool,
    editable: PropTypes.bool,
    containerStyle: PropTypes.object,
    iconColor: PropTypes.string,
};

MyPickerButton.defaultProps = {
    shadow: false,
    buttonText: "",
    editable: true
};
