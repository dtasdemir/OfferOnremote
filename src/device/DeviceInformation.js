import React from 'react';
import Device from 'react-native-device-info';
import SyncStorage from 'sync-storage';
import * as RNLocalize from "react-native-localize";
import {stringAlias} from "../values/Strings/Strings";
import {colorAlias} from "../values/Colors/Colors";

export default class DeviceInformation{

    getDeviceId() {
        return Device.getUniqueId();
    }

    getDeviceBrand() {
        return Device.getBrand();
    }

    getDeviceName() {
        return Device.getDeviceName();
    }

    getDeviceModel() {
        return Device.getModel();
    }

    getDeviceVersion() {
        return Device.getSystemVersion();
    }

    getAppVersion() {
        return Device.getBuildNumber();
    }

    isEmulator() {
        return Device.isEmulator();
    }

    isTablet() {
        return Device.isTablet();
    }

    hasNotch() {
        return Device.hasNotch();
    }

    getLocaleLanguage() {
        let language = SyncStorage.get("languageCode");

        if (language) {
            return language;
        }
        else {
            language = RNLocalize.getLocales()[0]["languageCode"];

            if (language === "tr") {
                return "tr"
            }
            else {
                return "en"
            }
        }
    }

    getSelectedTheme() {
        let theme = SyncStorage.get("theme");

        if (theme) {
            return theme;
        }
        else {
            return colorAlias.DEFAULT;
        }
    }

    getAccessData() {
        let deviceId = this.getDeviceId();
        let token = SyncStorage.get('token');
        let language = this.getLocaleLanguage();

        return {
            accessToken: token || "",
            deviceId: deviceId,
            language: language
        };
    }

    getRecordAudio() {
        let recordAudio = SyncStorage.get("recordAudio");

        if (recordAudio === true) {
            return true;
        } else {
            return false;
        }
    }
}
