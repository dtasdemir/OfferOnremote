
class Toast {

    duration = 1500;

    success(text, duration) {
        this.show(__colorContext.myColors.successColor, text, duration, "check-circle");
    }

    error(text, duration) {
        this.show(__colorContext.myColors.errorColor, text, duration, "x-circle");
    }

    info(text, duration) {
        this.show(__colorContext.myColors.infoColor, text, duration, "info");
    }

    warning(text, duration) {
        this.show(__colorContext.myColors.warningColor, text, duration, "alert-circle");
    }

    show(color, text, duration, icon) {
        if (!duration) duration = this.duration;

        __toastContext.showToast(
            color,
            text,
            duration,
            icon
        );

        setTimeout(() => {
            __toastContext.hideToast();
        }, duration);
    }
}

export const ShowToast = new Toast();
