import React, {useContext, useEffect, useState} from "react";
import {Image, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import { MyButton } from "../../components/Common/Button/MyButton";
import { StringContext } from "../../contexts/StringContext";

export const NotLoginHomeScreen = (props) => {

    const {myStrings} = useContext(StringContext);

    const [isRecording, setisRecording] = useState();

    function _handleStartRecording() {
        setisRecording(true);
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
