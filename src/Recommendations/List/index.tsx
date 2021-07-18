import React, { useCallback, useRef } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";

import { Item } from "./Item";
import { Recommendation } from "../../index";

type Props = {
  listData: Recommendation[];
  onItemPress: (data: Recommendation) => void;
};

export const RecommendationList = React.memo(
  ({ listData, onItemPress }: Props) => {
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(
      ({ item, index }: { item: Recommendation; index: number }) => (
        <View style={{ marginTop: 30 }}>
          <Item
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
          />
        </SafeAreaView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  contents: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
