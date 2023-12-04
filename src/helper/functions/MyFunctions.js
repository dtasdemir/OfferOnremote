import moment from "moment";

class MyFunctions {

    search(fullData,searchKey,searchValue){
        let searchedData = [];
        fullData.find((el) => {
            if (el[searchKey].toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !== -1) {
                searchedData.push(el);
            }
        });
        return searchedData;
    }

    searchWithMultipleKeys(data, keys, searchValue) {
        let lowSearch = this.turkishToLowerCase(searchValue);
        return data.filter(obj =>
            keys.some(key =>
                this.turkishToLowerCase(String(obj[key])).includes(lowSearch)
            ));
    }

    turkishToLowerCase(string) {
        let letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
        return string.toLowerCase();
    }

    inArray(dataArr, searchKey, searchValue){
        let flag = false;
        dataArr.find((obj) => {
            if (obj[searchKey].valueOf() == searchValue) {
                flag = true;
            }
        });

        return flag;
    }

    dateFormat(date, format = 'DD.MM.YYYY') {
        return moment.utc(date).format(format);
    }

    dateFormatForWeb(date) {
        return moment(date,"DD.MM.YYYY").format("YYYY-MM-DD");
    }

    timeDiff (date1, date2, type = "days") {
        return moment(date1).diff(moment(date2), type);
    }

    emailValidationControl(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email) !== false;
    }

    phoneNumberControl(number) {
        return number.match(/\d/g).length===10;
    }

    tcControl(TCNO) {
        let odd = 0;
        let even = 0;
        let result = 0;
        let TCTotal = 0;
        let wrong = [11111111110, 22222222220, 33333333330, 44444444440, 55555555550, 66666666660, 7777777770, 88888888880, 99999999990];

        if (TCNO.length != 11) return false;
        if (isNaN(TCNO)) return false;
        if (TCNO[0] == 0) return false;

        odd = parseInt(TCNO[0]) + parseInt(TCNO[2]) + parseInt(TCNO[4]) + parseInt(TCNO[6]) + parseInt(TCNO[8]);
        even = parseInt(TCNO[1]) + parseInt(TCNO[3]) + parseInt(TCNO[5]) + parseInt(TCNO[7]);

        odd = odd * 7;
        result = Math.abs(odd - even);
        if (result % 10 != TCNO[9]) return false;

        for (let i = 0; i < 10; i++) {
            TCTotal += parseInt(TCNO[i]);
        }

        if (TCTotal % 10 != TCNO[10]) return false;

        return wrong.toString().indexOf(TCNO) == -1;
    }

    onlyCharacterControl(text) {
        let reg = /^[a-zA-ZğüşıöçĞÜŞIİÖÇ\s]*$/;
        return reg.test(text) !== false;
    }

    //todo: passport number validation
    passportControl(passportNumber) {
        // let reg = new RegExp("^([A-Z a-z]){1}([0-9]){7}$")
        //
        // return reg.test(passportNumber);

        return true;
    }

}

export const _MF = new MyFunctions();
