import React, {useContext} from "react";
import {MyContainer} from "../../../components/Container/Container";
import {navigate} from "../../../RootMethods/RootNavigation";
import {MyListItemIcon} from "../../../components/ListItem/MyListItemIcon";
import {StringContext} from "../../../contexts/StringContext";

export const SettingsScreen = (props) => {

    const {myStrings} = useContext(StringContext);

    return(

        <MyContainer
            footerActiveIndex={3}
            title={myStrings.settings}>

            {/* change language list item */}
            <MyListItemIcon
                iconName={"globe"}
                title={myStrings.language}
                onPress={() => navigate("ChangeLanguageScreen")}/>

            {/* change password list item */}
            <MyListItemIcon
                iconName={"lock"}
                title={myStrings.changePassword}
                onPress={() => navigate("ChangePasswordScreen")}/>

            {/* change theme list item */}
            <MyListItemIcon
                iconName={"edit"}
                title={myStrings.changeTheme}
                onPress={() => navigate("ChangeThemeScreen")}/>

        </MyContainer>

    )
}
