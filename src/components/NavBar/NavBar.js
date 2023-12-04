import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {navbarHeight} from "../../values/Constants/Constants";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {goBack, openDrawer} from '../../RootMethods/RootNavigation';
import PropTypes from 'prop-types';
import {ThemeContext} from "../../contexts/ThemeContext";
import {StringContext} from "../../contexts/StringContext";
import {MyText} from "../Common/Text/MyText";
import {MyIcon} from "../Common/VectorIcon/MyIcon";

export const NavBar = (props) => {
    const {myColors} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    let {title} = props;

    return (
        <View
            style={{
                height: navbarHeight,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row',
                zIndex: 999,
                backgroundColor: myColors.navBarColor
            }}>

            {/* back button */}
            <TouchableOpacity
                onPress={() => goBack()}
                style={{
                    marginLeft: 15,
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5
                }}>

                <MyIcon
                    iconName={"angle-left"}
                    iconGroup={"FontAwesome"}
                    iconStyle={{
                        fontSize: hp(3.5),
                        color: myColors.iconColor
                    }}/>

                <MyText
                    text={myStrings.button.back}
                    textStyle={{
                        color: "white",
                        fontSize: hp("1.8%"),
                        marginLeft: 5,
                        alignSelf: "center",
                        paddingTop: 2
                    }}/>

            </TouchableOpacity>

            <MyText
                isTitle={true}
                text={title}
                textStyle={{
                    flex: 8,
                    color: myColors.iconColor,
                    textAlign: 'center',
                    fontSize: hp(2.2)
                }}/>

            <TouchableOpacity
                onPress={() => openDrawer()}
                style={{
                    marginRight: 15,
                    flex: 1,
                    paddingVertical: 5
                }}>

                <MyIcon
                    iconName={"bars"}
                    iconGroup={"FontAwesome"}
                    iconStyle={{
                        fontSize: hp(3.2),
                        color: myColors.iconColor,
                        textAlign: "right",
                    }}/>

            </TouchableOpacity>

        </View>
    );
};

NavBar.propTypes = {
    title: PropTypes.string,
};

NavBar.defaultProps = {
    navbar: true,
    footer: true,
    title: "",
    showFooter: false,
    statusBar: true,
    error: false,
};
