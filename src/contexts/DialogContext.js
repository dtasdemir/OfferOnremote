import React, {createContext, Component} from "react";

export const DialogContext = createContext();
export const DialogConsumer = DialogContext.Consumer;

class DialogContextProvider extends Component {

    state = {
        show: false,
        title: "",
        message: "",
        twoButton: false,
        dialogType: "default",
        bpt: "",
        bnt: "",
        close: false
    };

    showDialog = (type, title, message, bpt, bnt, twoButton, btnPositive, btnNegative, close) => {
        this.setState({
            show: true,
            title: title,
            message: message,
            twoButton: twoButton,
            dialogType: type,
            bpt: bpt,
            bnt: bnt,
            buttonPositive: btnPositive,
            buttonNegative: btnNegative,
            close: close
        })
    };

    hideDialog = () => {
        this.setState({
            show: false,
            title: "",
            message: "",
            twoButton: false,
            dialogType: "default",
            bpt: "",
            bnt: "",
            close: false
        })
    };

    render() {

        return (

            <DialogContext.Provider
                value={{
                    ...this.state,
                    showDialog: this.showDialog,
                    hideDialog: this.hideDialog
                }}>

                {this.props.children}

            </DialogContext.Provider>

        )

    }

}

export default DialogContextProvider;
