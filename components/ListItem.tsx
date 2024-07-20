import { User } from "@/types/User";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface ListItemProps {
  item: User;
  onPressItem: () => void;
}

export const ListItem = ({ item, onPressItem }: ListItemProps) => {
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View
        style={[styles.container, { backgroundColor: item.backgroundColor }]}
      >
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.textContainer}>
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
  container: {
    flex: 1,
    flexDirection: "row",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
});
