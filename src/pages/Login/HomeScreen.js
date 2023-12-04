import React, {useState, useContext} from "react";
import {ScrollView} from "react-native";
import {MyContainer} from "../../components/Container/Container";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MyInput} from '../../components/Common/Input/MyInput';
import {MyButton} from '../../components/Common/Button/MyButton';
import {MyCheckBox} from '../../components/Common/CheckBox/MyCheckBox';
import {ForwardBack} from '../../components/NavBar/ForwardBack';
import {ErrorView} from '../../components/ErrorView/ErrorView';
import {MyDatePicker} from '../../components/Common/Picker/MyDatePicker';
import {MyPicker} from '../../components/Common/Picker/MyPicker';
import {ShowToast} from "../../helper/components/Toasts";
import {MyListItemIcon} from "../../components/ListItem/MyListItemIcon";
import {GenderSampleData} from "../../SampleData/GenderSampleData";
import {ThemeContext} from "../../contexts/ThemeContext";
import { DialogType, ShowDialog } from "../../helper/components/PopupDialogs";

export const HomeScreen = (props) => {
    const {myColors} = useContext(ThemeContext);

    const [name, setName] = React.useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (

        <MyContainer
            errorMessage={errorMessage}
            error={error}
            footerActiveIndex={0}
            navbar={false}>

            <ForwardBack
                containerStyle={{backgroundColor: myColors.mainColor}}
                text={"Home Screen"}
                leftOnPress={() => alert("go back")}/>

            {/* component samples */}
            <ScrollView
                style={{marginTop: hp(5)}}>

                <MyInput
                    onChangeText={setName}
                    value={name}
                    secureTextEntry={true}
                    keyboardType={"email-address"}
                    placeHolderTextColor={"green"}
                    placeholder={"TEST Text Input"}
                    rightIcon={"eye"}/>


                {/* sample button usage */}
                <MyButton
                    filled={false}
                    // leftIcon={"check"}
                    rightIcon={"arrow-right"}
                    // stickyIcon={true}
                    buttonText={"TEST Button"}
                    type={"info"}/>

                {/* sample checkbox usage */}
                <MyCheckBox
                    text={"CheckBox Text"}
                    onPress={() => alert("check box")}
                    checkedColor={"red"}
                    checked={true}/>

                {/*  sample list item usage */}
                <MyListItemIcon
                    title={"Test"}
                    subtitle={"Test"}
                    iconName={"globe"}
                    selected={false}
                    onPress={() => alert("list item")}/>

                {/* to see error view without error condition */}
                <ErrorView
                    errorMessage={"Error Message Here"}
                    filled={true}
                    onPress={() => alert("error button pressed")}/>

                {/* sample datepicker usage */}
                <MyDatePicker
                    leftIcon={"check"}
                    selectedDate={(date) => console.log("selectedDate: ", date)}/>

                {/*  picker button */}
                <MyButton
                    onPress={() => setShowPicker(true)}
                    type={"warning"}
                    filled={true}
                    buttonText={"Open Picker"}/>

                {/* popup dialog button */}
                <MyButton
                    onPress={() => {
                        ShowDialog({
                            type: DialogType.default,
                            title: "title",
                            message: "message",
                            positiveText: "positive",
                            negativeText: "negative",
                            image: require("../../assets/image/guest.png"),
                            closeButton: true
                        })
                        .then(() => {
                            console.log("positive pressed!")
                        })
                        .catch(() => {
                            console.log("negative pressed!")
                        })
                    }}
                    type={"danger"}
                    buttonText={"Dialog Button"}/>

                {/*  toast button */}
                <MyButton
                    type={"info"}
                    buttonText={"Toast Button"}
                    onPress={() => ShowToast.success("TEST Toast")}/>

            </ScrollView>

            {/* sample picker usage */}
            <MyPicker
                searchKey={"title"}
                onSelect={(data) => console.log("on select: ", data)}
                pickerOnClose={() => setShowPicker(false)}
                search={true}
                data={GenderSampleData}
                bottom={true}
                pickerVisible={showPicker}/>


        </MyContainer>

    );
}
