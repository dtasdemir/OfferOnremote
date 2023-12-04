import React, {useEffect, useContext} from 'react';
import {View, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {NavBar} from "../NavBar/NavBar";
import {ErrorView} from "../ErrorView/ErrorView";
import {Footer} from "../Footer/Footer";
import {LoadingView} from "../Loading/LoadingView";
import {MyPopupDialog} from "../Dialog/PopupDialog";
import {MyToast} from "../Common/Toast/MyToast";
import {MyStatusBar} from "../StatusBar/MyStatusBar";
import {pageStyle} from "../../values/Styles/Styles";
import {ThemeContext} from "../../contexts/ThemeContext";
import {LoadingContext} from "../../contexts/LoadingContext";

export const MyContainer = (props) => {
    const {hideLoading, isLoadingShowing} = useContext(LoadingContext);
    const {myColors} = useContext(ThemeContext);

    let {statusBar, footer, errorOnPress, errorMessage, error, footerActiveIndex, navbar, title, style} = props;

    useEffect(() => {
        return () => {
            // unmounted

            if (isLoadingShowing) {
                // to hide loading indicator when the page unmounted
                hideLoading();
            }
        };
    }, []);

    return (

        <View
            style={{backgroundColor: myColors.pageBGColor, flex: 1}}>

            {
                statusBar &&

                <MyStatusBar/>
            }

            {
                !statusBar &&

                <StatusBar hidden />
            }

            {
                navbar &&

                <NavBar
                    title={title}/>

            }

            <View
                style={{flex: 1}}>

                {
                    !error

                        ?

                        <View
                            style={{flex: 1, ...pageStyle, ...style}}>

                            {props.children}

                        </View>

                        :

                        <ErrorView
                            onPress={() => {
                                if (typeof errorOnPress() == 'function') {
                                    errorOnPress();
                                }
                            }}
                            errorMessage={errorMessage}/>
                }

            </View>

            {
                footer &&

                <Footer
                    activeIndex={footerActiveIndex}/>
            }

            <LoadingView/>

            <MyPopupDialog/>

            <MyToast/>

        </View>

    );

};

MyContainer.propTypes = {
    style: PropTypes.object,
    navbar: PropTypes.bool,
    footer: PropTypes.bool,
    title: PropTypes.string,
    statusBar: PropTypes.bool,
    footerActiveIndex: PropTypes.oneOf([0, 1, 2, 3]),
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    errorOnPress: PropTypes.func,
};

MyContainer.defaultProps = {
    navbar: true,
    footer: true,
    title: "",
    statusBar: true,
    error: false,
};
