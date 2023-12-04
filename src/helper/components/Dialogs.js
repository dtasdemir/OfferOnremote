/**
 *
 * @param title                     --> dialog title
 * @param message                   --> dialog message
 * @param bpt                       --> dialog Button Positive Text
 * @param bnt                       --> dialog Button Negative Text
 * @param twoButton                 --> dialog button number(boolean)
 * @param dialogType                --> dialog type
 * @returns {Promise<unknown>}
 */
import DeviceInformation from '../../device/DeviceInformation';
import {myStrings} from '../../values/Strings/Strings';

export function SuccessDialog(title, message, bpt, bnt = "", twoButton = false) {

    if (!bpt) {
        bpt = myStrings[new DeviceInformation().getLocaleLanguage()].button.ok
    }

    return new Promise(function (resolve, reject) {

        /**
         *  type,
         *  title,
         *  message,
         *  positive button text,
         *  negative button text,
         *  positive button callback,
         *  negative button callback
         */
        if (__dialogContext) {
            __dialogContext.showDialog(
                "success",
                title,
                message,
                bpt,
                bnt,
                twoButton,
                function() {
                    resolve();
                },
                function () {
                    reject();
                }
            );
        }

    });
}

export function WarningDialog(title, message, bpt, bnt = "", twoButton = false) {

    if (!bpt) {
        bpt = myStrings[new DeviceInformation().getLocaleLanguage()].button.ok
    }

    return new Promise(function (resolve, reject) {

        /**
         *  type,
         *  title,
         *  message,
         *  positive button text,
         *  negative button text,
         *  positive button callback,
         *  negative button callback
         */
        if (__dialogContext) {
            __dialogContext.showDialog(
                "warning",
                title,
                message,
                bpt,
                bnt,
                twoButton,
                function() {
                    resolve();
                },
                function () {
                    reject();
                }
            );
        }

    });

}

export function ErrorDialog(title, message, bpt, bnt = "", twoButton = false) {

    if (!bpt) {
        bpt = myStrings[new DeviceInformation().getLocaleLanguage()].button.ok
    }

    return new Promise(function (resolve, reject) {

        /**
         *  type,
         *  title,
         *  message,
         *  positive button text,
         *  negative button text,
         *  positive button callback,
         *  negative button callback
         */
        if (__dialogContext) {
            __dialogContext.showDialog(
                "error",
                title,
                message,
                bpt,
                bnt,
                twoButton,
                function() {
                    resolve();
                },
                function () {
                    reject();
                }
            );
        }

    });

}
