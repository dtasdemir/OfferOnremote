import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import FeatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyText} from "../Common/Text/MyText";

export const ForwardBack = (props) => {

    let {leftOnPress, text, containerStyle} = props;

    return (

        <View
            style={{flexDirection: "row", marginTop: hp(1), ...containerStyle}}>

            {/* back button */}
            <TouchableOpacity
                onPress={() => leftOnPress()}
                style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}>

                <FeatherIcon
                    style={{color: "white", fontSize: hp("3.5%")}}
                    name={"arrow-left"}/>

            </TouchableOpacity>

            {/* title text */}
            <MyText
                text={text}
                textStyle={{
                    fontSize: hp(3.5),
                    fontWeight: "600",
                    fontStyle: "normal",
                    textAlign: "center",
                    color: "#ffffff",
                    flex: 6
                }}/>

            {/* dummy view */}
            <View
                style={{flex: 1}}/>


        </View>

    );
};

ForwardBack.propTypes = {
    containerStyle: PropTypes.object,
    leftOnPress: PropTypes.func,
    text: PropTypes.string,
};

ForwardBack.defaultProps = {
    text: ""
};
