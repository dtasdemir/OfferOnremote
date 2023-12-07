import DeviceInformation from '../../device/DeviceInformation';
import {isConnected} from '../../helper/functions/ServiceControl';
import RNFS from 'react-native-fs'
import RequestAPI from './RequestApi';
import { platform } from '../../values/Constants/Constants';
import { ShowToast } from '../../helper/components/Toasts';
import { useContext } from 'react';
import { StringContext } from '../../contexts/StringContext';

export let _fileUploadStatus = {isUploading: false};


export function MyFileUploadRequest(
  requestName,
  url,
  file,
  sessionData = {},
  showLoading = true,
  loadingText = '',
  onProgressCallBack = null,
  fileUploadControl = true,
) {

  console.log(requestName, "rNAME");
  console.log(url, "url");
  console.log(file, "file")

  console.log(file?.uri, file?.type, file?.title);


  if (fileUploadControl && _fileUploadStatus.isUploading) {
    ShowToast.warning("Dosya yükleme işlemi devam ediyor");
    return;
  }

  if (fileUploadControl) {
    UpdateFileUploadStatus(true, fileUploadControl)
  }

  const form = new FormData();

  let deviceInfo = new DeviceInformation();
  let accessData = deviceInfo.getAccessData();

  form.append("accesToken", accessData.accessToken);
  form.append("device", accessData.deviceId);
  form.append("language", accessData.language);
  form.append("token", sessionData?.token);
  form.append("isLogin", sessionData?.isLogin);

  form.append(requestName, {
    uri: url,
    type: 'test/wav', // file'den gelen type olacak
    name: 'test.wav', // file'den gelen name olacak 
  });

  return new Promise((resolve, reject) => {
    let R = new RequestAPI();

    let abortXhr = null;

    R.ajax({
      type: "POST",
      url: url,
      data: form,
      headers: {
        "Content-Type": platform === "android" ? 'multipart/form-data' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      onProgress: function (e) {

        console.log("onProgress:", e);

        let abortRequest = null;

      },
      success: function (responseJson) {

        console.log("succes:", responseJson);
      },
      error: function (errorCode, error, xhr) {
        
        console.log("error " + "\nerrorCode:" + errorCode + "\nerror:" + error + "\ xhr:" `${xhr}`);
        
        
        UpdateFileUploadStatus(false, fileUploadControl);
      },
      complete: function (xhr) {

        console.log("complete" + "\nxhr:" + xhr)

        UpdateFileUploadStatus(false, fileUploadControl);

        if(showLoading) {
          console.log(showLoading);
        }

      }
    })
      .then((xhr) => {
        console.log("then xhr :" `${xhr}`)
        abortXhr = xhr
      })
  })

}

// Burada aslında upload kontrolü yapılıyor
function UpdateFileUploadStatus(status, needControl) {
  console.log("UPDATE FİLE STATUS")
  console.log("status", status);
  console.log("needControl:",needControl);
    if (needControl) {
        _fileUploadStatus.isUploading = status
    }
}