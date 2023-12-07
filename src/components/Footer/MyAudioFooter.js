import React, { useContext } from "react";
import { Image, Text, View, TouchableOpacity} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import PropTypes from 'prop-types';
import { ThemeContext } from "../../contexts/ThemeContext";

export const MyAudioFooter = (props) => {

    let { isRecording, isStopping, startRecordFunc, pauseRecordFunc, deleteAudioFunc, uploadAudioFunc, uploadDocumentFunc, uploadDirectDocumentFunc } = props

    const {myColors} = useContext(ThemeContext);

    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            { isRecording ?

                <>

                <TouchableOpacity activeOpacity={0.7} onPress={deleteAudioFunc} >
                    <Image source={require("../../assets/image/close.png")} style={{width: 56, height: 56}} />
                </TouchableOpacity>

                {
                    isStopping ? 

                        <TouchableOpacity activeOpacity={0.7} onPress={startRecordFunc} style={{ width: 76, height: 76, backgroundColor: myColors.mainColor, borderRadius: 38, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}} >
                        <Image source={require("../../assets/image/microphone-2.png")} style={{width: 48, height: 48}} />
                        </TouchableOpacity>

                    :

                        <TouchableOpacity activeOpacity={0.7} onPress={pauseRecordFunc} style={{ width: 76, height: 76, backgroundColor: myColors.mainColor, borderRadius: 38, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}} >
                            <Image source={require("../../assets/image/pause.png")} style={{width: 40, height: 40}} />
                        </TouchableOpacity>
                }

                <TouchableOpacity activeOpacity={0.7} onPress={uploadAudioFunc} >
                    <Image source={require("../../assets/image/okey.png")} style={{width: 56, height: 56}} />
                </TouchableOpacity>

                </>

                :

                <>
                
                <TouchableOpacity activeOpacity={0.7} onPress={uploadDocumentFunc} style={{ width: 48, height: 48, borderWidth: 1, borderRadius: 24, borderColor: myColors.borderColor, justifyContent: 'center', alignItems: 'center'}} >
                    <Image source={require("../../assets/image/document-upload.png")} style={{width: 24, height: 24}} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={startRecordFunc} style={{ width: 76, height: 76, backgroundColor: myColors.mainColor, borderRadius: 38, borderColor: myColors.borderColor, justifyContent: 'center', alignItems: 'center', marginHorizontal: 24}} >
                    <Image source={require("../../assets/image/microphone-2.png")} style={{width: 48, height: 48}} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={uploadDirectDocumentFunc} style={{ width: 48, height: 48, borderWidth: 1, borderRadius: 24, borderColor: myColors.borderColor, justifyContent: 'center', alignItems: 'center'}} >
                    <Image source={require("../../assets/image/direct.png")} style={{width: 24, height: 24}} />
                </TouchableOpacity>

                </>

            }
        </View>
    )
}

MyAudioFooter.propTypes = {
    isRecording : PropTypes.bool,
    isStopping: PropTypes.bool,
    startRecordFunc : PropTypes.func,
    stopRecordFunc : PropTypes.func,
    pauseRecordFunc : PropTypes.func,
    deleteAudioFunc : PropTypes.func,
    uploadAudioFunc : PropTypes.func,
    uploadDocumentFunc : PropTypes.func,
    uploadDirectDocumentFunc : PropTypes.func
};

MyAudioFooter.defaultProps = {
    isRecording : false,
    isStopping : false
}
