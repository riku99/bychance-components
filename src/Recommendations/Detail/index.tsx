import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

import { Images } from "./Images";
import { SocialIcons } from "./SocialIcons";
import { Map } from "./Map";
import { Recommendation } from "../../index";

type Props = {
  data: Recommendation;
};

export const RecommendationDetail = React.memo(({ data }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Images images={data.images} />
      </View>
      <View style={styles.introContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.imageAndNameContainer}>
          <Avatar
            source={{
              uri: data.avatar ? data.avatar : undefined,
            }}
            rounded
          />
          <Text style={styles.name}>{data.name}</Text>
        </View>
        <Text style={styles.text}>{data.text}</Text>
        <TouchableOpacity activeOpacity={1}>
          <Text style={styles.url}>{data.url}</Text>
        </TouchableOpacity>
        <View style={styles.socialIcons}>
          <SocialIcons
            instagram={data.instagram}
            twitter={data.twitter}
            iconWidth={35}
            iconHeight={35}
            iconSize={19}
          />
        </View>
        {data.address && <Text style={styles.address}>{data.address}</Text>}
        {data.lat && data.lng && (
          <View style={styles.mapContainer}>
            <Map lat={data.lat} lng={data.lng} />
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  imagesContainer: {
    height: 250,
    width: "100%",
  },
  introContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  imageAndNameContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    marginLeft: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  text: {
    marginTop: 20,
  },
  url: {
    marginTop: 15,
    textDecorationLine: "underline",
    color: "#52b1fa",
  },
  socialIcons: {
    marginTop: 18,
    width: 120,
  },
  address: {
    marginTop: 25,
    color: "gray",
  },
  mapContainer: {
    backgroundColor: "gray",
    width: "100%",
    height: 200,
    marginTop: 5,
  },
});
