import React, {useContext, useEffect, useState} from "react";
import {Image, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import {LoginContext} from "../../contexts/LoginContext";
import {ThemeContext} from "../../contexts/ThemeContext";
import { MyIcon } from "../../components/Common/VectorIcon/MyIcon";
import { MyText } from "../../components/Common/Text/MyText";
import { StringContext } from "../../contexts/StringContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DialogType, ShowDialog } from "../../helper/components/PopupDialogs";
import { stringAlias } from "../../values/Strings/Strings";
import DeviceInformation from "../../device/DeviceInformation";

export const NotLoginHomeScreen = (props) => {
    const loginContext = useContext(LoginContext);
    const {myColors} = useContext(ThemeContext);

    let [LocalLanguageCode, setLocalLanguageCode] = useState(new DeviceInformation().getLocaleLanguage());
    
    const {myStrings, updateString } = useContext(StringContext);


    // sample login process for changing navigation container
    function _handleLogin() {
        // to let know the navigator user has login
        loginContext.setLogin(true);
    }

    function _handleLanguageSelection(languageCode) {
        console.log(languageCode);
        ShowDialog({
            type: DialogType.warning,
            title: myStrings.language,
            message: myStrings.alertDialogs.languageMessage,
            positiveText: myStrings.button.yes,
            negativeText: myStrings.button.no
        }).then(() => {
            SyncStorage.set('language', languageCode);

            setLocalLanguageCode(languageCode);

            updateString(languageCode);
        })
    }

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}>
                <Text >{}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                <MyIcon 
                    iconGroup={"Feather"}
                    iconName={"user"}
                    iconStyle={{
                        fontSize: hp(3.5),
                        width: 44,
                        height: 44,
                        backgroundColor: myColors.mainColor,
                        borderRadius : hp(3),
                        padding: 8,
                        color: myColors.iconColor,
                        marginRight: 8
                    }}
                />

                <View style={{ flexDirection: "column"}}>


                    <View style={{ flexDirection: 'row'}}>
                        
                        <MyText text={myStrings.hello} />

                    </View>

                    <TouchableOpacity onPress={() => _handleLogin()}>
                        
                        <MyText isTitle text={myStrings.login} textStyle={{ fontSize: hp(2.2)}} />
                    
                    </TouchableOpacity>

                </View>

                <View style={{flex: 1}} />

                <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: myColors.borderColor, padding: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 60}}>
                    
                    <Image
                        style={{ width: 20, height: 20, marginRight: 8}}
                        resizeMode="contain"
                        source={LocalLanguageCode === "tr" ? require("../../assets/image/flag_tr.png") : require("../../assets/image/flag_en.png")}
                    />

                    <MyText  text={LocalLanguageCode.toUpperCase()}/>
                    <MyIcon iconGroup="Feather" iconName="chevron-down" iconStyle={{
                        color: myColors.infoColor,
                        fontSize: hp(2),
                        marginHorizontal: 4
                    }} />

                </TouchableOpacity>

                <MyIcon 
                    iconGroup={"Feather"}
                    iconName={"bell"}
                    iconStyle={{
                        fontSize: hp(2.5),
                        marginLeft: 16,
                        width: 40,
                        height: 40,
                        borderRadius : hp(3),
                        padding: 10,
                        color: myColors.darkIconColor,
                        borderWidth:1,
                        borderColor: myColors.iconViewColor,
                        marginRight: 8
                    }}
                />

            </View>

            <View>

                {/* language list item */}
                <Text onPress={() => {_handleLanguageSelection(stringAlias.TR)}}>Türkçe</Text>

                <Text onPress={() => {_handleLanguageSelection(stringAlias.EN)}}>İngilizce</Text>

            </View>


        </MyContainer>
    );
}
