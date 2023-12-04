import React, {useState, useContext, useRef} from "react";
import {Keyboard, View} from "react-native"
import {StringContext} from "../../../contexts/StringContext";
import {ShowToast} from "../../../helper/components/Toasts";
import {MyRequest} from "../../../adapter/api/MyRequest";
import {navigate} from "../../../RootMethods/RootNavigation";
import {MyContainer} from "../../../components/Container/Container";
import {MyButton} from "../../../components/Common/Button/MyButton";
import {UserInfoView} from "../../../components/Others/UserInfoView";
import { DialogType, ShowDialog } from "../../../helper/components/PopupDialogs";

export const ChangePasswordScreen = (props) => {
    const {myStrings} = useContext(StringContext);

    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const newPasswordRepeatRef = useRef(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

    function _changePasswordControl() {
        if (!currentPassword) {
            ShowToast.warning(myStrings.cannotBeNull.password);
        }
        else if (!newPassword) {
            ShowToast.warning(myStrings.cannotBeNull.newPassword);
        }
        else if (!newPasswordRepeat) {
            ShowToast.warning(myStrings.cannotBeNull.newPasswordRepeat);
        }
        else if (newPassword !== newPasswordRepeat) {
            ShowToast.error(myStrings.cannotBeNull.passwordNotMatch);
        }
        else {
            _changePasswordRequest();
        }
    }

    function _changePasswordRequest() {
        let passwordData = {
            oldPassword: currentPassword,
            newPassword: newPasswordRepeat,
        };

        MyRequest("Change Password", "changePasswordUrl", passwordData)
            .then((response) => {
                ShowDialog({
                    type: DialogType.success,
                    title: myStrings.appName,
                    message: response["message"]
                })
                .then(() => navigate("HomeScreen"))
            });
    }

    return(
        <MyContainer
            title={myStrings.changePassword}>

            <View
                style={{marginBottom: 20}}>

                {/* current password input */}
                <UserInfoView
                    inputRef={currentPasswordRef}
                    onSubmitEditing={() => newPasswordRef.current.focus()}
                    value={currentPassword}
                    secureTextEntry={true}
                    returnKeyType={"next"}
                    title={myStrings.currentPassword}
                    maxLength={20}
                    onChangeText={setCurrentPassword}/>

                {/* new password input */}
                <UserInfoView
                    inputRef={newPasswordRef}
                    onSubmitEditing={() => newPasswordRepeatRef.current.focus()}
                    value={newPassword}
                    secureTextEntry={true}
                    returnKeyType={"next"}
                    title={myStrings.newPassword}
                    maxLength={20}
                    onChangeText={setNewPassword}/>

                {/* new password repeat input */}
                <UserInfoView
                    inputRef={newPasswordRepeatRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        _changePasswordControl();
                    }}
                    value={newPasswordRepeat}
                    secureTextEntry={true}
                    title={myStrings.newPasswordRepeat}
                    maxLength={20}
                    onChangeText={setNewPasswordRepeat}/>

            </View>

            <MyButton
                buttonText={myStrings.changePassword}
                onPress={() => _changePasswordControl()}
                filled={true}
                type={"success"}/>

        </MyContainer>
    );
}
