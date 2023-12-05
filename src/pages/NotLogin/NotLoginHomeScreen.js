import React, {useContext, useEffect, useState} from "react";
import {Image, PermissionsAndroid, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import { MyButton } from "../../components/Common/Button/MyButton";
import { StringContext } from "../../contexts/StringContext";
import { RequestAllPermission } from "../../helper/functions/Permission";

export const NotLoginHomeScreen = (props) => {

    const {myStrings} = useContext(StringContext);

    const [isRecording, setisRecording] = useState();

    function _handleStartRecording() {
        
      RequestAllPermission()
        .then(() => {
            console.log("HAZIRIM");
            setisRecording(true)
        })
        .catch((error) => {
            console.log("error", error)
        })
        
    }

    function _handleStopRecording() {
        setisRecording(false);
    }

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}
            header={true}
        >

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                
                {!isRecording ?
                    <MyButton size="big" buttonText={myStrings.button.start} onPress={() => _handleStartRecording()} /> :

                    <MyButton size="big" buttonText={myStrings.button.stop} onPress={() => _handleStopRecording()} />
                }
            </View>

        </MyContainer>
    );
}
