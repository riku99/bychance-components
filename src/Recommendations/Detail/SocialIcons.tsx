import React from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";

import { goLink } from "../../utils";

type Props = {
  instagram: string | null;
  twitter: string | null;
  iconWidth?: number;
  iconHeight?: number;
  iconSize?: number;
};

const notSupportedAlert = () => {
  Alert.alert("無効なURLです", "");
};

export const SocialIcons = React.memo(
  ({
    instagram,
    twitter,
    iconWidth = 30,
    iconHeight = 30,
    iconSize = 17,
  }: Props) => {
    const onPress = async (link: string) => {
      const _link = `https://www.instagram.com/${link}/`;
      goLink(_link);
    };

    return (
      <View style={styles.icons}>
        {instagram && (
          <SocialIcon
            type="instagram"
            style={{
              width: iconWidth,
              height: iconHeight,
              backgroundColor: "pink",
            }}
            iconSize={iconSize}
            underlayColor="pink"
            onPress={() => onPress(instagram)}
          />
        )}
        {twitter && (
          <SocialIcon
            type="twitter"
            style={{ width: iconWidth, height: iconHeight }}
            iconSize={iconSize}
            onPress={() => onPress(twitter)}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 44,
  },
});
