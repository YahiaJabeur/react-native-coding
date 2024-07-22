import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  isGrid: boolean;
  isDescending: boolean;
  avatarFilter: boolean;
  onViewIconPressed: () => void;
  onSortIconPressed: () => void;
  onAvatarIconPressed: () => void;
}
export const Header = ({
  isDescending,
  isGrid,
  avatarFilter,
  onSortIconPressed,
  onAvatarIconPressed,
  onViewIconPressed,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>User List</Text>
      <View style={styles.iconsWrapper}>
        {/* Switch List mode and Grid mode */}
        <TouchableOpacity onPress={onViewIconPressed}>
          <Image
            style={styles.icon}
            source={
              isGrid
                ? require("../assets/images/list.png")
                : require("../assets/images/grid.png")
            }
          />
        </TouchableOpacity>

        {/* Sort Ascending or descending last name Alphabetically */}
        <TouchableOpacity onPress={onSortIconPressed}>
          <Image
            style={styles.icon}
            source={
              isDescending
                ? require("../assets/images/sort_az.png")
                : require("../assets/images/sort_za.png")
            }
          />
        </TouchableOpacity>

        {/* // Only show elements that have large avatars */}
        <TouchableOpacity onPress={onAvatarIconPressed}>
          <Image
            style={[styles.icon, avatarFilter && { opacity: 0.5 }]}
            source={require("../assets/images/avatar.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingLeft: 10,
  },
  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
