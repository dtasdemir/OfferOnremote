import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ThemeContext} from "../../contexts/ThemeContext";

export const shadowStyle = {
    shadowColor: ThemeContext?.myColors?.shadowColor,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5
};

export const lineStyle = {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: ThemeContext?.myColors?.lineColor,
    marginVertical: 10,
};

export const cardStyle = Object.assign({}, shadowStyle, {
    backgroundColor: "white",
    borderRadius: 5,
});

export const fontFamily = {
    bold: "Quicksand-Bold",
    medium: "Quicksand-Medium",
    regular: "Quicksand-Regular",
    light: "Quicksand-Light",
};

export const activeButton = {
    button: {
        backgroundColor: ThemeContext?.myColors?.mainColor,
        alignItems: "center",
        height: hp("5%"),
        width: wp("30%"),
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: hp("1.8%"),
        fontWeight: "bold",
        textAlign: "center"
    }
};

export const passiveButton = {
    button: {
        backgroundColor: "white",
        alignItems: "center",
        height: hp("5%"),
        width: wp("30%"),
        justifyContent: "center"
    },
    text: {
        color: ThemeContext?.myColors?.mainColor,
        fontSize: hp("1.8%"),
        fontWeight: "bold",
        textAlign: "center"
    }
};

export const notLoginPageStyle = {
    flex: 1,
    backgroundColor: ThemeContext?.myColors?.mainColor,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
};

export const pageStyle = {
    flex: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3)
};
