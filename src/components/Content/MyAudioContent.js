import React, { useContext } from "react";
import { Image, Text, View, ImageBackground} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import PropTypes from 'prop-types';
import { ThemeContext } from "../../contexts/ThemeContext";
import { StringContext } from "../../contexts/StringContext";

export const MyAudioContent = (props) => {

    let { isRecording, isVolume, recordTime } = props

    const {myColors} = useContext(ThemeContext);

    const {myStrings} = useContext(StringContext);

    return (
       <>
       {isRecording ? 
            
            <View style={{flex: 5, justifyContent: 'center', alignItems: 'center', position: 'relative', top: 45}} >

                <Text style={{ bottom: 140, fontSize: 28, fontWeight: '700', color: myColors.titleTextColor, textAlign: 'center'}}>{myStrings.listeningTitle}</Text>

                <Text style={{ bottom: 116, fontSize: 24, fontWeight: '500', color: myColors.textColor, textAlign: 'center'}}>{recordTime.slice(0,5)}</Text>

                {isVolume ? 

                    <>
                        {/** Background Line */}
                        <ImageBackground source={require("../../assets/image/activeSpectrum.png")}  style={{ width: 400, height: 105, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: hp("20.5%") }} resizeMode="contain" />
                    </>
                    
                    : 
                    <>
                        {/** Background Line */}
                        <ImageBackground source={require("../../assets/image/passiveSpectrum.png")}  style={{ width: 390, height: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: hp("26.5%") }} resizeMode="contain" />
                    </>
                    
                }
                

                {/** Shadow Image */}
                <Image source={require("../../assets/image/shadow.png")} style={{width: wp(58.3), height: hp(5.15), position: "absolute", left: 123, top: 320}} resizeMode={"contain"} />

                {/** Microfone Image */}
                <Image source={require("../../assets/image/mic-2.png")} style={{width: wp(72.3), height: hp(37.43), bottom: 50, position: 'relative'}} resizeMode={"contain"} />
            </View>
            
            : 

            <View style={{flex: 5, justifyContent: 'center', alignItems: 'center', position: 'relative', top: 45}}>

                {/**Background Image */}
                <ImageBackground source={require("../../assets/image/background1.png")}  style={{ width: wp(167), height: hp(86.4), justifyContent: 'center', alignItems: 'center', position: 'absolute' }} resizeMode="contain" />
                
                {/** Title */}
                <Text style={{ bottom: 140, fontSize: 28, fontWeight: '700', color: myColors.titleTextColor, textAlign: 'center', position: 'relative'}}>{myStrings.offerTitle}</Text>
                
                {/** Shadow Image */}
                <Image source={require("../../assets/image/shadow.png")} style={{width: wp(58.3), height: hp(5.15), position: "absolute", left: 123, top: 320}} resizeMode={"contain"} />

                {/** Microfone Image */}
                <Image source={require("../../assets/image/mic-1.png")} style={{width: wp(72.3), height: hp(37.43), bottom: 50, position: 'relative'}} resizeMode={"contain"} />
            </View>
        }
       </>
    )
}

MyAudioContent.propTypes = {
    isRecording : PropTypes.bool,
    isVolume: PropTypes.bool,
    recordTime: PropTypes.string
};

MyAudioContent.defaultProps = {
    isRecording : false,
    isVolume : false,
    recordTime: "00:00"
}
