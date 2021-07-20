import React, { useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";

import { RecommendationItem } from "../Item";
import { Recommendation } from "../../index";

type Props = {
  listData: Recommendation[];
  onItemPress: (data: Recommendation) => void;
  refreshControl?: React.ReactElement;
};

export const RecommendationList = React.memo(
  ({ listData, onItemPress, refreshControl }: Props) => {
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(
      ({ item, index }: { item: Recommendation; index: number }) => (
        <View style={{ marginTop: 30 }}>
          <RecommendationItem
            key={item.id}
            item={item}
            onItemPress={() => onItemPress(item)}
          />
        </View>
      ),
      []
    );

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            ref={flatListRef}
            data={listData}
            renderItem={renderItem}
            contentContainerStyle={styles.contents}
            scrollEnabled
            initialNumToRender={3}
            windowSize={8}
            maxToRenderPerBatch={4}
            refreshControl={refreshControl ? refreshControl : undefined}
          />
        </SafeAreaView>
      </View>
    );
  }
);

const { width } = Dimensions.get("screen");

const paddingHorizontal = 10;
export const itemWidth = width - paddingHorizontal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  contents: {
    paddingBottom: 20,
    paddingHorizontal,
  },
});
