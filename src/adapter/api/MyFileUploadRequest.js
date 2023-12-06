import DeviceInformation from '../../device/DeviceInformation';
import {isConnected} from '../../helper/functions/ServiceControl';

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

  if (fileUploadControl && _fileUploadStatus.isUploading) {
    console.log("Dosya yükleme işlemi devam ederken");
    return;
  }

  if (fileUploadControl) {
    console.log("Dosya yükleme işlemi başlatıldığında")
  }

  const form = new FormData();

  let deviceInfo = new DeviceInformation();
  let accessData = deviceInfo.getAccessData();

  form.append("accesToken", accessData.accessToken);
  form.append("device", accessData.deviceId);
  form.append("language", accessData.language);
  form.append("token", sessionData?.token);
  form.append("isLogin", sessionData?.isLogin);


  console.log(form);

}

// Burada aslında upload kontrolü yapılıyor
function UpdateFileUploadStatus(status, needControl) {
    if (needControl) {
        _fileUploadStatus.isUploading = status
    }
}