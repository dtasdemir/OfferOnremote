import React, {useContext, useEffect, useState} from "react";
import {Image, PermissionsAndroid, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import { MyButton } from "../../components/Common/Button/MyButton";
import { StringContext } from "../../contexts/StringContext";
import { RequestAllPermission } from "../../helper/functions/Permission";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export const NotLoginHomeScreen = (props) => {
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const [RecordSecs, setRecordSecs] = useState(0);
    const [RecordTime, setRecordTime] = useState(0);

    const {myStrings} = useContext(StringContext);

    const [isRecording, setisRecording] = useState();

    const _handleStartRecording = async = () => {
        
      RequestAllPermission()
        .then(() => {
            audioRecorderPlayer.startRecorder().then((e) => {
                console.log(e)
                setisRecording(true)
                audioRecorderPlayer.addRecordBackListener((res) => {
                    console.log(res,"STARTTAN GELİYORUM");
                    setRecordSecs(res.currentPosition);
                    setRecordTime(audioRecorderPlayer.mmssss(Math.floor(res.currentPosition)));
                })
                setisRecording(true)
            }).catch((error) => {
                console.log(error);
            })

            // console.log(result, "START")

            // audioRecorderPlayer.addRecordBackListener((e) => {

            //     setRecordSecs(e.currentPosition);
            //     setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            // })

            // setisRecording(true)
        })
        .catch((error) => {
            console.log("error", error)
        })
        
    }

    const _handleStopRecording = () => {

        audioRecorderPlayer.stopRecorder().then((e) => {
            console.log(e)
            setRecordTime(0);
            setRecordSecs(0);
        }).catch((error) => {
            console.log(error);
        })

        // const result = audioRecorderPlayer.stopRecorder();

        // console.log(result, "STOP")

        // audioRecorderPlayer.removeRecordBackListener(() => {
        //     setRecordSecs();
        //     setRecordTime(audioRecorderPlayer.mmssss(0));
        // })
        
        // setisRecording(false);
    }

    useEffect(() => {
        console.log(RecordTime);
    }, [RecordTime])

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}
            header={true}
        >

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                
                {!isRecording ?
                    <MyButton size="big" buttonText={myStrings.button.start} onPress={_handleStartRecording} /> :

                    <MyButton size="big" buttonText={myStrings.button.stop} onPress={_handleStopRecording} />
                }
            </View>

        </MyContainer>
    );
}
