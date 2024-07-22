import { User } from "@/types/User";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface GridItemProps {
  item: User;
  onPressItem: () => void;
}

const placeholderImage = require("../assets/images/avatar.png");

export const GridItem = ({ item, onPressItem }: GridItemProps) => {
  const { first_name, last_name, backgroundColor, avatar, email } = item;

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[
        styles.container,
        { backgroundColor: backgroundColor ? backgroundColor : "white" },
      ]}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: avatar || Image.resolveAssetSource(placeholderImage).uri,
        }}
      />
      <View style={styles.itemText}>
        <Text>
          {first_name} {last_name}
        </Text>
        <Text>{email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemText: {
    marginTop: 10,
    alignItems: "center",
  },
});
