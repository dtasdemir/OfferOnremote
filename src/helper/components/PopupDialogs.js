/**
 * Created by Orhan SARIBAL on 07.06.2023
 */
import { PermissionsAndroid } from "react-native";

export const DialogType = {
  default: "default",
  error: "error",
  info: "info",
  custom: "custom",
  success: "success",
  warning: "warning",
};

interface DialogPropsInterface {
  type: DialogType.default | DialogType.custom,
  title: string,
  message: string,
  positiveText: string,
  negativeText: string,
  closeButton: boolean,
  image: string | number,
}

let DefaultDialogProps: DialogPropsInterface = {
  type: DialogType.default,
  title: "",
  message: "",
  positiveText: null,
  negativeText: null,
  closeButton: false,
  image: null,
};

export function ShowDialog(dialogProps: DialogPropsInterface) {
  dialogProps = { ...DefaultDialogProps, ...dialogProps };

  return new Promise((resolve, reject) => {
    /**
     *  type,
     *  title,
     *  message,
     *  positive button text,
     *  negative button text,
     *  positive button callback,
     *  negative button callback
     */

    if (typeof __popupContext !== "undefined") {
      __popupContext.showDialog(
          dialogProps,
          async function() {
            resolve();
          },
          function() {
            reject();
          },
      );
    } else {
      console.log("error -> dialog context is not defined");
    }
  });
}
