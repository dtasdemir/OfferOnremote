import React, {useContext} from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {ThemeContext} from "../../contexts/ThemeContext";
import {MyIcon} from "../Common/VectorIcon/MyIcon";
import {MyText} from "../Common/Text/MyText";

export const MyListItemIcon = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {selected, title, subtitle, iconName, iconStyle, style, onPress} = props;

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={{
                height: hp(5),
                marginVertical: hp(1),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                ...style
            }}>

            {
                iconName &&

                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                    <MyIcon
                        iconName={iconName}
                        iconGroup={"Feather"}
                        iconStyle={{
                            fontSize: hp(3),
                            color: myColors.mainColor,
                            marginRight: 20,
                            ...iconStyle
                        }}/>

                </View>
            }

            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: iconName ? 0 : 20
                }}>

                <MyText
                    isTitle={true}
                    text={title}/>

                {
                    subtitle &&

                    <MyText
                        numberOfLines={3}
                        ellipsizeMode={"tail"}
                        text={subtitle}
                        textStyle={{marginTop: 5}}/>
                }

            </View>

            <View
                style={{
                    backgroundColor: null,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10
                }}>

                <MyIcon
                    iconName={selected ? "check" : "chevron-right"}
                    iconGroup={"FontAwesome"}
                    iconStyle={{
                        fontSize: hp(2.8),
                        color: selected ? "green" : myColors.mainColor
                    }}/>

            </View>

        </TouchableOpacity>
    )
}

MyListItemIcon.propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    iconName: PropTypes.string,
    iconStyle: PropTypes.object,
    style: PropTypes.object,
};
