import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-elements";

import { Images } from "./Images";
import { SocialIcons } from "./SocialIcons";
import { Map } from "./Map";
import { Recommendation } from "../../index";
import { goLink } from "../../utils";

type Props = {
  data: Recommendation;
};

export const RecommendationDetail = React.memo(({ data }: Props) => {
  const onUrlPress = () => {
    if (data.url) {
      goLink(data.url);
    }
  };

  const imageScale = useRef(new Animated.Value(1)).current;
  const imageY = useRef(new Animated.Value(0)).current;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const value = e.nativeEvent.contentOffset.y;
    if (value < 0) {
      imageScale.setValue(1 + -value / 130);
      imageY.setValue(0);
    }
    if (value >= 0) {
      imageY.setValue(-value);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imagesContainer,
          { transform: [{ scale: imageScale }, { translateY: imageY }] },
        ]}
      >
        <Images images={data.images} />
      </Animated.View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
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
          <TouchableOpacity activeOpacity={1} onPress={onUrlPress}>
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
      </ScrollView>
    </View>
  );
});

const { width } = Dimensions.get("screen");
const imageHeight = (width / 3) * 2;
const paddingTop = imageHeight + 30;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  imagesContainer: {
    height: imageHeight,
    width: "100%",
    zIndex: 1,
  },
  introContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop,
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
