import React, {useState, useContext} from "react";
import PropTypes from 'prop-types';
import {TextInput, TouchableOpacity, View} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {ThemeContext} from "../../../contexts/ThemeContext";
import {platform} from "../../../values/Constants/Constants";

export const MyInput = (props) => {
    const {myColors} = useContext(ThemeContext);

    // to define props values
    let {
        leftIcon,
        rightIcon,
        iconColor,
        containerStyle,
        textInputStyle,
        textArea,
        placeholder,
        multiline,
        numberOfLines,
        editable,
        value,
        keyboardType,
        placeholderTextColor,
        secureTextEntry,
        autoCapitalize,
        returnKeyType,
        maxLength,
        inputRef
    } = props;

    // to store 'secureTextEntry' value that comes from props, for changing input area visibility
    const [togglePassword, passwordVisible] = useState(secureTextEntry);
    const [localRightIcon, setRightIcon] = useState(secureTextEntry ? "eye" : rightIcon);

    let mAutoCapitalize = keyboardType === "email-address" ? "none" : autoCapitalize

    return(

        <View
            style={{
                flexDirection: "row",
                marginVertical: 10,
                height: textArea ? hp(10) : (platform === "ios" ? hp(4.5) : hp(5.5)),
                borderRadius: 5,
                alignSelf: "center",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: myColors.mainColor,
                width: "100%",
                ...containerStyle
            }}>

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

                    <FAIcon
                        name={leftIcon}
                        style={{
                            textAlign: "center",
                            fontSize: hp(2.5),
                            color: iconColor || myColors.mainColor,
                        }}/>

                </View>
            }

            <TextInput
                {...props}
                ref={inputRef}
                returnKeyType={returnKeyType}
                autoCapitalize={mAutoCapitalize}
                secureTextEntry={togglePassword}
                multiline={multiline}
                maxLength={maxLength}
                numberOfLines={numberOfLines}
                editable={editable}
                value={value.toString()}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={{
                    flex: rightIcon ? 14 : 17,
                    padding: 10,
                    fontSize: hp(1.8),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: myColors.mainColor,
                    ...textInputStyle
                }}/>

            {
                localRightIcon &&

                <TouchableOpacity
                    disabled={!secureTextEntry}
                    onPress={() => {
                        passwordVisible(!togglePassword);
                        setRightIcon(togglePassword ? "eye-slash" : "eye");
                    }}
                    style={{
                        flex: 3,
                        alignSelf: "center",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                    <FAIcon
                        name={localRightIcon}
                        style={{
                            textAlign: "center",
                            fontSize: hp(2.5),
                            color: iconColor || myColors.mainColor,
                        }}/>

                </TouchableOpacity>

            }

            {
                (!localRightIcon && leftIcon) &&

                <View
                    style={{flex: 3}}/>
            }

        </View>

    )

};

// input props
MyInput.propTypes = {
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    rightIconOnPress: PropTypes.func,
    iconColor: PropTypes.string,
    containerStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    textArea: PropTypes.bool,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    editable: PropTypes.bool,
    value: PropTypes.string,
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"]),
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    placeHolderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(["none","sentences","words","characters"]),
    maxLength: PropTypes.number,
    ...TextInput.props
};

// input default props
MyInput.defaultProps = {
    textArea: false,
    placeholder: "",
    multiline: false,
    numberOfLines: 1,
    editable: true,
    value: "",
    secureTextEntry: false,
    autoCapitalize: "sentences",
    returnKeyType: "done"
};
