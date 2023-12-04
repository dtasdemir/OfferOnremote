import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-date-picker";
import { MyText } from "../Text/MyText";
import moment from "moment";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { StringContext } from "../../../contexts/StringContext";
import DeviceInformation from "../../../device/DeviceInformation";
import { platform } from "../../../values/Constants/Constants";

export const MyDatePicker = (props) => {
  const { myColors } = useContext(ThemeContext);
  const { myStrings } = useContext(StringContext);

  const language = new DeviceInformation().getLocaleLanguage();

  let {
    leftIcon, textInputStyle, rightIcon, iconColor, containerStyle,
    selectedDate, value, type, mode,
  } = props;

  const [date, setDate] = useState(new Date());
  const [mValue, setMValue] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  useEffect(() => {
    getDateFromString();
  }, [value]);

  function getDateFromString() {
    let format = getFormat();

    let dateObj = new Date();
    switch (mode) {
      case "date":
        dateObj = new Date(Date.parse(value));
        break;
      case "datetime":
        break;
      case "time":
        let hm = new Date("01/01/1970" + " " + value);
        dateObj = hm;
        break;
    }

    setMValue(value || moment().format(format));
    setDate(dateObj);
  }

  function getFormat() {
    let format = "";
    switch (mode) {
      case "date":
        format = "DD.MM.YYYY";
        break;
      case "datetime":
        format = "DD.MM.YYYY HH:mm";
        break;
      case "time":
        format = "HH:mm";
        break;
    }
    return format;
  }

  return (
    <TouchableOpacity
      onPress={() => setOpenPicker(true)}
      style={{
        borderRadius: 5,
        alignSelf: "center",
        backgroundColor: "transparent",
        orderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: myColors.mainColor,
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        height: platform === "ios" ? hp(4.5) : hp(5.5),
        alignItems: "center",
        borderStyle: "solid",
        borderColor: myColors.mainColor,
        paddingHorizontal: type === "small" ? 10 : 0,
        ...containerStyle,
      }}>

      {
        leftIcon &&

        <View
          style={{
            flex: 3,
            alignSelf: "center",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}>

          <FAIcon
            name={leftIcon}
            style={{
              textAlign: "center",
              fontSize: hp(2.5),
              color: iconColor || myColors.mainColor,
            }}/>

        </View>
      }

      {/* date text */}
      <MyText
        text={mValue}
        style={{
          flex: rightIcon ? 14 : 17,
          paddingHorizontal: 10,
          fontSize: hp(1.9),
          fontWeight: "500",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "left",
          color: myColors.titleTextColor,
          ...textInputStyle,
        }} />

      {/* date picker modal */}
      <DatePicker
        title={null}
        modal={true}
        locale={language}
        open={openPicker}
        date={new Date()}
        mode={mode}
        confirmText={myStrings.button.ok}
        cancelText={myStrings.button.cancel}
        androidVariant={"nativeAndroid"}
        onConfirm={(date) => {
          // format selected date that is an object
          let mSelectedData = moment(date).format(getFormat());
          // store selected date as formatted
          setMValue(mSelectedData);
          // to close picker modal
          setOpenPicker(false);
          // store selected date object
          setDate(date);
          // to send selected date to the parent
          selectedDate(mSelectedData);
        }}
        onCancel={() => setOpenPicker(false)} />

      {
        rightIcon &&

        <View
          style={{
            flex: 3,
            alignSelf: "center",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>

          <FAIcon
            name={rightIcon}
            style={{
              textAlign: "center",
              fontSize: hp(2.5),
              color: iconColor || myColors.mainColor,
            }} />

        </View>
      }

      {/* dummy view*/}
      {
        !rightIcon &&

        <View
          style={{ flex: 3 }} />
      }

    </TouchableOpacity>

  );

};

MyDatePicker.propTypes = {
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  iconColor: PropTypes.string,
  containerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  selectedDate: PropTypes.func,
  type: PropTypes.oneOf(["default", "small"]),
  mode: PropTypes.oneOf(["date", "datetime", "time"]),
  birthday: PropTypes.bool,
  value: PropTypes.string,
};

MyDatePicker.defaultProps = {
  birthday: false,
  mode: "date",
};
