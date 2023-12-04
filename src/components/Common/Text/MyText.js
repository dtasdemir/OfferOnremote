import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {Text, TextPropTypes} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ThemeContext} from "../../../contexts/ThemeContext";

export const MyText = (props) => {
    // to define props values
    let {isTitle, text, textStyle} = props;

    const myColors = useContext(ThemeContext);

    return(
        <Text
            style={{
                fontSize: isTitle ? hp(1.8) : hp(1.7),
                fontWeight: isTitle ? "600" : "400",
                color: isTitle ? myColors.titleTextColor : myColors.textColor,
                ...textStyle
            }}
            {...props}>

            {text}

        </Text>
    )

};

// text props
MyText.propTypes = {
    ...TextPropTypes,
    isTitle: PropTypes.bool,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    textStyle: PropTypes.object,
};

// text default props
MyText.defaultProps = {
    isTitle: false
};
