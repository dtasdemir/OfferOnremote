import React, {createContext, useState} from 'react';

export const LoadingContext = createContext();
export const LoadingConsumer = LoadingContext.Consumer;

export const LoadingContextProvider = (props) => {
    const [isLoadingShowing, setIsLoadingShowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    const showLoading = (loadingText) => {
        setIsLoading(true);
        setLoadingText(loadingText);
        setIsLoadingShowing(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
        setLoadingText("");
        setIsLoadingShowing(false);
    };

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                loadingText,
                isLoadingShowing,
                showLoading,
                hideLoading,
            }}>

            {props.children}

        </LoadingContext.Provider>
    )
}
