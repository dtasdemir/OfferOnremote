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
import { MyAudioContent } from "../../components/Content/MyAudioContent";
import { MyAudioFooter } from "../../components/Footer/MyAudioFooter";
import { ShowToast } from "../../helper/components/Toasts";

const audioRecorderPlayer = new AudioRecorderPlayer();

export const NotLoginHomeScreen = (props) => {

    const path = RNFS.DocumentDirectoryPath + "/test.wav" // şuanlık dosya ismi test sonrasında kaydederken belirlenecek // Bu dosyayı kontrol ettim ve var 

    const {myStrings} = useContext(StringContext);

    const [AudioData, setAudioData] = useState({
        RecordSecs: 0,
        RecordTime: '00:00:00',
        CurrentSecs: 0,
        CurrentTime: '00:00:00',
        isRecording: false,
        isPlaying: false,
        isVolume: false,
        isStopping: false,
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

            if ( AudioData.isStopping) {
                
                audioRecorderPlayer.resumeRecorder();

                updateAudioData("isStopping", false);

            } else {
                audioRecorderPlayer.startRecorder(path).then((e) => {

                    updateAudioData("isRecording", true);
    
                    audioRecorderPlayer.addRecordBackListener((res) => {
                        
                        updateAudioData("RecordSecs", res.currentPosition);
                        updateAudioData("RecordTime", audioRecorderPlayer.mmssss(Math.floor(res.currentPosition)))
    
                    })
                }).catch((error) => {
                    console.log(error);
                })
            }
           
        })
        .catch((error) => {
            console.log("error", error)
        })
        
    }

    function _handlePauseRecording() {
        audioRecorderPlayer.pauseRecorder();

        updateAudioData("isStopping", true);
    }

    function _handleUploadRecording(){

        _handlePauseRecording();

            audioRecorderPlayer.stopRecorder()
                .then((response) => {
            
                    audioRecorderPlayer.removeRecordBackListener();

                    MyFileUploadRequest("test.wav", "http://localhost:8081", response );
                })
                .catch((error) => {
                    console.error(error);
                    updateAudioData("isRecording", false);
                })
            
    }

    function _handleDeleteRecording() {

        RNFS.unlink(path).then((response) => {

            ShowToast.success("Kayıt başarıyla silindi", 2000); // Bunu stringlere yaz

            audioRecorderPlayer.stopRecorder();

            updateAudioData("RecordSecs", 0);
            updateAudioData("RecordTime", "00:00:00");
            updateAudioData("isRecording", false);

        }).catch((error) => {
            ShowToast.error("Lütfen tekrar deneyiniz", 2000); // Bunu stringlere yaz
        })

    }

    // Kaydı dinleme kısmı Detay sayfasında kullanacağım
    // function _handleStartPlayer() {

    //     console.log(AudioData);

    //     if( AudioData.isPlaying === "paused") {

    //         audioRecorderPlayer.resumePlayer();
            
    //     } else {
    //         audioRecorderPlayer.startPlayer();

    //         audioRecorderPlayer.addPlayBackListener((e) => {

    //             if( AudioData.RecordSecs <= e.currentPosition) {
    //                 audioRecorderPlayer.stopPlayer();
    //             }

    //             updateAudioData("isPlaying", "started");
    //             updateAudioData("CurrentSecs", e.currentPosition);
    //             updateAudioData("CurrentTime", audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))

    //         })
    //     }
        
    // }

    // function _handlePausePlayer() {


    //     audioRecorderPlayer.pausePlayer();
        
    //     updateAudioData("isPlaying", "paused");

    // }

    // function _handleStopPlayer() {

    //     audioRecorderPlayer.stopPlayer();
    //     updateAudioData("isPlaying", "stoped");

    // }

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}
            header={true}
        >

        <MyAudioContent isRecording={AudioData.isRecording} isVolume={AudioData.isVolume} recordTime={AudioData.RecordTime} />

        <MyAudioFooter 
            isRecording={AudioData.isRecording}
            isStopping={AudioData.isStopping}
            startRecordFunc={_handleStartRecording}
            pauseRecordFunc={_handlePauseRecording}
            deleteAudioFunc={_handleDeleteRecording}
            uploadAudioFunc={_handleUploadRecording}

        />

        </MyContainer>
    );
}
