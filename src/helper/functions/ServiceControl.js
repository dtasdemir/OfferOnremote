import NetInfo from "@react-native-community/netinfo";
import { DialogType, ShowDialog } from "../components/PopupDialogs";

export function isConnected() {
    return new Promise(function (resolve, reject) {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);

            if (state.isConnected) {
                resolve();
            }
            else {
                reject();

                ShowDialog({
                    type: DialogType.error,
                    title: __stringContext.myStrings.alertDialogs.error,
                    message: __stringContext.myStrings.alertDialogs.connectionError
                })
            }
        });
    })
}
