import React, {useContext, useState} from "react";
import {View, TouchableOpacity, Image, ScrollView} from "react-native";
import {statusBarHeight} from "../../values/Constants/Constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {closeDrawer, navigate} from '../../RootMethods/RootNavigation';
import {LoginContext} from '../../contexts/LoginContext';
import DeviceInformation from "../../device/DeviceInformation";
import {ThemeContext} from "../../contexts/ThemeContext";
import {StringContext} from "../../contexts/StringContext";
import {MyIcon} from "../Common/VectorIcon/MyIcon";
import {MyText} from "../Common/Text/MyText";

export const DrawerMenu = (props) => {
    const loginContext = useContext(LoginContext);
    const {myColors} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    const [appVersion, setAppVersion] = useState(new DeviceInformation().getAppVersion)

    function _logoutRequest() {
        // to close drawer menu after logout
        closeDrawer();

        // to let know the navigator user has no more login
        loginContext.setLogin(false);
    }

    function _renderMenuItem(icon, text, navigateTo) {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: hp("1.5%"),
                    marginVertical: hp("2%"),
                    marginLeft: wp("3%")
                }}
                onPress={() =>{
                    navigateTo ? navigate(navigateTo) : _logoutRequest();
                }}>

                <MyIcon
                    iconName={icon}
                    iconGroup={"Feather"}
                    iconStyle={{
                        flex: 1,
                        fontSize: hp("3%"),
                        color: "white",
                        textAlign: "center"
                    }}/>

                <MyText
                    isTitle={true}
                    text={text}
                    textStyle={{
                        flex: 8,
                        fontSize: hp("2.2%"),
                        color: "white",
                        marginLeft: 10,
                    }}/>

            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: myColors.mainColor,
                overflow: "scroll" //image block footer buttons weirdly if remove this overflow scroll
            }}>

            <View
                style={{
                    paddingTop: statusBarHeight + 10,
                    height: hp("20%"),
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: wp("5%")
                }}>

                <TouchableOpacity
                    style={{alignItems: "center", justifyContent: "center", marginTop: 10}}
                    onPress={() => navigate("Profile")}>

                    <View
                        style={{
                            width: hp("10.5%"),
                            height: hp("10.5%"),
                            borderWidth: 2,
                            borderColor: "white",
                            borderRadius: hp(5),
                            alignItems: "center",
                            justifyContent: "center"
                        }}>

                        <Image
                            style={{width: hp("10%"), height: hp("10%")}}
                            resizeMode={"contain"}
                            source={require("../../assets/image/guest.png")}/>

                    </View>

                    <MyText
                        isTitle={true}
                        text={"user@mail.com"}
                        textStyle={{
                            color: "white",
                            textAlign: "center",
                            marginTop: 20,
                            fontWeight: "bold",
                            fontSize: hp(2)
                        }}/>

                </TouchableOpacity>

            </View>

            <ScrollView
                style={{marginTop: hp("5%"), marginBottom: hp("1%")}}>

                {/* settings button */}
                {_renderMenuItem("settings", myStrings.settings, "SettingsScreen")}

                {/* logout button */}
                {_renderMenuItem("log-out", myStrings.logout, false)}

            </ScrollView>

            {/* logo view */}
            <View
                style={{alignItems: "center", justifyContent: "center", marginBottom: 20}}>

                <Image
                    style={{height: hp("8%")}}
                    resizeMode={"contain"}
                    source={require("../../assets/logo/rocket.png")}/>

                <MyText
                    isTitle={true}
                    text={"v " + appVersion}
                    textStyle={{
                        color: "white",
                        fontSize: hp(1.8),
                        fontWeight: "bold",
                        marginVertical: 5
                    }}/>

            </View>

        </View>
    );
}
