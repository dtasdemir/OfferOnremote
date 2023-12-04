import React, {useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, FlatList} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Dialog} from "react-native-popup-dialog/src";
import {SlideAnimation} from "react-native-popup-dialog";
import {_MF} from "../../../helper/functions/MyFunctions";
import {deviceWidth, isTablet} from "../../../values/Constants/Constants";
import {MyInput} from "../Input/MyInput";
import {StringContext} from "../../../contexts/StringContext";
import {MyIcon} from "../VectorIcon/MyIcon";
import {MyText} from "../Text/MyText";

export const MyPhoneCodePicker = (props) => {
    const {myStrings} = useContext(StringContext);

    let {pickerVisible, data, onSelect, pickerOnClose, searchKey} = props;

    const [pickerData, setPickerData] = useState(data);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setPickerData(data)
    }, [data]);

    const search = (searchText) => {
        // to set entered text to the picker state
        setSearchText(searchText);

        if (searchText.length >= 3) {
            //search here!
            let searchedData = _MF.search(data, searchKey, searchText);
            setPickerData(searchedData);
        }

        if (searchText == "") {
            setPickerData(data);
        }
    };

    // to render picker items
    const renderItem = (item, key) => {
        return (
            <TouchableOpacity
                key={key}
                onPress={() => {
                    // to call on select method to let know the parent
                    onSelect(item);
                    // to set "" string value for setting as initial
                    setSearchText("");
                    // to set all data to the picker like as default
                    setPickerData(data);
                    // to let know the parent about pickerOnClose method called
                    pickerOnClose();
                }}
                style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                    padding: 10,
                    flex: 1,
                    paddingLeft: 20,
                    height: "100%"
                }}>

                <View
                    style={{width: "90%", flexDirection: "row", alignItems: "center"}}>

                    <View
                        style={{
                            width: hp(1.5),
                            height: hp(1.5),
                            borderRadius: 100,
                            backgroundColor: "grey",
                            marginRight: 20
                        }}/>

                    <MyText
                        text={item["dialCode"]}
                        textStyle={{
                            fontSize: hp("1.8%"),
                            color: "grey",
                            fontWeight: "500",
                            flex: 1
                        }}/>

                    <Text
                        style={{
                            flex: 3,
                            fontSize: hp("1.8%"),
                            color: "grey",
                            fontWeight: "500",
                            textAlign: "left"
                        }}>

                        {item["name"]}

                    </Text>

                </View>

            </TouchableOpacity>
        )
    };

    return (
        <Dialog
            overlayBackgroundColor={"#454545"}
            width={isTablet ? (deviceWidth * 0.7) : (deviceWidth * 0.9)}
            height={hp(70)}
            visible={pickerVisible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
            dialogStyle={{zIndex: 999, backgroundColor: "transparent"}}>

            <View
                style={{height: "92%", backgroundColor: "white"}}>

                {/* search view */}
                <MyInput
                    value={searchText}
                    onChangeText={value => search(value)}
                    multiline={false}
                    placeholder={myStrings.search}
                    placeHolderTextColor={"grey"}
                    leftIcon={"search"}/>

                <View
                    style={{height: "87%"}}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={pickerData}
                        renderItem={({item, key}) => renderItem(item, key)}/>

                </View>


            </View>

            <View
                style={{height: "8%", backgroundColor: "transparent"}}>

                {/* close button */}
                <TouchableOpacity
                    onPress={() => {
                        // to set "" string value for setting as initial
                        setSearchText("");
                        // to set all data to the picker like as default
                        setPickerData(data);
                        // to let know the parent picker close button clicked
                        pickerOnClose();
                    }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        width: hp(5),
                        height: hp(5),
                        alignSelf: "center"
                    }}>

                    <MyIcon
                        iconName={"times"}
                        iconGroup={"FontAwesome"}
                        iconStyle={{
                            fontSize: hp(5),
                            color: "white"
                        }}/>

                </TouchableOpacity>

            </View>


        </Dialog>
    );
};

MyPhoneCodePicker.propTypes = {
    search: PropTypes.bool,
    pickerVisible: PropTypes.bool,
    data: PropTypes.array,
    searchKey: PropTypes.string,
    onSelect: PropTypes.func,
    pickerOnClose: PropTypes.func
};

MyPhoneCodePicker.defaultProps = {
    searchKey: "title",
};
