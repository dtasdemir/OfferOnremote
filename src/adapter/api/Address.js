import {MyRequest} from "./MyRequest";
import DeviceInformation from "../../device/DeviceInformation";
import {myStrings} from "../../values/Strings/Strings";
import {ShowToast} from "../../helper/components/Toasts";

/**
 * Created by Orhan SARIBAL on 14-12-2021.
 */

export function GetAddressList() {
    return new Promise(((resolve, reject) => {
        MyRequest("address list request", "", {}, false)
            .then((response) => {
                let addressList = response["data"]["addressList"];
                resolve(addressList);
            })
    }))
}

export function DeleteAddress(addressId) {
    return new Promise(((resolve, reject) => {
        MyRequest("Delete address request", "", {addressId: addressId})
            .then((response) => {
                let lang = new DeviceInformation().getLocaleLanguage();
                ShowToast.success(myStrings[lang].infoMessages.addressRemoved);
                resolve(response["data"]["addressList"]);
            })
    }))
}

export function AddEditAddress(addressData, editAddress) {
    return new Promise(((resolve, reject) => {
        let requestName = editAddress ? "Edit address request" : "Add address request";
        let requestUrl = editAddress ? "" : ""

        MyRequest(requestName, requestUrl, addressData, true,"")
            .then((response) => {
                let lang = new DeviceInformation().getLocaleLanguage();
                let successMessage = editAddress ? myStrings[lang].infoMessages.addressUpdated : myStrings[lang].infoMessages.addressAdded;
                ShowToast.success(successMessage);

                resolve(response?.["data"]?.["addressList"] || []);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }))
}
