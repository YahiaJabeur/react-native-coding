import { User } from "@/types/User";
import React from "react";
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

const Question1 = () => {
  const onPressItem = () => {
    console.log("open item");
  };

  const renderItem: ListRenderItem<User> = ({ item }) => {
    return (
      <TouchableOpacity onPress={onPressItem}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: item.backgroundColor,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.avatar }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <Text>
              {item.first_name} {item.last_name}
            </Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
            <Image
              style={{ width: 30, height: 10 }}
              source={require("../assets/images/grid.png")}
            />
            {/* // List mode */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/list.png")}
            />
            {/* // Sort last Name A-Z */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/sort_az.png")}
            />
            {/* // Sort last Name Z-A */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/sort_za.png")}
            />
            {/* // Only show elements that have large avatars */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/avatar.png")}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={require("../assets/MOCK_DATA.json")}
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
  bar: {},
});
