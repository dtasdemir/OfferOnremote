import React, {useEffect, useState, useContext, useRef} from "react";
import {MyContainer} from "../../../components/Container/Container";
import {ThemeContext} from "../../../contexts/ThemeContext";
import {StringContext} from "../../../contexts/StringContext";
import {UserInfoView} from "../../../components/Others/UserInfoView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const ProfileScreen = (props) => {
    const {myColors} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);

    const [name, setName] = useState("Name");
    const [surname, setSurname] = useState("Surname");
    const [birthday, setBirthday] = useState("01.01.1900");
    const [phoneNumber, setPhoneNumber] = useState("XXX-XXX-XX-XX");
    const [email, setEmail] = useState("test@test.com");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const inputStyle = {
        container: {
            backgroundColor: myColors.darkViewBGColor,
            borderBottomWidth: 0,
            borderWidth: 0,
        }
    }

    useEffect(() => {
        _getProfileInfo();
    }, [])

    function _getProfileInfo() {
        // setIsLoading(true);
        setError(false);

        setIsLoading(false);
    }

    return(
        <MyContainer
            errorMessage={errorMessage}
            error={error}
            errorOnPress={() => {_getProfileInfo()}}
            footerActiveIndex={1}
            title={myStrings.profile}>

            {
                !isLoading &&

                <KeyboardAwareScrollView>

                    {/* name input */}
                    <UserInfoView
                        inputRef={nameRef}
                        icon={"user"}
                        value={name}
                        title={myStrings.title.name}
                        textControl={true}
                        returnKeyType={"next"}
                        maxLength={20}
                        containerStyle={inputStyle.container}
                        onSubmitEditing={() => surnameRef.current.focus()}
                        onChangeText={setName}/>

                    {/* surname input */}
                    <UserInfoView
                        inputRef={surnameRef}
                        icon={"user"}
                        value={surname}
                        title={myStrings.title.surname}
                        textControl={true}
                        returnKeyType={"next"}
                        maxLength={20}
                        containerStyle={inputStyle.container}
                        onSubmitEditing={() => emailRef.current.focus()}
                        onChangeText={setSurname}/>

                    {/* email input */}
                    <UserInfoView
                        inputRef={emailRef}
                        icon={"envelope"}
                        value={email}
                        title={myStrings.title.email}
                        keyboardType={"email-address"}
                        containerStyle={inputStyle.container}
                        onChangeText={setEmail}/>

                    {/* phoneNumber input */}
                    <UserInfoView
                        inputRef={phoneNumberRef}
                        icon={"phone"}
                        value={phoneNumber}
                        title={myStrings.title.phone}
                        maxLength={10}
                        keyboardType={"number-pad"}
                        containerStyle={inputStyle.container}
                        onChangeText={setPhoneNumber}/>

                    <UserInfoView
                        icon={"calendar"}
                        value={birthday}
                        isDatePicker={true}
                        onChangeText={setBirthday}
                        title={myStrings.title.birthday}/>

                </KeyboardAwareScrollView>
            }

        </MyContainer>
    )
}
