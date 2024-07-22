import { User } from "@/types/User";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const placeholderImage = require("../assets/images/avatar.png");

interface ListItemProps {
  item: User;
  onPressItem: () => void;
}

export const ListItem = ({ item, onPressItem }: ListItemProps) => {
  const { first_name, last_name, backgroundColor, avatar, email } = item;

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor ? backgroundColor : "white",
          },
        ]}
      >
        <Image
          style={styles.avatar}
          source={{
            uri: avatar || Image.resolveAssetSource(placeholderImage).uri,
          }}
        />
        <View style={styles.textContainer}>
          <Text>
            {first_name} {last_name}
          </Text>
          <Text>{email}</Text>
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
