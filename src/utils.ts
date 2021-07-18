import { Linking, Alert } from "react-native";

const notSupportedAlert = () => {
  Alert.alert("無効なURLです", "");
};

export const goLink = async (link: string) => {
  try {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      notSupportedAlert();
    }
  } catch (e) {
    notSupportedAlert();
  }
};
