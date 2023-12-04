import React, {createContext, useState} from "react";
import DeviceInformation from "../device/DeviceInformation";
import {myStrings as mStrings} from '../values/Strings/Strings';

export const StringContext = createContext();
export const StringConsumer = StringContext.Consumer;

export const StringContextProvider = (props) => {
    const [myStrings, setMyStrings] = useState(mStrings[new DeviceInformation().getLocaleLanguage()]);

    const updateString = (alias) => {
        setMyStrings(mStrings[alias]);
    };

    return (
        <StringContext.Provider
            value={{
                myStrings,
                updateString
            }}>

            {props.children}

        </StringContext.Provider>
    )
}
