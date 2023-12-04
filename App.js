import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StatusBar} from 'react-native';
import SyncStorage from "sync-storage";
import {Router} from "./src/pages/Router/Router";
import {deviceRegistration} from "./src/adapter/api/RegisterDevice";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ErrorView} from "./src/components/ErrorView/ErrorView";
import {BallIndicator} from "react-native-indicators";
import CustomContextProvider from './src/contexts/CustomContext';
import {AskNotificationPermission, NotificationSetup} from "./src/helper/functions/Notification";
import {ThemeContext} from "./src/contexts/ThemeContext";
import {LoginContext} from "./src/contexts/LoginContext";

export const App = (props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initMethods();
  }, [])

  const initMethods = async () => {
    try {
      console.disableYellowBox = true;

      // to init local storage data, for retrieving data when entered the app
      const data = await SyncStorage.init();

      console.log("data: ", data);

      setIsReady(true);
    }
    catch (error) {
      console.log('App.js error: ', error);
    }
  }

  if (isReady) {
    return(
        <CustomContextProvider>
          <InitialScreen/>
        </CustomContextProvider>
    )
  }
  return null;
}

const InitialScreen = (props) => {
  const loginContext = useContext(LoginContext);
  const {myColors} = useContext(ThemeContext);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initMethods();
  }, []);

  const initMethods = async () => {
    try {
      // custom firebase notification setup
      NotificationSetup();

      // to register device
      await _registerDevice();

      // to handle push notification permission
      AskNotificationPermission()
          .then(() => {})
          .catch(() =>{});

    } catch (error) {
      console.log('App.js error: ', error);
    }
  }

  const _registerDevice = async  () => {
    setError(false);

    // to register device
    await deviceRegistration()
        .then((isLogin) => {
          if (!isLogin) {
            loginContext.setLogin(false);
          }
          setTimeout(() => {
            setIsReady(true);
            setError(false);
          }, 500);
        })
        .catch((error) => {
          console.log('register error: ', error);
          setError(true);
          setErrorMessage(error["message"]);
        });
  }

  if (!isReady) {
    return (
        <View
            style={{flex: 1}}>

          <StatusBar hidden />

          {
            error

                ?

                <View
                    style={{flex: 1, width: "100%", height: "100%"}}>

                  <ErrorView
                      filled={true}
                      onPress={() => _registerDevice().then(() => {})}
                      errorMessage={errorMessage}/>

                  <View
                      style={{ alignSelf: "center", bottom: hp(10)}}>

                    <Image
                        style={{height: hp("7%"), width: wp("50%")}}
                        resizeMode={"contain"}
                        source={require("./src/assets/logo/rocket.png")}/>

                  </View>

                </View>

                :

                <View
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      backgroundColor: myColors.mainColor,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: hp(10)
                    }}>

                  {/* logo view */}
                  <View
                      style={{flex: 1, justifyContent: "flex-end"}}>

                    <Image
                        style={{height: hp("12%"), width: wp("80%")}}
                        resizeMode={"contain"}
                        source={require("./src/assets/logo/rocket.png")}/>

                  </View>

                  {/* loading view */}
                  <View
                      style={{flex: 1}}>

                    <View
                        style={{width: hp(9), height: hp(9), alignSelf: "center", marginTop: hp(10)}}>

                      <BallIndicator
                          size={hp(5)}
                          color={"white"}/>

                    </View>

                  </View>

                </View>
          }

        </View>
    )
  }
  else {
    return (
        <Router/>
    )
  }
}
