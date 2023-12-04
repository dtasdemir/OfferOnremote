import React, {createContext, useState} from 'react';

export const ToastContext = createContext();
export const ToastConsumer = ToastContext.Consumer;

export const ToastContextProvider = (props) => {
    const [message, setMessage] = useState("");
    const [duration, setDuration] = useState("");
    const [color, setColor] = useState("");
    const [show, setShow] = useState("");
    const [icon, setIcon] = useState("");

    const showToast = (color, message, duration, icon) => {
        setColor(color);
        setMessage(message);
        setDuration(duration);
        setIcon(icon);
        setShow(true);
    };

    const hideToast = () => {
        setMessage("");
        setShow(false);
    };

    return (
        <ToastContext.Provider
            value={{
                message,
                duration,
                color,
                show,
                icon,
                showToast,
                hideToast
            }}>

            {props.children}

        </ToastContext.Provider>
    )
}
