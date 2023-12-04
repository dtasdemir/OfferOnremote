import moment from "moment";
import 'moment/locale/tr';
import 'moment/locale/en-au';
import DeviceInformation from "../../device/DeviceInformation";

/**
 * Created by Orhan SARIBAL on 16-12-2021.
 */

export function GetDays(dayCount = 7) {
    const weekdays = [];

    // to set language
    moment.locale(new DeviceInformation().getLocaleLanguage())

    for (let i = 0; i < dayCount; i++) {
        let day = moment().add(i, 'days');

        let date = day._d;

        let month = date.getMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }

        let format = date.getFullYear() + "-" + month + "-" + date.getDate();

        day = day.format('Do MMMM,dddd');

        let editedDate = day.split(",");

        let dayObj = {
            id: i,
            format: format,
            date1: editedDate[0],
            date2: editedDate[1],
        }

        weekdays.push(dayObj)
    }

    return weekdays;
}
