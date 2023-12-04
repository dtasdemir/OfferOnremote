import React, {useContext} from "react";
import {Text, View} from 'react-native';
import {MyButton} from '../../components/Common/Button/MyButton';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyContainer} from "../../components/Container/Container";
import {LoginContext} from "../../contexts/LoginContext";
import {ThemeContext} from "../../contexts/ThemeContext";

export const NotLoginHomeScreen = (props) => {
    const loginContext = useContext(LoginContext);
    const {myColors} = useContext(ThemeContext);

    // sample login process for changing navigation container
    function _handleLogin() {
        // to let know the navigator user has login
        loginContext.setLogin(true);
    }

    return (
        <MyContainer
            footer={false}
            navbar={false}
            statusBar={false}>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                <Text
                    style={{
                        fontSize: hp("3%"),
                        fontWeight: "bold",
                        color: myColors.mainColor,
                        marginBottom: hp(5)
                    }}>

                    Base Project 9.0

                </Text>

                <Text
                    style={{
                        marginTop: 30,
                        fontSize: hp("2.5%"),
                        fontWeight: "bold",
                        color: myColors.mainColor
                    }}>

                  {"React Native Version --> 0.71.7"}

                </Text>

            </View>

            <MyButton
                type={"success"}
                onPress={() => _handleLogin()}
                buttonText={"Login"}/>

        </MyContainer>
    );
}
