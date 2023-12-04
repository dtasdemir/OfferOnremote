import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Dialog, SlideAnimation} from 'react-native-popup-dialog';
import {deviceWidth, isTablet} from "../../values/Constants/Constants";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {DialogContext} from '../../contexts/DialogContext';
import {ThemeContext} from "../../contexts/ThemeContext";
import {MyText} from "../Common/Text/MyText";
import {MyIcon} from "../Common/VectorIcon/MyIcon";

const _dialogType = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning"
};

export const MyDialog = (props) => {
    const {myColors} = useContext(ThemeContext);
    const {
        dialogType, show, twoButton, title, message,
        bpt, bnt, buttonPositive, buttonNegative, hideDialog
    } = useContext(DialogContext);

    function _buttonPositiveClick() {
        if (typeof buttonPositive == 'function') {
            buttonPositive();
        }
        // to hide dialog after button click
        hideDialog();
    }

    function  _buttonNegativeClick() {
        if (typeof buttonNegative() == 'function') {
            buttonNegative();
        }
        // to hide dialog after button click
        hideDialog();
    }

    function _buttonView(buttonColor) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: twoButton ? 10 : 80
                }}>

                {
                    twoButton &&

                    <TouchableOpacity
                        onPress={() => _buttonNegativeClick()}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            paddingVertical: 5,
                            backgroundColor: buttonColor
                        }}>

                        {_buttonTextView(bnt)}

                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => _buttonPositiveClick()}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        flex: 1,
                        marginRight: 10,
                        paddingVertical: 5,
                        marginLeft: twoButton ? 0 : 10,
                        backgroundColor: buttonColor
                    }}>

                    {_buttonTextView(bpt)}

                </TouchableOpacity>

            </View>
        );
    }

    function _buttonTextView(text) {
        return (
            <MyText
                text={text}
                textStyle={{
                    alignSelf: "center",
                    color: "white",
                    fontSize: hp(2.5),
                    fontWeight: "500",
                    textAlign: "center"
                }}/>
        )
    }

    function _iconView(bgColor, icon) {
        return (
            <View
                style={{
                    backgroundColor: bgColor,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 99999999999,
                    width: hp(6),
                    height: hp(6),
                    alignSelf: "center",
                    borderRadius: 100,
                    marginVertical: hp(1)
                }}>

                <MyIcon
                    iconName={icon}
                    iconGroup={"FontAwesome"}
                    iconStyle={{
                        color: "white",
                        fontSize: hp(3.5),
                        textAlign: "center"
                    }}/>

            </View>
        )
    }

    function _contentView(color) {
        return (
            <View
                style={{backgroundColor: "white"}}>

                {/* text view */}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    {/* title text */}
                    <MyText
                        text={title}
                        textStyle={{
                            fontSize: hp("3"),
                            textAlign: "center",
                            color: color,
                            fontWeight: "bold",
                            marginBottom: hp(0.5)
                        }}/>

                    {/* message text */}
                    <MyText
                        text={message}
                        textStyle={{
                            fontSize: hp("2%"),
                            textAlign: "center",
                            color: "grey",
                            fontWeight: "500",
                            marginHorizontal: wp(3),
                            paddingVertical: 5
                        }}/>

                </View>

                {/* button view */}
                {_buttonView(color)}

            </View>
        )
    }

    function _success() {
        return (
            <View>

                {_iconView(myColors.successColor, "check")}

                {_contentView(myColors.successColor)}

            </View>
        );
    }

    function _error() {
        return (
            <View>

                {_iconView(myColors.errorColor, "times")}

                {_contentView(myColors.errorColor)}

            </View>
        );
    }

    function _warning() {
        return (

            <View>

                {_iconView(myColors.warningColor, "exclamation")}

                {_contentView(myColors.warningColor)}

            </View>
        );
    }

    if(show) {
        return (

            <Dialog
                overlayBackgroundColor={"#454545"}
                width={isTablet ? (deviceWidth * 0.6) : (deviceWidth * 0.85)}
                visible={show}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                dialogStyle={{zIndex: 999}}>


                <View>

                    {
                        dialogType === _dialogType.SUCCESS &&
                        _success()
                    }

                    {
                        dialogType === _dialogType.ERROR &&
                        _error()
                    }

                    {
                        dialogType === _dialogType.WARNING &&
                        _warning()
                    }

                </View>


            </Dialog>

        )
    }

    return null;
}
