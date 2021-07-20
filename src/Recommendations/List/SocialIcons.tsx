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
    goLink(link);
  };

  return (
    <View style={styles.icons}>
      {instagram && (
        <SocialIcon
          type="instagram"
          style={{ width: 30, height: 30, backgroundColor: "pink" }}
          iconSize={17}
          underlayColor="pink"
          onPress={() => onPress(`https://www.instagram.com/${instagram}/`)}
        />
      )}
      {twitter && (
        <SocialIcon
          type="twitter"
          style={{ width: 30, height: 30 }}
          iconSize={17}
          onPress={() => onPress(`https://twitter.com/${twitter}`)}
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
