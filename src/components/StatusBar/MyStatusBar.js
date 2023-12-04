import React, {useContext} from 'react';
import {View, StatusBar} from 'react-native';
import {platform, statusBarHeight} from "../../values/Constants/Constants";
import {ThemeContext} from "../../contexts/ThemeContext";

export const MyStatusBar = (props) => {
    const {myColors} = useContext(ThemeContext);

    return(
        <View>

            {
                platform === "ios"  ?

                    // iOS
                    <View>
                        <View style={{backgroundColor: myColors.statusbarColor, height:statusBarHeight}}/>
                        <StatusBar backgroundColor={myColors.statusbarColor} barStyle="light-content" />
                    </View>

                    :

                    // android
                    <View
                        style={{backgroundColor: myColors.statusbarColor}}>

                        <StatusBar backgroundColor={myColors.statusbarColor} barStyle="light-content" />

                    </View>

            }

        </View>
    );
};
