/**
 * Created by Orhan SARIBAL on 25-05-2021.
 */

import React from "react";
import PropTypes from 'prop-types';
import Star from 'react-native-star-view';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MyStarView = (props) => {
    let {score, height, width} = props;

    return(
        <Star
            score={score}
            style={{width: width, height: height}}/>
    )
}

MyStarView.props = {
    score: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
};

MyStarView.defaultProps = {
    score: 0,
    width: hp(12),
    height: hp(2.5),
}
