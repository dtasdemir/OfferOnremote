import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {navigate} from "../../RootMethods/RootNavigation";
import {footerHeight, hasNotch, platform} from "../../values/Constants/Constants";
import {ThemeContext} from "../../contexts/ThemeContext";
import {StringContext} from "../../contexts/StringContext";
import {MyIcon} from "../Common/VectorIcon/MyIcon";

export const Footer = (props) => {
    const {myColors} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    let {activeIndex} = props;

    const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      // to hide footer when keyboard opened
      setShowFooter(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // to show footer when keyboard closed, if footer true that comes from parent
      setShowFooter(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

    const _renderItem = (isActive, text, icon, navigateTo) => {
        return (
            <TouchableOpacity
                onPress={() => {navigate(navigateTo)}}
                style={{
                    flex: 1,
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                }}>

                <MyIcon
                    iconName={icon}
                    iconGroup={"Feather"}
                    iconStyle={{
                        fontSize: isActive ? hp(3.5) : hp(3),
                        color: "white",
                        shadowColor: myColors.textColor,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        borderRadius: 10,
                        backgroundColor: "transparent",
                        textShadowRadius: 4,
                        textShadowOffset: { width: 2, height: 2 }
                    }}/>

            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                height: footerHeight,
                width: '100%',
                flexDirection: "row",
                backgroundColor: myColors.footerColor,
                shadowColor: "rgba(0, 0, 0, 0.11)",
                shadowOffset: {
                    width: 0,
                    height: -3
                },
                shadowRadius: 4,
                shadowOpacity: 1,
                borderTopWidth: 0.5,
                borderTopColor: "#a1a1a1",
                paddingBottom: (platform === "ios" && hasNotch) ? hp(1) : 0,
                display: showFooter ? "flex" : "none"
            }}>

            {/* home button*/}
            {_renderItem(activeIndex === 0, myStrings.home, "home", "HomeScreen")}

            {/* profile button*/}
            {_renderItem(activeIndex === 1, myStrings.profile, "user", "ProfileScreen")}

            {/* notifications button*/}
            {_renderItem(activeIndex === 2, myStrings.notifications, "bell", "NotificationsScreen")}

            {/* settings button*/}
            {_renderItem(activeIndex === 3, myStrings.settings, "settings", "SettingsScreen")}


        </View>
    );
};

// Footer props
Footer.propTypes = {
    activeIndex: PropTypes.oneOf([0, 1, 2, 3])
};

// Footer default props
Footer.defaultProps = {

};
