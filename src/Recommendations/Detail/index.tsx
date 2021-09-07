import React, { useRef, useCallback } from "react";
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
  BottomButton?: React.FC;
};

export const RecommendationDetail = React.memo(
  ({ data, BottomButton }: Props) => {
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

    const renderText = useCallback((text: string) => {
      return text.split(/(\s)/g).map((item, i) => {
        if (/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-]+/gm.test(item)) {
          return (
            <Text key={i} style={{ color: "#00376b" }}>
              {item}
            </Text>
          );
        } else {
          return item;
        }
      });
    }, []);

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
            <Text style={styles.text}>{renderText(data.text)}</Text>
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
          {BottomButton && <BottomButton />}
        </ScrollView>
      </View>
    );
  }
);

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
    position: "absolute",
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
