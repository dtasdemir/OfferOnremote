import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {shadowStyle} from '../../../values/Styles/Styles';
import {ThemeContext} from "../../../contexts/ThemeContext";
import {MyIcon} from "../VectorIcon/MyIcon";
import {MyText} from "../Text/MyText";

export const MyButton = (props) => {
    const {myColors} = useContext(ThemeContext);

    // to define props values
    let {
        containerStyle,
        textStyle,
        leftIcon,
        stickyIcon,
        iconStyle,
        leftIconStyle,
        rightIconStyle,
        buttonText,
        rightIcon,
        filled,
        size,
        type,
        shadow
    } = props;

    const buttonColors = {
        default: myColors.mainColor,
        success: myColors.successColor,
        warning: myColors.warningColor,
        danger: myColors.errorColor,
        info: myColors.infoColor,
    };

    // to determine button style
    function getButtonStyle(type, size, filled) {
        let style = {};
        switch (size) {
            case "big":
                style = {
                    button: {
                        height: hp("7%"),
                        backgroundColor: filled ? buttonColors[type] : "transparent",
                        borderColor: filled ? "transparent" : buttonColors[type],
                        borderWidth: filled ? 0 : 1
                    },
                    text: {
                        fontSize: hp(2),
                        color: filled ? "white" : buttonColors[type]
                    },
                    icon: {
                        fontSize: hp(2.5),
                        color: filled ? "white" : buttonColors[type]
                    },
                };
                break;
            case "medium":
                style = {
                    button: {
                        height: hp("5%"),
                        backgroundColor: filled ? buttonColors[type] : "transparent",
                        borderColor: filled ? "transparent" : buttonColors[type],
                        borderWidth: filled ? 0 : 1
                    },
                    text: {
                        fontSize: hp(1.8),
                        color: filled ? "white" : buttonColors[type]
                    },
                    icon: {
                        fontSize: hp(2.2),
                        color: filled ? "white" : buttonColors[type]
                    },
                };
                break;
            case "small":
                style={
                    button: {
                        height: hp("4.2%"),
                        backgroundColor: filled ? buttonColors[type] : "transparent",
                        borderColor: filled ? "transparent" : buttonColors[type],
                        borderWidth: filled ? 0 : 1
                    },
                    text: {
                        fontSize: hp("1.5%"),
                        color: filled ? "white" : buttonColors[type]
                    },
                    icon: {
                        fontSize: hp(1.9),
                        color: filled ? "white" : buttonColors[type]
                    },
                };
                break;
            case "xSmall":
                style = {
                    button: {
                        height: hp("3.5%"),
                        backgroundColor: filled ? buttonColors[type] : "transparent",
                        borderColor: filled ? "transparent" : buttonColors[type],
                        borderWidth: filled ? 0 : 1
                    },
                    text: {
                        fontSize: hp("1.3%"),
                        color: filled ?  "white" : buttonColors[type],
                    },
                    icon: {
                        fontSize: hp(1.6),
                        color: filled ? "white" :  buttonColors[type],
                    },
                };
                break;
            default:
                style = {
                    button: {
                        height: hp("5%"),
                        backgroundColor: filled ? buttonColors[type] : "transparent",
                        borderColor: filled ? "transparent" : buttonColors[type],
                        borderWidth: filled ? 0 : 1
                    },
                    text: {
                        fontSize: hp(1.8),
                        color: filled ? "white" : buttonColors[type]
                    },
                    icon: {
                        fontSize: hp(2.2),
                        color: filled ? "white" : buttonColors[type]
                    },
                };
                break;
        }

        return style;
    }

    let style = getButtonStyle(type, size, filled);

    return (

        <TouchableOpacity
            {...props}
            style={[
                shadow ? shadowStyle : null,
                {
                    flexDirection: "row",
                    margin: 10,
                    width: "100%",
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    justifyContent: "center",
                    ...style["button"],
                    ...containerStyle,
                }
            ]}>

            {/* button left icon */}
            {
                leftIcon &&

                <View
                    style={{
                        flex: stickyIcon ? 0 : 1,
                        right: stickyIcon ? 10 : 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <MyIcon
                        iconName={leftIcon}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            ...style["icon"],
                            ...iconStyle,
                            ...leftIconStyle
                        }}/>

                </View>
            }

            {
                !leftIcon &&

                <View
                    style={{flex: stickyIcon ? 0 : 1}}/>
            }


            {/* button text */}
            <View
                style={{flex: stickyIcon ? 0 : 8}}>

                <MyText
                    text={buttonText}
                    isTitle={true}
                    textStyle={{
                        textAlign: "center",
                        ...style["text"],
                        ...textStyle
                    }}/>

            </View>

            {/* button right icon */}
            {
                rightIcon &&

                <View
                    style={{
                        flex: stickyIcon ? 0 : 1,
                        left: stickyIcon ? 10 : 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <MyIcon
                        iconName={rightIcon}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            ...style["icon"],
                            ...iconStyle,
                            ...rightIconStyle
                        }}/>

                </View>
            }

            {
                !rightIcon &&

                <View
                    style={{flex: stickyIcon ? 0 : 1}}/>
            }

        </TouchableOpacity>
    )
};

MyButton.propTypes = {
    buttonText: PropTypes.string,
    textStyle: PropTypes.object,
    type: PropTypes.oneOf(['default', 'success', 'danger', 'warning', 'info']),
    size: PropTypes.oneOf(['default', 'big', 'medium', 'small', 'xSmall']),
    leftIcon: PropTypes.string,
    leftIconStyle: PropTypes.object,
    rightIcon: PropTypes.string,
    rightIconStyle: PropTypes.object,
    stickyIcon: PropTypes.bool,
    filled: PropTypes.bool,
    shadow: PropTypes.bool,
    containerStyle: PropTypes.object,
    ...TouchableOpacity.props,
};

MyButton.defaultProps = {
    filled: true,
    type: "default",
    size: "default",
    stickyIcon: false,
    shadow: false,
    buttonText: ""
};
