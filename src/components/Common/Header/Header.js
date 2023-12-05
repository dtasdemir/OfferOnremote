import React, {useContext, useEffect, useState} from "react";
import {Image, Text, View, TouchableOpacity} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../../components/Container/Container";
import { navigate } from "../../../RootMethods/RootNavigation";
import {LoginContext} from "../../../contexts/LoginContext";
import {ThemeContext} from "../../../contexts/ThemeContext";
import { MyIcon } from "../../../components/Common/VectorIcon/MyIcon";
import { MyText } from "../../../components/Common/Text/MyText";
import { StringContext } from "../../../contexts/StringContext";
import { DialogType, ShowDialog } from "../../../helper/components/PopupDialogs";
import { stringAlias } from "../../../values/Strings/Strings";
import DeviceInformation from "../../../device/DeviceInformation";
import { MyPicker } from "../Picker/MyPicker";

export const Header = (props) => {
    const loginContext = useContext(LoginContext);
    const {myColors} = useContext(ThemeContext);
    const {myStrings, updateString} = useContext(StringContext);

    const [showPicker, setShowPicker] = useState(false);

    let [LocalLanguageCode, setLocalLanguageCode] = useState(new DeviceInformation().getLocaleLanguage());

    let isLogin = loginContext.isLogin;

    function _handleLogin() {
        // Sign In sayfası oluşturduğunda oraya atayacaksın
        loginContext.setLogin(true);
    }

    function _handleLanguageSelection(languageCode) {
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
        <>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16}}>

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
                        marginRight: 8,
                        marginLeft: 4,
                    }}
                />

                <View style={{ flexDirection: "column"}}>


                    <View style={{ flexDirection: 'row'}}>
                        
                        <MyText text={myStrings.hello} />

                    </View>


                    {isLogin ?  
                        <MyText isTitle text="Derya Taşdemir" textStyle={{ fontSize: hp(2.1)}} />:
                        
                        <TouchableOpacity onPress={() => _handleLogin()}>
                        
                            <MyText isTitle text={myStrings.login} textStyle={{ fontSize: hp(2.1)}} />
                    
                        </TouchableOpacity>

                    }
                    

                </View>

                <View style={{flex: 1}} />
                

                {/** Language Picker Button */}
                <TouchableOpacity onPress={() => setShowPicker(true)} style={{ flexDirection: 'row', borderWidth: 1, borderColor: myColors.borderColor, padding: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 60}}>
                    
                    <Image
                        style={{ width: 20, height: 20, marginRight: 8}}
                        resizeMode="contain"
                        source={LocalLanguageCode === "tr" ? require("../../../assets/image/flag_tr.png") : require("../../../assets/image/flag_en.png")} // Eğer vaktin kalırsa burada zaten flag_{languageCode}.png şeklinde bunu ayarla
                    />

                    <MyText textStyle={{marginRight: 4}} text={LocalLanguageCode.toUpperCase()}/>
                    
                    <MyIcon iconGroup="Feather" iconName="chevron-down" iconStyle={{
                        color: myColors.infoColor,
                        fontSize: hp(2),
                        marginRight: 4
                    }} 
                    />

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

            <MyPicker 
                search={true} 
                bottom={true} 
                pickerVisible={showPicker} 
                pickerOnClose={() => setShowPicker(false)} 
                onSelect={(data) => {

                    _handleLanguageSelection(data.languageCode);

                }}
                data={[
                    { id: 0, title: "Türkçe", languageCode: "tr"},
                    { id: 0, title: "İngilizce", languageCode: "en"}
                ]}

            />
            </>
    )


}

Header.propTypes = {
    
}