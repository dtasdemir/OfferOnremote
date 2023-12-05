import React, {useContext, useEffect, useState} from "react";
import {Image, PermissionsAndroid, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import { MyButton } from "../../components/Common/Button/MyButton";
import { StringContext } from "../../contexts/StringContext";
import { ShowDialog, DialogType } from "../../helper/components/PopupDialogs";
import { ShowToast } from "../../helper/components/Toasts";
import DeviceInformation from "../../device/DeviceInformation";

export const NotLoginHomeScreen = (props) => {

    const {myStrings} = useContext(StringContext);

    let recordAudio = useState(new DeviceInformation().getRecordAudio());

    const [isRecording, setisRecording] = useState();

    function _handleStartRecording() {

        if(!recordAudio) {
          _PermissionRecordAudio()
        } else {
            setisRecording(true);
        }
        
    }

    function _handleStopRecording() {
        setisRecording(false);
    }

    async function _PermissionRecordAudio() {

        try {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
            );

            console.log(myStrings.toast);
            
            if (permission === PermissionsAndroid.RESULTS.GRANTED) {
                ShowToast.success(myStrings.toast.permissionMicrofonSucces);
                SyncStorage.set("recordAudio", true);
            } else if (permission === PermissionsAndroid.RESULTS.DENIED) {
                ShowToast.warning(myStrings.toast.permissionMicrofonWarning);
                SyncStorage.set("recordAudio", false);
            } else {
                ShowToast.error(myStrings.toast.permissionMicrofonError);
                SyncStorage.set("recordAudio", false);
            }

        } catch (error) {
            ShowToast.error(myStrings.toast.permissionMicrofonSucces);
        }
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
