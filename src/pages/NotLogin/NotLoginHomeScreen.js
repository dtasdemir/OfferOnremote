import React, {useContext, useEffect, useState} from "react";
import {Image, PermissionsAndroid, Text, View} from 'react-native';
import SyncStorage from "sync-storage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import { MyButton } from "../../components/Common/Button/MyButton";
import { StringContext } from "../../contexts/StringContext";
import { RequestAllPermission } from "../../helper/functions/Permission";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs'
import { MyFileUploadRequest } from "../../adapter/api/MyFileUploadRequest";

const audioRecorderPlayer = new AudioRecorderPlayer();

export const NotLoginHomeScreen = (props) => {

    const path = RNFS.DocumentDirectoryPath + "/test.wav" // şuanlık dosya ismi test sonrasında kaydederken belirlenecek // Bu dosyayı kontrol ettim ve var 

    const {myStrings} = useContext(StringContext);

    const [AudioData, setAudioData] = useState({
        RecordSecs: 0,
        RecordTime: '00:00:00',
        CurrentSecs: 0,
        CurrentTime: '00:00:00',
        isRecording: null,
        isPlaying: null,
    })

    const updateAudioData = (key,value) => {
        setAudioData(prev => ({
            ...prev,
            [key] : value,
        }));
    };


    function _handleStartRecording () {
        
      RequestAllPermission()
        .then(() => {

            audioRecorderPlayer.startRecorder(path).then((e) => {

                updateAudioData("isRecording", true);

                audioRecorderPlayer.addRecordBackListener((res) => {
                    
                    updateAudioData("RecordSecs", res.currentPosition);
                    updateAudioData("RecordTime", audioRecorderPlayer.mmssss(Math.floor(res.currentPosition)))

                })

            }).catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log("error", error)
        })
        
    }

    function _handleStopRecording(){

            audioRecorderPlayer.stopRecorder().then((response) => {
            
                updateAudioData("isRecording", false);

                audioRecorderPlayer.removeRecordBackListener();

                MyFileUploadRequest("test.wav", "http://localhost:8081", response );
            })
            
    }

    function _handleStartPlayer() {

        console.log(AudioData);

        if( AudioData.isPlaying === "paused") {

            audioRecorderPlayer.resumePlayer();
            
        } else {
            audioRecorderPlayer.startPlayer();

            audioRecorderPlayer.addPlayBackListener((e) => {

                if( AudioData.RecordSecs <= e.currentPosition) {
                    audioRecorderPlayer.stopPlayer();
                }

                updateAudioData("isPlaying", "started");
                updateAudioData("CurrentSecs", e.currentPosition);
                updateAudioData("CurrentTime", audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))

            })
        }
        
    }

    function _handlePausePlayer() {

        audioRecorderPlayer.pausePlayer();
        
        updateAudioData("isPlaying", "paused");

    }

    function _handleStopPlayer() {

        audioRecorderPlayer.stopPlayer();
        updateAudioData("isPlaying", "stoped");

    }

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}
            header={true}
        >

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

                { AudioData.isRecording === true && <Text>{AudioData.RecordTime}</Text> }

                { AudioData.isRecording === false && <Text>{AudioData.CurrentTime}</Text> }

                { AudioData.isRecording === null && <MyButton size="big" buttonText={myStrings.button.start} onPress={_handleStartRecording} /> }

                { AudioData.isRecording === true && <MyButton size="big" buttonText={myStrings.button.stop} onPress={_handleStopRecording} /> }

                { AudioData.isRecording === false &&
                
                    <View>

                        <MyButton size="big" buttonText={"Oynat"} onPress={_handleStartPlayer} />

                        <MyButton size="big" buttonText={"Duraklat"} onPress={_handlePausePlayer} />

                        <MyButton size="big" buttonText={"Durdur"} onPress={_handleStopPlayer} />

                    </View>
                }

            </View>

        </MyContainer>
    );
}
