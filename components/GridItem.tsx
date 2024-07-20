import { User } from "@/types/User";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface GridItemProps {
  item: User;
  onPressItem: () => void;
}

export const GridItem = ({ item, onPressItem }: GridItemProps) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={styles.item}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.itemText}>
          <Text>
            {item.first_name} {item.last_name}
          </Text>
          <Text>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  item: {
    flex: 1,
    margin: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    // borderRadius: 50,
  },
  itemText: {
    marginTop: 10,
    alignItems: "center",
  },
});
