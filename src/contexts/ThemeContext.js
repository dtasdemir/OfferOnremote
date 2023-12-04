import React, {createContext, Component, useState} from "react";
import DeviceInformation from "../device/DeviceInformation";
import {myColors as mColors} from '../values/Colors/Colors';

export const ThemeContext = createContext(null);
export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeContextProvider = (props) => {
    const [myColors, setMyColors] = useState(mColors[new DeviceInformation().getSelectedTheme()]);

    const updateTheme = (alias) => {
        setMyColors(mColors[alias]);
    };

    return (
        <ThemeContext.Provider
            value={{
                myColors,
                updateTheme
            }}>

            {props.children}

        </ThemeContext.Provider>
    )
}
