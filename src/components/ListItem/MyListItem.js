import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {isTablet} from '../../values/Constants/Constants';
import {ThemeContext} from "../../contexts/ThemeContext";
import {MyIcon} from "../Common/VectorIcon/MyIcon";

export const MyListItem = (props) => {
    const {myColors} = useContext(ThemeContext);

    let {imagePath, imageUrl, title, subtitle, selected, onPress, style, textStyle} = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                height: hp("12%"),
                flexDirection: "row",
                ...style
            }]}>

            {
                (imageUrl || imagePath) &&

                <View
                    style={{flex: 2, justifyContent: "center", alignItems: isTablet ? "center" : "flex-start"}}>

                    {
                        imagePath &&
                        <Image
                            style={{width: hp("8%"), height: hp("10%")}}
                            resizeMode={"contain"}
                            source={imagePath}/>
                    }

                    {
                        imageUrl &&
                        <Image
                            style={{width: hp("8%"), height: hp("10%")}}
                            resizeMode={"contain"}
                            source={{uri: imageUrl}}/>
                    }

                </View>
            }

            <View
                style={{
                    flex: 6,
                    marginLeft: (imageUrl || imagePath) ? 0 : 30,
                    backgroundColor: null,
                    flexDirection: "column",
                    justifyContent: "center"
                }}>

                {/* title text */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontWeight: "bold",
                        fontSize: hp("2%"),
                        color: myColors.titleTextColor,
                        ...textStyle
                    }}>

                    {title}

                </Text>

                {
                    subtitle &&

                    // subtitle / description
                    <Text
                        numberOfLines={3}
                        ellipsizeMode={"tail"}
                        style={{fontSize: hp("1.8%"), color: myColors.textColor}}>

                        {subtitle}

                    </Text>

                }

            </View>

            <View
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                <MyIcon
                    iconName={selected ? "check" : "chevron-right"}
                    iconGroup={"FontAwesome"}
                    iconStyle={{
                        fontSize: hp(3),
                        color: selected ? "green" : "#e0e0e0"
                    }}/>

            </View>

        </TouchableOpacity>
    )
};

MyListItem.propTypes = {
    selected: PropTypes.bool,
    imagePath: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
};

MyListItem.defaultProps = {
    selected: false,
};
