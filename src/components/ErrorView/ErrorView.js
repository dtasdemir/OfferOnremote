import React, {useContext} from "react";
import {View, Text} from "react-native";
import PropTypes from 'prop-types';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyButton} from '../Common/Button/MyButton';
import {StringContext} from "../../contexts/StringContext";
import {MyText} from "../Common/Text/MyText";

export const ErrorView = (props) => {
    const {myStrings} = useContext(StringContext);

    let {errorMessage, onPress, errorTextStyle, filled} = props;

    return (
        <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

            {/* error text */}
            <MyText
                text={errorMessage}
                textStyle={{
                    fontSize: hp(2),
                    fontWeight: "500",
                    textAlign: "center",
                    marginBottom: hp(1),
                    ...errorTextStyle
                }}/>

            {/* retry button */}
            <MyButton
                buttonText={myStrings.button.retry}
                containerStyle={{width: "40%"}}
                onPress={() => {
                    if (typeof onPress() == 'function') {
                        onPress();
                    }
                }}
                type={"danger"}
                filled={filled}/>

        </View>

    )
};

// ErrorView props
ErrorView.propTypes = {
    errorMessage: PropTypes.string,
    onPress: PropTypes.func,
    filled: PropTypes.bool,
    errorTextStyle: PropTypes.object,
};

// ErrorView default props
ErrorView.defaultProps = {
    errorMessage: "",
    filled: false
};
