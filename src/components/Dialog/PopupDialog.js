import React, { useContext } from "react";
import { View, Image } from "react-native";
import { Dialog, SlideAnimation } from "react-native-popup-dialog";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyText } from "../Common/Text/MyText";
import { MyButton } from "../Common/Button/MyButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { StringContext } from "../../contexts/StringContext";
import { DialogType } from "../../helper/components/PopupDialogs";
import { PopupContext } from "../../contexts/PopupContext";
import { deviceWidth, isTablet } from "../../values/Constants/Constants";
import { MyIconButton } from "../Common/Button/MyIconButton";

export const MyPopupDialog = (props) => {
	const {
		type, show, title, message, positiveText, negativeText,
		buttonPositive, buttonNegative, hideDialog, closeButton,
		image, content,
	} = useContext(PopupContext);

	const {myColors} = useContext(ThemeContext);
	const {myStrings} = useContext(StringContext);

	function getButtonColor() {
		let color;

		switch (type) {
			case DialogType.default:
				color = myColors.successColor;
				break;
			case DialogType.error:
				color = myColors.errorColor;
				break;
			case DialogType.info:
				color = myColors.infoColor;
				break;
			case DialogType.custom:
				color = myColors.successColor;
				break;
			case DialogType.success:
				color = myColors.successColor;
				break;
			case DialogType.warning:
				color = myColors.warningColor;
				break;
		}

		return color;
	}

	function _buttonPositiveClick() {
		if (typeof buttonPositive == "function") {
			buttonPositive();
		}
		// to hide dialog after button click
		hideDialog();
	}

	function _buttonNegativeClick() {
		if (typeof buttonNegative() == "function") {
			buttonNegative();
		}
		// to hide dialog after button click
		hideDialog();
	}

	const _renderPositiveButton = () => {
		return (
			<MyButton
				testID={"btn_positive"}
				accessibilityLabel={"btn_positive"}
				onPress={() => _buttonPositiveClick()}
				buttonText={positiveText || myStrings.button.ok}
				size={"small"}
				textStyle={{fontSize: hp(1.7)}}
				containerStyle={{backgroundColor: getButtonColor()}}/>
		);
	};

	const _renderNegativeButton = () => {
		return (
			<MyButton
				testID={"btn_negative"}
				accessibilityLabel={"btn_negative"}
				onPress={() => _buttonNegativeClick()}
				buttonText={negativeText}
				size={"small"}
				type={"success"}
				filled={false}
				textStyle={{ color: myColors.textColor, fontSize: hp(1.7) }}
				containerStyle={{ marginVertical: 0, borderWidth: 0 }} />
		);
	};

	const _renderContentView = () => {
		return (
			<View
				style={{
					width: "90%",
					alignSelf: "center",
					paddingVertical: 10,
				}}>

				{/* if dialog has image */}
				{
					image &&

					<Image
						resizeMode={"contain"}
						source={image}
						style={{
							height: hp(20),
							width: "100%",
							marginBottom: 20,
						}} />
				}

				{/* title text */}
				<MyText
					isTitle={true}
					text={title}
					textStyle={{ fontSize: hp(3.5) }} />

				{
					type !== DialogType.custom

						?

						<MyText
							text={message}
							textStyle={{ marginTop: 10, marginBottom: 20 }} />

						:

						props.children
				}

				{
					negativeText

						?

						<View>

							{/* positive dialog button */}
							{_renderPositiveButton()}

							{/* negative dialog button */}
							{_renderNegativeButton()}

						</View>

						:

						_renderPositiveButton()
				}

			</View>
		);
	};

	if (show) {
		return (
			<Dialog
				overlayBackgroundColor={"#454545"}
				width={isTablet ? (deviceWidth * 0.55) : (deviceWidth * 0.9)}
				visible={show}
				dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
				dialogStyle={{ zIndex: 999 }}>

				{
					closeButton &&

					<MyIconButton
						testID={"btn_close"}
						accessibilityLabel={"btn_close"}
						onPress={() => hideDialog()}
						iconName={"x"}
						iconGroup={"Feather"}
						containerStyle={{
							alignItems: "center",
							backgroundColor: myColors.iconViewColor,
							margin: 10,
							alignSelf: "flex-end",
						}} />
				}

				{_renderContentView()}

			</Dialog>
		);
	}

	return null;
};
