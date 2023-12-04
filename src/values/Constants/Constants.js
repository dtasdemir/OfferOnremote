import {Dimensions, Platform} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInformation from "../../device/DeviceInformation";

const device = new DeviceInformation();
const deviceModel = device.getDeviceModel();

export const platform = Platform.OS;
export const isTablet = device.isTablet();
export const hasNotch = device.hasNotch();
export const footerHeight = hasNotch ? hp(8.5) : hp(7.5)
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const statusBarHeight = (platform === "ios" && deviceModel.includes("14")) ? 55 : getStatusBarHeight();
export const navbarHeight = platform === "ios" ? hp("5%") : hp("6%");
export const pageHeight = deviceHeight - (navbarHeight + statusBarHeight + footerHeight);
