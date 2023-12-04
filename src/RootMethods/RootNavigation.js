// RootNavigation.js

import * as React from 'react';
import {DrawerActions, StackActions} from '@react-navigation/native';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

// to navigate new screen
export function navigate(name, params = null) {
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export function replace(name, params = null) {
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.dispatch(StackActions.replace(name,params));
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

// to open drawer menu
export function openDrawer() {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
}

// to close drawer menu
export function closeDrawer() {
    navigationRef.current.dispatch(DrawerActions.closeDrawer());
}

// to go back previous screen
export function goBack() {
    navigationRef.current.goBack();
}

// if the screen is focused
export function isFocused() {
   return navigationRef.current.isFocused();
}
