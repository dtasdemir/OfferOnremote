import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {navigate} from "../../RootMethods/RootNavigation";
import {AppState} from "react-native";
import {myStrings} from '../../values/Strings/Strings';
import {platform} from '../../values/Constants/Constants';
import DeviceInformation from "../../device/DeviceInformation";

export async function AskNotificationPermission() {
    const authStatus = await messaging().requestPermission();

    console.log("auth status: ", authStatus);

    const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export function NotificationSetup() {

    /**
     *  notification comes here
     */

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (tokenData) {
            console.log("notification token data:", tokenData);
        },
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            let appState = AppState.currentState;

            console.log("onNotification: ", notification);

            if (platform === "ios") {
                if (appState === "active" && !notification["userInteraction"] && notification["foreground"] && notification["data"]["gcm.message_id"]) {
                    let language = new DeviceInformation().getLocaleLanguage();

                    // to show local push notification for ios foreground
                    PushNotification.localNotification({
                        /* Android Only Properties */
                        channelId: myStrings.language.appName, // (required) channelId, if the channel doesn't exist, notification will not trigger.
                        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
                        /* iOS and Android properties */
                        title: notification["title"],
                        message: notification["message"],
                        userInfo: {
                            hasNavigate: notification["data"]["hasNavigate"],
                            roomId: notification["data"]["roomId"]
                        },
                        soundName: "default",
                        playSound: true
                    });
                }
                else if ((appState === "active" || appState === "inactive") && notification["userInteraction"] && notification["foreground"]) {
                    HandleNotification(notification);
                }
            }

            if (appState === "background" && notification["userInteraction"] && (notification["visibility"] === "private")) {
                HandleNotification(notification);
            }

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("onAction NOTIFICATION:", notification);
        },
        onError: function (error) {
            console.log("notification error: ", error)
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });

}

export function HandleNotification(remoteMessage) {
    console.log("HandleNotification -> remote message: ", remoteMessage);

    // try {
    //     // to cancel delivered notification from notification stack
    //     CancelAllDeliveredNotifications();
    // }
    // catch (e) {
    //     console.log("cancel notification error: ", e)
    // }

    navigate("SettingsScreen")
}

function CancelAllDeliveredNotifications() {
    PushNotificationIOS.removeAllDeliveredNotifications();
    PushNotification.cancelAllLocalNotifications();
}

function RemoveDeliveredNotification(notificationId) {
    PushNotification.cancelLocalNotifications({id: "" + notificationId});
}
