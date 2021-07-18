import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar } from "react-native-elements";

import { Images } from "./Images";
import { SocialIcons } from "./SocialIcons";
import { Recommendation } from "../../index";

type Props = {
  item: Recommendation;
  onItemPress: () => void;
};

export const Item = React.memo(({ item, onItemPress }: Props) => {
  return (
    <View style={styles.mainSection}>
      <View style={styles.imagesContainer}>
        <Images images={item.images} />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={onItemPress}>
        <View style={styles.introContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.imageAndNameContainer}>
            <Avatar
              source={{ uri: item.avatar ? item.avatar : undefined }}
              size={33}
              rounded
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.coupon}>{item.coupon && "※クーポンあり!✨"}</Text>
          <View style={styles.distanceAndIconContainer}>
            <Text>{item.distance && item.distance + "m"}</Text>
            <SocialIcons instagram={item.instagram} twitter={item.twitter} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  contents: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  mainSection: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  introContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  imageAndNameContainer: {
    marginTop: 9,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    marginLeft: 9,
  },
  coupon: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
  },
  distanceAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
  },
  imagesContainer: {
    height: 200,
  },
});
