/**
 * Created by Orhan SARIBAL on 18-11-2020.
 */


import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import { platform } from '../../values/Constants/Constants';
import { ShowToast } from '../components/Toasts';

const AndroidPermissionArray = [
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
]

// Buradaki mesajları String Cotnext'ten alamadım sonra geri döneceğim :(
export function RequestAllPermission(){

    return new Promise(function (resolve, reject) {
        for( const permission of AndroidPermissionArray) {
            try {
                check( platform === "android"  && permission)
                    .then((res) => {
                        if (res === RESULTS.GRANTED) {
                            resolve(RESULTS.GRANTED)
                        } else {
                            request(permission)
                                .then((response) => {
                                    if(response === RESULTS.BLOCKED || response === RESULTS.DENIED) {
                                        ShowToast.error("YAPAMADIM ANEY")
                                        reject(response);
                                    } else {
                                        resolve(response);
                                    }
                                })
                                .catch((error) => {
                                    ShowToast.error("HİÇBİRİ OLMADI");
                                    console.log(error);
                                    reject(RESULTS.DENIED);
                                })
                        }
                    })
                    .catch((res) => {
                        if (res === RESULTS.BLOCKED) {
                            ShowToast("HELLO OLAMADI");
                        }
                        reject(res);
                    })
            } catch (error) {
                console.log("error", error);
                reject(error);
            }
        } 

    }) 
}


// function GetPermissionStatus(result, permissionName) {
//     return new Promise((resolve, reject) => {
//         switch (result) {
//             case RESULTS.UNAVAILABLE:
//                 console.log(permissionName + ' is not available (on this device / in this context)');
//                 reject(RESULTS.UNAVAILABLE);
//                 break;
//             case RESULTS.DENIED:
//                 console.log(permissionName + ' permission has not been requested / is denied but requestable');
//                 resolve(RESULTS.DENIED);
//                 break;
//             case RESULTS.GRANTED:
//                 console.log(permissionName + ' permission is granted');
//                 resolve(RESULTS.GRANTED);
//                 break;
//             case RESULTS.BLOCKED:
//                 console.log(permissionName + ' permission is denied and not requestable anymore');
//                 reject(RESULTS.BLOCKED);
//                 break;
//         }
//     })
// }



// export function RequestMicrophonePermission() {
//     return new Promise(function (resolve, reject) {
//         check(platform === "android" ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE)
//             .then((result) => {
//                 GetPermissionStatus(result, "Microphone")
//                     .then((res) => {
//                         if (res === RESULTS.GRANTED) {
//                             resolve(RESULTS.GRANTED)
//                         }
//                         else {
//                             request(platform === "android" ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE)
//                                 .then((response) => {
//                                     if (response === RESULTS.BLOCKED || response === RESULTS.DENIED) {
//                                         ShowPermissionDialog(__stringContext.myStrings.permission.microphoneTitle);
//                                         reject(response);
//                                     }
//                                     else {
//                                         resolve(response);
//                                     }
//                                 })
//                                 .catch((error) => {
//                                     console.log("microphone error: ", error);
//                                     reject(RESULTS.DENIED);
//                                 });
//                         }
//                     })
//                     .catch((res) => {
//                         if (res === RESULTS.BLOCKED) {
//                             ShowPermissionDialog(__stringContext.myStrings.permission.microphoneTitle);
//                         }
//                         reject(res);
//                     })
//             })
//     })
// }

//
// export function RequestCameraPermission() {
//     return new Promise(function (resolve, reject) {
//         check(platform === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA)
//             .then((result) => {
//                 GetPermissionStatus(result, "Camera")
//                     .then((res) => {
//                         if (res === RESULTS.GRANTED) {
//                             resolve(RESULTS.GRANTED)
//                         }
//                         else {
//                             request(platform === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA)
//                                 .then((response) => {
//                                     if (response === RESULTS.BLOCKED || response === RESULTS.DENIED) {
//                                         ShowPermissionDialog(__stringContext.myStrings.permission.cameraTitle);
//                                         reject(response);
//                                     }
//                                     else {
//                                         resolve(response);
//                                     }
//                                 })
//                                 .catch((error) => {
//                                     console.log("camera permission error: ", error);
//                                     reject(RESULTS.DENIED);
//                                 });
//                         }
//                     })
//                     .catch((res) => {
//                         if (res === RESULTS.BLOCKED) {
//                             ShowPermissionDialog(__stringContext.myStrings.permission.cameraTitle);
//                         }
//                         reject(res);
//                     })
//             })
//     })
// }
//

//
// // uses gps, cellular and wi-fi
// export function RequestAccessFineLocationPermission(showBlockedDialog = true) {
//     return new Promise(function (resolve, reject) {
//         check(platform === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//             .then((result) => {
//                 GetPermissionStatus(result, "Location")
//                     .then((res) => {
//                         if (res === RESULTS.GRANTED) {
//                             resolve(RESULTS.GRANTED)
//                         }
//                         else {
//                             request(platform === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//                                 .then((response) => {
//                                     if (response === RESULTS.BLOCKED || response === RESULTS.DENIED) {
//                                         if (showBlockedDialog) {
//                                             ShowPermissionDialog(__stringContext.myStrings.permission.locationTitle);
//                                         }
//                                         reject(response);
//                                     }
//                                     else {
//                                         resolve(response);
//                                     }
//                                 })
//                                 .catch((error) => {
//                                     console.log("location error: ", error);
//                                     reject(RESULTS.DENIED);
//                                 });
//                         }
//                     })
//                     .catch((res) => {
//                         if (res === RESULTS.BLOCKED) {
//                             if (showBlockedDialog) {
//                                 ShowPermissionDialog(__stringContext.myStrings.permission.locationTitle);
//                             }
//                         }
//                         reject(res);
//                     })
//             })
//     })
// }
//
// export function RequestBluetoothScanPermission() {
//     return new Promise(async (resolve, reject) => {
//         if (platform === "ios") {
//             resolve();
//         }
//         else {
//             let isBleScanPermissionGranted = await IsBluetoothScanPermissionGranted();
//             let isBleConnectPermissionGranted = await IsBluetoothConnectPermissionGranted();
//             if (isBleScanPermissionGranted && isBleConnectPermissionGranted) {
//                 console.log("BluetoothScan & BluetoothConnect permission already granted!");
//                 resolve();
//             }
//             else {
//                 requestMultiple([
//                     PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
//                     PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
//                 ]).then((statuses) => {
//                     let scanResult = statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN];
//                     let connectResult = statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT];
//
//                     console.log("BLUETOOTH_SCAN", scanResult);
//                     console.log("BLUETOOTH_CONNECT", connectResult);
//
//                     if ((scanResult === RESULTS.GRANTED) && (connectResult === RESULTS.GRANTED)) {
//                         resolve();
//                     }
//                     else if (scanResult !== RESULTS.GRANTED) {
//                         reject(__stringContext.myStrings.permission.bleScan);
//                     }
//                     else if (connectResult !== RESULTS.GRANTED) {
//                         reject(__stringContext.myStrings.permission.bleConnect);
//                     }
//                 });
//             }
//         }
//     })
// }
//
// export async function IsBluetoothScanPermissionGranted() {
//     const status = check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
//     return status === RESULTS.GRANTED;
// }
//
// export async function IsBluetoothConnectPermissionGranted() {
//     const status = check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
//     return status === RESULTS.GRANTED;
// }
//
// function ShowPermissionDialog(title) {
//     WarningDialog(title, __stringContext.myStrings.permission.permissionBlockedMessage, __stringContext.myStrings.alertDialogs.goToSettings, __stringContext.myStrings.button.ok, true)
//         .then(() => Linking.openSettings())
// }
//

