import React from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";

import { goLink } from "../../utils";

type Props = {
  instagram: string | null;
  twitter: string | null;
};

export const SocialIcons = React.memo(({ instagram, twitter }: Props) => {
  const onPress = async (link: string) => {
    const _link = `https://www.instagram.com/${link}/`;
    goLink(_link);
  };

  return (
    <View style={styles.icons}>
      {instagram && (
        <SocialIcon
          type="instagram"
          style={{ width: 30, height: 30, backgroundColor: "pink" }}
          iconSize={17}
          underlayColor="pink"
          onPress={() => onPress(instagram)}
        />
      )}
      {twitter && (
        <SocialIcon
          type="twitter"
          style={{ width: 30, height: 30 }}
          iconSize={17}
          onPress={() => onPress(twitter)}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    height: 44,
  },
});
