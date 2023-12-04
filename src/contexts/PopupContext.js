import React, { createContext, Component } from "react";

export const PopupContext = createContext();
export const DialogConsumer = PopupContext.Consumer;

class PopupContextProvider extends Component {
	
	state = {
		show: false,
		title: "",
		message: "",
		dialogType: null,
		positiveText: "",
		negativeText: "",
		closeButton: false,
		image: null,
		content: null,
	};
	
	showDialog = (dialogProps, btnPositive, btnNegative) => {
		let {
			type, title, message, positiveText, negativeText,
			closeButton, image, content,
		} = dialogProps;
		
		this.setState({
			show: true,
			title: title,
			message: message,
			type: type,
			positiveText: positiveText,
			negativeText: negativeText,
			closeButton: closeButton,
			buttonPositive: btnPositive,
			buttonNegative: btnNegative,
			image: image,
			content: content,
		});
	};
	
	hideDialog = () => {
		this.setState({
			show: false,
			title: "",
			message: "",
			dialogType: null,
			bpt: "",
			bnt: "",
			image: null,
			content: null,
		});
	};
	
	render() {
		
		return (
			
			<PopupContext.Provider
				value={{
					...this.state,
					showDialog: this.showDialog,
					hideDialog: this.hideDialog,
				}}>
				
				{this.props.children}
			
			</PopupContext.Provider>
		
		);
		
	}
	
}

export default PopupContextProvider;
