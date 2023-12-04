import React from "react";
import PropTypes from "prop-types";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Evil from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLine from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 *  Use this component to
 *  access all react-native-vector icons.
 *  Specify group and name
 */

export const MyIcon = (props) => {
    let {iconGroup, iconName, iconStyle} = props;

    let icon;
    switch (iconGroup) {
        case "AntDesign":
            icon = <AntDesign name={iconName} style={iconStyle}/>
            break;
        case "Entypo":
            icon = <Entypo name={iconName} style={iconStyle}/>
            break;
        case "Evil":
            icon = <Evil name={iconName} style={iconStyle}/>
            break;
        case "Feather":
            icon = <Feather name={iconName} style={iconStyle}/>
            break;
        case "FontAwesome":
            icon = <FontAwesome name={iconName} style={iconStyle}/>
            break;
        case "FontAwesome5":
            icon = <FontAwesome5 name={iconName} style={iconStyle}/>
            break;
        case "FontAwesome5Pro":
            icon = <FontAwesome5Pro name={iconName} style={iconStyle}/>
            break;
        case "Foundation":
            icon = <Foundation name={iconName} style={iconStyle}/>
            break;
        case "Ionicons":
            icon = <Ionicons name={iconName} style={iconStyle}/>
            break;
        case "MaterialIcons":
            icon = <MaterialIcons name={iconName} style={iconStyle}/>
            break;
        case "MaterialCommunity":
            icon = <MaterialCommunity name={iconName} style={iconStyle}/>
            break;
        case "MaterialCommunityIcons":
            icon = <MaterialCommunityIcons name={iconName} style={iconStyle}/>
            break;
        case "Octicons":
            icon = <Octicons name={iconName} style={iconStyle}/>
            break;
        case "SimpleLine":
            icon = <SimpleLine name={iconName} style={iconStyle}/>
            break;
        case "Zocial":
            icon = <Zocial name={iconName} style={iconStyle}/>
            break;
        default:
            icon = <Feather name={iconName} style={iconStyle}/>
            break;
    }
    return icon;
}

MyIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconGroup: PropTypes.oneOf([
        "AntDesign", "Entypo", 'Evil', "Feather",
        "FontAwesome", "FontAwesome5","FontAwesome5Pro", "Foundation",
        "Ionicons", "MaterialIcons", "MaterialCommunity", "Octicons",
        "SimpleLine", "Zocial", "MaterialCommunityIcons"
    ]).isRequired,
    iconStyle: PropTypes.object.isRequired
};
