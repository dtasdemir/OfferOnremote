import React, {useContext} from "react";
import {View, TouchableOpacity} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Animatable from 'react-native-animatable';
import {MyIcon} from "../VectorIcon/MyIcon";
import {footerHeight} from "../../../values/Constants/Constants";
import {shadowStyle} from "../../../values/Styles/Styles";
import {ThemeContext} from "../../../contexts/ThemeContext";
import {MyText} from "../Text/MyText";
import {ToastContext} from "../../../contexts/ToastContext";

export const MyToast = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {show, color, message, icon, hideToast} = useContext(ToastContext);

    if (show) {
        return (
            <Animatable.View
                animation={"bounceInLeft"}
                duration={1000}
                style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom:  footerHeight + 10,
                    width: wp(95),
                    zIndex: 9999999,
                    ...shadowStyle
                }}>

                <TouchableOpacity
                    onPress={() => hideToast()}
                    style={{
                        backgroundColor: myColors.pageBGColor,
                        alignItems: "center",
                        borderRadius: 5,
                        flexDirection: "row",
                    }}>

                    <MyIcon
                        iconName={"x"}
                        iconGroup={"Feather"}
                        iconStyle={{
                            color: color,
                            fontSize: 15,
                            position: "absolute",
                            right: 5,
                            top: 5
                        }}/>

                    <View
                        style={{
                            width: 4,
                            height: "100%",
                            backgroundColor: color,
                        }}/>

                    {/* icon view */}
                    <View
                        style={{
                            marginHorizontal: 10,
                            backgroundColor: color,
                            width: hp(3.2),
                            height: hp(3.2),
                            borderRadius: 100,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>

                        {/* icon */}
                        <MyIcon
                            iconName={icon}
                            iconGroup={"Feather"}
                            iconStyle={{
                                fontSize: hp(2.2),
                                color: myColors.lightIconColor
                            }}/>

                    </View>

                    {/* content view */}
                    <View
                        style={{
                            marginVertical: 15,
                            marginRight: wp(5),
                            flex: 1,
                        }}>

                        {/* toast message text */}
                        <MyText
                            text={message}
                            textStyle={{
                                fontSize: hp(1.7),
                                color: myColors.textColor,
                                textAlign: "left",
                                fontWeight: "500",
                            }}/>

                    </View>

                </TouchableOpacity>

            </Animatable.View>
        )
    }
    else {
        return null;
    }
};
