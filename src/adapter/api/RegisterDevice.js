import React from 'react';
import Device from '../../device/DeviceInformation';
import SyncStorage from 'sync-storage';
// import {registerDevice} from "../../values/Strings/URL";
import {MyRequest} from "./MyRequest";
// import messaging from '@react-native-firebase/messaging';
import {platform} from "../../values/Constants/Constants";

export function deviceRegistration() {

    // Get the device firebase token
    return new Promise(((resolve, reject) => {

        resolve();

        // messaging().getToken()
        //     .then(fcmToken => {
        //
        //         console.log("fcm token: ", fcmToken);
        //
        //         resolve();
        //
        //         // let device = new Device();
        //         // let simulator = device.isEmulator();
        //         //
        //         // let brand = device.getDeviceBrand();
        //         // let model = device.getDeviceModel();
        //         // let version = device.getDeviceVersion();
        //         // let pushToken = simulator ? 'SimulatorToken' : fcmToken;
        //         // let appVersion = device.getAppVersion();
        //         // let locale = device.getLocaleLanguage();
        //
        //         // let deviceData = {
        //         //     brand: brand,
        //         //     model: model,
        //         //     osVersion: version,
        //         //     osType: platform,
        //         //     appVersion: appVersion,
        //         //     pushToken: pushToken,
        //         //     allowPush: 1,
        //         //     language: locale,
        //         //     isDebug: __DEV__,
        //         // };
        //         //
        //         // myRequest("Register", registerDevice, deviceData, false)
        //         //     .then((response) => {
        //         //         let isLogin = response?.isLogin;
        //         //         let accessToken = response["data"]["device"]["accessToken"];
        //         //         SyncStorage.set('token', accessToken);
        //         //         resolve(isLogin);
        //         //     })
        //         //     .catch((error) => {
        //         //         reject(error);
        //         //     });
        //
        //     })
        //     .catch((error) => {
        //         reject(error)
        //     })

    }))


    // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //     getServerToken(token).then(() => {});
    // });
}
