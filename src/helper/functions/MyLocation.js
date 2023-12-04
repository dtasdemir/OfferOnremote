// import {RequestAccessFineLocationPermission} from "./Permission";
// import {User} from "../user/User";
// import Geolocation from 'react-native-geolocation-service';
// import {isGpsOn} from "./ServiceControl";
// import {platform} from "../../values/Constants/Constants";
// import {WarningDialog} from "../components/Dialogs";
// import {Linking} from "react-native";

export function getLocation(showLoading = true) {
    // return new Promise(function (resolve, reject) {
    //
    //     let myStrings = __stringContext.myStrings;
    //
    //     isGpsOn()
    //         .then(() => {
    //             RequestLocationPermission(showLoading, myStrings)
    //                 .then((response) => resolve(response))
    //                 .catch((error) => reject(error))
    //         })
    //         .catch(() => {
    //             if (platform === "ios") {
    //                 let  message = myStrings.errorMessages.gps;
    //
    //                 let errorData = {
    //                     message: message
    //                 };
    //
    //                 reject(errorData);
    //             }
    //             else {
    //                 RequestLocationPermission(showLoading, myStrings, false)
    //                     .then((response) => resolve(response))
    //                     .catch((error) => reject(error))
    //             }
    //         })
    // })
}

// function RequestLocationPermission(showLoading, myStrings, showSettingsDialog = true) {
//     return new Promise((resolve, reject) => {
//         RequestAccessFineLocationPermission()
//             .then(() => {
//
//                 if (showLoading) {
//                     // to show loading indicator
//                     __loadingContext.showLoading(myStrings.loadingMessages.getLocation);
//                 }
//
//                 Geolocation.getCurrentPosition(
//                     (position) => {
//
//                         let latitude = parseFloat(position.coords.latitude);
//                         let longitude = parseFloat(position.coords.longitude);
//                         let altitude = parseFloat(position.coords.altitude);
//
//                         console.log('location position: ', position);
//
//                         let region = {
//                             altitude: altitude,
//                             latitude: latitude,
//                             longitude: longitude,
//                             latitudeDelta: 0.0522,
//                             longitudeDelta: 0.0321,
//                         };
//
//                         let data = {
//                             latitude: latitude,
//                             longitude: longitude,
//                             altitude: altitude
//                         };
//
//                         let obj = {
//                             location: data,
//                             region: region,
//                         };
//
//                         let location = {
//                             altitude: altitude,
//                             latitude: latitude,
//                             longitude: longitude,
//                         };
//
//                         // to store user location for navigate to shop -> for creating a road between user and shop inside maps
//                         new User().setLocation(location);
//
//                         resolve(obj);
//
//                     },
//                     (error) => {
//                         console.log('position error!!!', error);
//
//                         let errorData = {
//                             error: error,
//                             message: myStrings.errorMessages.gps
//                         };
//
//                         if (showLoading) {
//                             // to hide loading indicator
//                             __loadingContext.hideLoading();
//                         }
//
//                         reject(errorData);
//                     },
//                     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
//                 );
//
//             })
//             .catch((error) => {
//                 console.log("error: ", error);
//
//                 let message = myStrings.errorMessages.gpsPermission;
//
//                 let errorData = {
//                     error: error,
//                     message: message
//                 };
//
//                 // gps warning dialog
//                 if(showSettingsDialog) {
//                     WarningDialog(myStrings.appName, message, myStrings.settings, myStrings.button.cancel, true)
//                         .then(() => {
//                             Linking.openURL('app-settings:');
//                             reject(false)
//                         })
//                         .catch(() => reject(false))
//                 }
//
//                 reject(errorData);
//             })
//     })
// }
