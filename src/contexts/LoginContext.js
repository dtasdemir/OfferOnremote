import React, {createContext, useState} from 'react';
import {User} from "../helper/user/User";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
    const user = new User();

    const [isLogin, setIsLogin] = useState(user.isLogin());
    const [userInfo, setInfo] = useState(user.getUserInfo());

    const setLogin = (isLogin) => {
        setIsLogin(isLogin);

        if (!isLogin) {
            // to store User login status to the app locale
            new User().clearAllUserData();
            setInfo({})
        }
        else {
            user.setLogin(true);
        }
    };

    const setUserInfo = (userInfo) => {
        let {name, surname, email, phoneNumber, avatar} = userInfo;

        let user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setMail(email || "");
        user.setNumber(phoneNumber || "");
        user.setAvatar(avatar || "");

        setInfo(userInfo);
    }

    return (
        <LoginContext.Provider
            value={{
                isLogin,
                userInfo,
                setLogin,
                setUserInfo
            }}>

            {props.children}

        </LoginContext.Provider>
    )
}

export const LoginConsumer = LoginContext.Consumer;
