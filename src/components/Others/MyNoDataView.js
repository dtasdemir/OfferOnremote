/**
 * Created by Orhan SARIBAL on 26.03.2022
 */

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyButton} from "../Common/Button/MyButton";
import {ThemeContext} from "../../contexts/ThemeContext";
import {MyIcon} from "../Common/VectorIcon/MyIcon";
import {MyText} from "../Common/Text/MyText";

export const MyNoDataView = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {text, buttonText, button, buttonOnPress} = props;

    return(
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: hp(10)
            }}>

            <View
                style={{
                    width: hp(5),
                    height: hp(5),
                    backgroundColor: myColors.mainColor,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center"
                }}>

                <View
                    style={{
                        width: hp(4),
                        height: hp(4),
                        backgroundColor: "white",
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <MyIcon
                        iconName={"exclamation"}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            fontSize: hp(3),
                            color: myColors.mainColor
                        }}/>

                </View>

            </View>

            <MyText
                text={text}
                textStyle={{
                    marginTop: hp(3),
                    textAlign: "center",
                    fontSize: hp(2),
                    fontWeight: "bold",
                    color: "#999999"
                }}/>

            {
                button &&

                <MyButton
                    buttonText={buttonText}
                    onPress={() => {
                        if (typeof buttonOnPress === "function") {
                            buttonOnPress();
                        }
                    }}
                    containerStyle={{
                        width: "70%",
                        marginTop: hp(5)
                    }}/>
            }

        </View>
    )
}

MyNoDataView.propTypes = {
    text: PropTypes.string,
    button: PropTypes.bool,
    buttonOnPress: PropTypes.func,
    buttonText: PropTypes.string
}

MyNoDataView.defaultProps = {
    text: "",
    button: false
}
