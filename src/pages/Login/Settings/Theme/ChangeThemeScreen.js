import React, {useContext} from "react";
import {MyContainer} from "../../../../components/Container/Container";
import {MyButton} from "../../../../components/Common/Button/MyButton";
import {colorAlias} from "../../../../values/Colors/Colors";
import {ThemeContext} from "../../../../contexts/ThemeContext";
import {StringContext} from "../../../../contexts/StringContext";
import SyncStorage from "sync-storage";

export const ChangeThemeScreen = (props) => {

    const {updateTheme} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    function _changeTheme(alias) {
        SyncStorage.set("theme", alias);
        updateTheme(alias);
    }

    return(

        <MyContainer
            title={myStrings.changeTheme}>

            <MyButton
                onPress={() => _changeTheme(colorAlias.DEFAULT)}
                buttonText={"DEFAULT"}
                containerStyle={{backgroundColor: "#ff8600"}}/>

            <MyButton
                onPress={() => _changeTheme(colorAlias.RED)}
                buttonText={"RED"}
                containerStyle={{backgroundColor: "#f24343"}}/>

            <MyButton
                onPress={() => _changeTheme(colorAlias.BLUE)}
                buttonText={"BLUE"}
                containerStyle={{backgroundColor: "#3580DF"}}/>

            <MyButton
                onPress={() => _changeTheme(colorAlias.DARK)}
                buttonText={"DARK"}
                containerStyle={{backgroundColor: "#000"}}/>

        </MyContainer>

    )
}
