import { GridItem } from "@/components/GridItem";
import { ListItem } from "@/components/ListItem";
import { User } from "@/types/User";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItem,
} from "react-native";

const data = require("../assets/MOCK_DATA.json");

const Question1 = () => {
  const onPressItem = () => {
    console.log("open item");
  };

  const [isGrid, setIsGrid] = useState(true);
  const [isDescending, setDescending] = useState(false);
  const [avatarFilter, setAvatarFilter] = useState(false);

  const users: User[] = useMemo(() => {
    let users = data as User[];
    if (avatarFilter)
      users = users.filter((user) => user.avatar_large !== null);

    if (isDescending)
      users.sort((a, b) => b.first_name.localeCompare(a.first_name));
    else users.sort((a, b) => a.first_name.localeCompare(b.first_name));

    return users;
  }, [isDescending, avatarFilter]);

  const renderItem: ListRenderItem<User> = ({ item }) => {
    return isGrid ? (
      <GridItem item={item} onPressItem={onPressItem} />
    ) : (
      <ListItem item={item} onPressItem={onPressItem} />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              paddingTop: 20,
              paddingLeft: 10,
            }}
          >
            User List
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* // Grid mode */}
            <TouchableOpacity onPress={() => setIsGrid(true)}>
              <Image
                style={{ width: 30, height: 10 }}
                source={require("../assets/images/grid.png")}
              />
            </TouchableOpacity>
            {/* // List mode */}
            <TouchableOpacity onPress={() => setIsGrid(false)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/list.png")}
              />
            </TouchableOpacity>
            {/* // Sort last Name A-Z */}
            <TouchableOpacity onPress={() => setDescending(false)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/sort_az.png")}
              />
            </TouchableOpacity>
            {/* // Sort last Name Z-A */}
            <TouchableOpacity onPress={() => setDescending(true)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/sort_za.png")}
              />
            </TouchableOpacity>
            {/* // Only show elements that have large avatars */}
            <TouchableOpacity onPress={() => setAvatarFilter(!avatarFilter)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/avatar.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          key={isGrid ? "grid" : "list"}
          numColumns={isGrid ? 2 : 1}
          contentContainerStyle={styles.list}
          data={users}
          renderItem={renderItem}
          keyExtractor={({ id }) => id}
        />
      </SafeAreaView>
    </View>
  );
};

export default Question1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  list: {
    justifyContent: "center",
  },
});
