import React, { useCallback, useRef, ComponentProps } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import { RecommendationItem } from "../Item";
import { Recommendation } from "../../index";

type Props = {
  listData: Recommendation[];
  onItemPress: (data: Recommendation) => void;
  refreshControl?: React.ReactElement;
  flatListProps: Omit<
    ComponentProps<typeof FlatList>,
    "data" | "renderItem" | "keyExtractor" | "getItem"
  >;
};

export const RecommendationList = React.memo(
  ({ listData, onItemPress, refreshControl, flatListProps }: Props) => {
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(
      ({ item, index }: { item: Recommendation; index: number }) => (
        <View style={{ marginTop: index === 0 ? 10 : 30 }}>
          <RecommendationItem
            item={item}
            onItemPress={() => onItemPress(item)}
          />
        </View>
      ),
      []
    );

    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={listData}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contents}
          scrollEnabled
          initialNumToRender={3}
          windowSize={8}
          maxToRenderPerBatch={4}
          refreshControl={refreshControl ? refreshControl : undefined}
          {...flatListProps}
        />
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
