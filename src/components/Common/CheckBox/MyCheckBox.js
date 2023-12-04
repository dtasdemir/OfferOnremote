import React, {useContext} from "react";
import {TouchableOpacity, Text} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {ThemeContext} from "../../../contexts/ThemeContext";
import {MyIcon} from "../VectorIcon/MyIcon";
import {MyText} from "../Text/MyText";

export const MyCheckBox = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {checked, checkedColor, containerStyle, boxSize, onPress, text, textStyle} = props;

    return(
        <TouchableOpacity
            onPress={() => {
                if (typeof onPress == "function") {
                    onPress();
                }
            }}
            style={{
                flexDirection: "row",
                alignItems: "center",
                ...containerStyle
            }}>

            <MyIcon
                iconName={checked ? "check-square-o" : "square-o"}
                iconGroup={"FontAwesome"}
                iconStyle={{
                    color: checked ? (checkedColor || myColors.mainColor) : "grey",
                    fontSize: boxSize
                }}/>

            {
                text &&

                <MyText
                    text={text}
                    textStyle={{
                        marginLeft: 10,
                        ...textStyle
                    }}/>
            }

        </TouchableOpacity>
    )
};

MyCheckBox.propTypes = {
    onPress: PropTypes.func,
    checkedColor: PropTypes.string,
    containerStyle: PropTypes.object,
    checked: PropTypes.bool,
    boxSize: PropTypes.number,
    text: PropTypes.string,
    textStyle: PropTypes.object
};

MyCheckBox.defaultProps = {
    checked: false,
    boxSize: hp(2.5)
};
