import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Text, View, ViewPropTypes} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyPickerButton} from "../Common/Button/MyPickerButton";
import {MyInput} from "../Common/Input/MyInput";
import {MyDatePicker} from "../Common/Picker/MyDatePicker";
import {ThemeContext} from "../../contexts/ThemeContext";
import {_MF} from "../../helper/functions/MyFunctions";

export const UserInfoView = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {
        onPress, icon, onChangeText, keyboardType, value,
        isPicker, title, placeholder, returnKeyType, isDatePicker,
        titleColor, secureTextEntry, editable, maxLength,
        textControl, textArea, containerStyle, textStyle,
        titleTextStyle, containerViewStyle, inputRef, onSubmitEditing,
        isLoading, numberOfLines
    } = props;

    const [myValue, setMyValue] = useState(value)

    useEffect(() => {
        setMyValue(value);
    }, [value]);

    const mTitleColor = titleColor || myColors.titleTextColor

    return (

        <View
            style={{
                alignSelf: "center",
                width: "100%",
                ...containerViewStyle
            }}>

            {/* title text */}
            <Text
                style={{
                    marginTop: 5,
                    fontSize: hp(1.7),
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    display: title ? "flex" : "none",
                    color: mTitleColor,
                    ...titleTextStyle
                }}>

                {title}

            </Text>

            {
                (isPicker) &&

                <MyPickerButton
                    editable={editable}
                    disabled={!editable}
                    onPress={() => {
                        if (typeof onPress === "function") {
                            onPress();
                        }
                    }}
                    buttonText={value ? value : placeholder}
                    containerStyle={{
                        backgroundColor: myColors.viewBGColor,
                        borderBottomWidth: 0,
                        ...containerStyle
                    }}
                    textStyle={{color: myColors.titleTextColor, ...textStyle}}
                    leftIcon={icon || null}
                    isLoading={isLoading}
                    rightIcon={"chevron-down"}/>

            }

            {
                (!isPicker && !isDatePicker) &&

                <MyInput
                    onSubmitEditing={onSubmitEditing}
                    inputRef={inputRef}
                    maxLength={maxLength || 9999}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    value={myValue}
                    numberOfLines={numberOfLines}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    textArea={textArea}
                    multiline={textArea}
                    onChangeText={value => {
                        if (typeof onChangeText === "function") {
                            if (textControl && _MF.onlyCharacterControl(value)){
                                setMyValue(value);
                                onChangeText(value);
                            }
                            else if (!textControl) {
                                setMyValue(value);
                                onChangeText(value);
                            }
                        }
                    }}
                    containerStyle={{
                        backgroundColor: myColors.viewBGColor,
                        borderBottomWidth: 0,
                        ...containerStyle
                    }}
                    textInputStyle={{color: myColors.titleTextColor, ...textStyle}}
                    editable={editable}
                    leftIcon={icon || null}/>

            }

            {
                isDatePicker &&

                <MyDatePicker
                  value={value}
                  birthday={true}
                  rightIcon={"chevron-down"}
                  leftIcon={icon}
                  selectedDate={value => {
                    setMyValue(value);
                    if (typeof onChangeText === "function") {
                      onChangeText(value)
                    }
                  }}
                  containerStyle={{
                    backgroundColor: myColors.viewBGColor,
                    borderBottomWidth: 0,
                    ...containerStyle
                  }}/>
            }

        </View>

    )

};

UserInfoView.propTypes = {
    onPress: PropTypes.func,
    onChangeText: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    isPicker: PropTypes.bool,
    isDatePicker: PropTypes.bool,
    value: PropTypes.string,
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"]),
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    titleColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    isRegister: PropTypes.bool,
    textControl: PropTypes.bool,
    textArea: PropTypes.bool,
    maxLength: PropTypes.number,
    containerStyle: PropTypes.object,
    containerViewStyle: PropTypes.object,
    textStyle: PropTypes.object,
    titleTextStyle: PropTypes.object,
    isLoading: PropTypes.bool,
    numberOfLines: PropTypes.number,
};

UserInfoView.defaultProps = {
    placeholder: "",
    icon: "",
    isPicker: false,
    isDatePicker: false,
    key: "",
    value: "",
    keyboardType: "default",
    returnKeyType: "done",
    secureTextEntry: false,
    editable: true,
    isRegister: true,
    maxLength: 9999,
    textControl: false,
    textArea: false,
    isLoading: false
};
