import SyncStorage from 'sync-storage';

export class User {

    setUsername(name) {
        SyncStorage.set("username", name);
    }

    getUsername() {
        return SyncStorage.get("username");
    }

    setName(name) {
        SyncStorage.set("name", name);
    }

    getName() {
        return SyncStorage.get("name");
    }

    setSurname(surname) {
        SyncStorage.set("surname", surname);
    }

    getSurname() {
        return SyncStorage.get("surname");
    }

    setType(type) {
        SyncStorage.set("type", type);
    }

    getType() {
        return SyncStorage.get("type");
    }

    setId(id) {
        SyncStorage.set("id", id);
    }

    getId() {
        return SyncStorage.get("id");
    }

    setMail(mail) {
        SyncStorage.set("mail", mail);
    }

    getMail() {
        return SyncStorage.get("mail");
    }

    setNumber(number) {
        SyncStorage.set("number", number);
    }

    getNumber() {
        return SyncStorage.get("number");
    }

    setUserId(id) {
        SyncStorage.set("user_id", id)
    }

    getUserId() {
        return SyncStorage.get("user_id");
    }

    isLogin() {
        return SyncStorage.get("isLogin");
    }

    setLogin(flag) {
        SyncStorage.set("isLogin", flag);
    }

    setFBLogin(flag) {
        SyncStorage.set("fbLogin", flag);
    }

    getFBLogin() {
        return SyncStorage.get("fbLogin");
    }

    setGoogleLogin(flag) {
        SyncStorage.set("googleLogin", flag);
    }

    getGoogleLogin() {
        return SyncStorage.get("googleLogin");
    }

    setSelectedLocation(locationData) {
        SyncStorage.set("selected_location", locationData);
    }

    getSelectedLocation() {
        return SyncStorage.get("selected_location");
    }

    setLocation(location) {
        SyncStorage.set("user_location", location);
    }

    getLocation() {
        return SyncStorage.get("user_location");
    }

    setGender(gender) {
        SyncStorage.set("user_gender", gender);
    }

    getGender() {
        return SyncStorage.get("user_gender");
    }

    setBirthday(birthday) {
        SyncStorage.set("user_birthday", birthday);
    }

    getBirthday() {
        return SyncStorage.get("user_birthday");
    }

    setAllowPush(allowPush) {
        SyncStorage.set("user_allowPush", allowPush);
    }

    getAllowPush() {
        return SyncStorage.get("user_allowPush");
    }

    setAvatar(avatar) {
        SyncStorage.set("user_avatar", avatar);
    }

    getAvatar() {
        return SyncStorage.get("user_avatar");
    }

    getUserInfo() {
        return  {
            name: this.getName() || "",
            surname: this.getSurname() || "",
            email: this.getMail() || "",
            phoneNumber: this.getNumber() || "",
            avatar: this.getAvatar() || "",
        }
    }

    clearAllUserData(){
        // to clear all locale storage data
        let allLocaleKeys = SyncStorage.getAllKeys()

        for (let i in allLocaleKeys) {
            let key = allLocaleKeys[i];

            if (key === "first_opening" || key === "token") {
                continue;
            }
            SyncStorage.remove(key);
        }
    }
}
