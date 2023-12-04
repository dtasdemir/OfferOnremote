import React, {useEffect, useState, useContext} from "react";
import PropTypes from 'prop-types';
import {View, FlatList} from "react-native";
import {MyInput} from "../Input/MyInput";
import {heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Dialog} from "react-native-popup-dialog/src";
import {SlideAnimation} from "react-native-popup-dialog";
import {MyButton} from "../Button/MyButton";
import {MyCheckBox} from '../CheckBox/MyCheckBox';
import {ThemeContext} from "../../../contexts/ThemeContext";
import {StringContext} from "../../../contexts/StringContext";
import {_MF} from "../../../helper/functions/MyFunctions";
import {deviceWidth} from "../../../values/Constants/Constants";

export const MyPicker = (props) => {
    const {myColors} = useContext(ThemeContext);
    const {myStrings} = useContext(StringContext);

    let {
        pickerVisible, data, onSelect, pickerOnClose, searchKey,
        search, multipleSelect, itemTextKey, bottom
    } = props;

    const [modalData, setData] = useState(data);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setData(data);
        setSearchText("");

        return(() => {
            setSearchText("");
        })
    }, [data]);

    // search method that search inside picker data
    const searchData = (search) => {
        let fullData = data;
        if (search == "") {
            // to set full data to the modalData value if there is no search key
            setData(fullData);
            // to set searched text
            setSearchText(search);
            return true;
        }

        let searchedData = _MF.search(fullData, searchKey, search);

        // to set searched data to the full data that is modalData
        setData(searchedData);

        // to set searched text
        setSearchText(search);
    };

    // to render picker items
    const renderItem = (item, index) => {
        let selected = item?.selected;
        return (
            <MyCheckBox
                key={index}
                onPress={() => {
                    // to update item selected value
                    let temp = [...modalData];

                    if (!multipleSelect) {
                        let tempArr = [];
                        for (let i in modalData) {
                            let data = modalData[i];
                            data.selected = false;
                            tempArr.push(data);
                        }
                        temp = tempArr;
                    }

                    let subItem = temp[index];
                    subItem.selected = !subItem.selected;
                    temp[index] = subItem;
                    setData(temp);

                    if (!multipleSelect) {
                        // to call on select method to let know the parent
                        onSelect(item);
                        // to let know the parent about pickerOnClose method called
                        pickerOnClose();
                    }
                }}
                checked={selected}
                text={item[itemTextKey]}
                containerStyle={{
                    width: "100%",
                    flexDirection: "row",
                    padding: 10,
                    flex: 1,
                    paddingLeft: 20,
                    height: "100%",
                }}
                textStyle={{
                    fontWeight: "500",
                    color: myColors.titleTextColor
                }}/>
        )
    };

    if (bottom) {
        return (
            <Dialog
                overlayBackgroundColor={"#454545"}
                width={deviceWidth * 0.95}
                visible={pickerVisible}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                dialogStyle={{
                    zIndex: 99999,
                    position: "absolute",
                    bottom: hp(2),
                    maxHeight: hp(70),
                    minHeight: hp(17),
                    backgroundColor: myColors.pageBGColor,
                }}>

                <View
                    style={{flex: 1, justifyContent: "center"}}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={modalData}
                        style={{flexGrow: 0}}
                        renderItem={({item, index}) => renderItem(item, index)}/>

                </View>

                {/* close button */}
                <MyButton
                    onPress={() => {
                        // to let know the parent picker close button clicked
                        pickerOnClose();
                    }}
                    size={"small"}
                    containerStyle={{width: "30%", margin: 0, marginBottom: 5}}
                    buttonText={myStrings.button.close}/>

            </Dialog>
        );
    }
    else {
        return (
            <Dialog
                overlayBackgroundColor={"#454545"}
                width={deviceWidth * 0.9}
                height={hp(75)}
                visible={pickerVisible}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                dialogStyle={{zIndex: 999, backgroundColor: "transparent"}}>

                <View
                    style={{flex: 1, backgroundColor: myColors.pageBGColor}}>

                    {
                        search &&

                        <View
                            style={{margin: 10, marginBottom: 0}}>

                            <MyInput
                                placeholder={myStrings.search}
                                leftIcon={"search"}
                                value={searchText}
                                onChangeText={(text) => searchData(text)}/>

                        </View>
                    }

                    <View
                        style={{flex: 1}}>

                        <FlatList
                            nestedScrollEnabled={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={modalData}
                            renderItem={({item, index}) => renderItem(item, index)}/>

                    </View>


                </View>

                {/* button view */}
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10
                    }}>

                    {/* close button */}
                    <MyButton
                        onPress={() => {
                            // to let know the parent picker close button clicked
                            pickerOnClose();
                        }}
                        containerStyle={{width: multipleSelect ? "49%" : "100%", margin: 0}}
                        buttonText={myStrings.button.close}/>

                    {/* approve button */}
                    {
                        multipleSelect &&

                        <MyButton
                            onPress={() => {
                                // to send all selected picker items
                                onSelect(modalData.filter(item => item.selected === true))
                                // to let know the parent, picker approve button clicked
                                pickerOnClose();
                            }}
                            containerStyle={{width: "49%", margin: 0}}
                            buttonText={myStrings.button.approve}/>
                    }

                </View>

            </Dialog>
        );
    }
};

MyPicker.propTypes = {
    search: PropTypes.bool,
    itemTextKey: PropTypes.string,
    pickerVisible: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    bottom: PropTypes.bool,
    data: PropTypes.array,
    searchKey: PropTypes.string,
    onSelect: PropTypes.func,
    pickerOnClose: PropTypes.func
};

MyPicker.defaultProps = {
    searchKey: "title",
    itemTextKey: "title",
    multipleSelect: false,
    bottom: false
};
