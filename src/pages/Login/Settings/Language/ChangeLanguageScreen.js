import React, {useContext} from "react";
import {View} from "react-native";
import SyncStorage from "sync-storage";
import {MyContainer} from "../../../../components/Container/Container";
import {MyListItemIcon} from "../../../../components/ListItem/MyListItemIcon";
import {StringContext} from "../../../../contexts/StringContext";
import {stringAlias} from "../../../../values/Strings/Strings";
import { DialogType, ShowDialog } from "../../../../helper/components/PopupDialogs";

export const ChangeLanguageScreen = (props) => {
    const {myStrings, updateString} = useContext(StringContext);

    function _handleLanguageSelection(languageCode) {
        ShowDialog({
            type: DialogType.warning,
            title: myStrings.language,
            message: myStrings.alertDialogs.languageMessage,
            positiveText: myStrings.button.yes,
            negativeText: myStrings.button.no
        })
        .then(() => {
            // to save selected language
            SyncStorage.set('language', languageCode);

            updateString(languageCode);
        })
    }

    return(

        <MyContainer
            title={myStrings.language}>

            <View>

                {/* language list item */}
                <MyListItemIcon
                    iconName={"globe"}
                    title={"Türkçe"}
                    onPress={() => {_handleLanguageSelection(stringAlias.TR)}}/>

                {/* language list item */}
                <MyListItemIcon
                    iconName={"globe"}
                    title={"English"}
                    onPress={() => {_handleLanguageSelection(stringAlias.EN)}}/>

            </View>

        </MyContainer>

    )

}
