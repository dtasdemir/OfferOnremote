import React, {useContext} from 'react';
import {View} from "react-native";
import {BallIndicator} from "react-native-indicators";
import {deviceWidth} from "../../values/Constants/Constants";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {LoadingContext} from "../../contexts/LoadingContext";
import {ThemeContext} from "../../contexts/ThemeContext";
import {MyText} from "../Common/Text/MyText";

export const LoadingView = (props) => {

    const {myColors} = useContext(ThemeContext);
    const {isLoading, loadingText} = useContext(LoadingContext);

    if(isLoading) {
        return(
            <View
                style={{
                    zIndex: 9999,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    ...props.style
                }}>

                <View
                    style={{
                        backgroundColor: "black",
                        opacity: 0.55,
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}/>

                <View
                    style={{width: hp(9), height: hp(9)}}>

                    <BallIndicator
                        size={hp(7)}
                        color={myColors.loadingIndicatorColor}/>

                </View>

                <MyText
                    text={loadingText}
                    textStyle={{
                        height: 50,
                        width: deviceWidth,
                        fontSize: hp(2.2),
                        textAlign: "center",
                        marginTop: hp(3),
                        color: "white",
                        fontWeight: "bold"
                    }}/>

            </View>
        )
    }
    else {
        return null;
    }
}

LoadingView.props = {

};

LoadingView.defaultProps = {
    loadingText: ""
}
