import { getUsersPage, getUsersPageList } from "@/api";
import { GridItem } from "@/components/GridItem";
import { ListItem } from "@/components/ListItem";
import { QUERY_KEYS } from "@/constants/queries";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
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

  const [isGrid, setIsGrid] = useState(true);
  const [isDescending, setDescending] = useState(false);
  const [avatarFilter, setAvatarFilter] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [usersList, setUsersList] = useState<User[]>([]);

  const { data: usersPageList } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS_PAGE_LIST],
    queryFn: () => getUsersPageList(),
  });

  const { data: usersPage } = useQuery({
    enabled: usersPageList !== undefined && usersPageList.pages.length > 0,
    queryKey: [
      QUERY_KEYS.GET_USERS_PAGE,
      pageIndex,
      usersPageList,
      usersPageList?.pages[pageIndex],
    ],
    queryFn: () => getUsersPage(usersPageList?.pages[pageIndex] as string),
  });

  useEffect(() => {
    if (usersPage === undefined) return;
    setUsersList((prevUsers) => [...prevUsers, ...usersPage]);
  }, [usersPage]);

  const updatePageIndex = () => {
    if (usersPageList === undefined) return;

    if (pageIndex < usersPageList.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  console.log("usersPageList", usersPageList);
  console.log("usersPage", usersPage);

  const users: User[] = useMemo(() => {
    if (!usersList) return [];

    let users = usersList as User[];
    if (avatarFilter)
      users = users.filter((user) => user.avatar_large !== null);

    if (isDescending)
      users.sort((a, b) => b.first_name.localeCompare(a.first_name));
    else users.sort((a, b) => a.first_name.localeCompare(b.first_name));

    return users;
  }, [isDescending, avatarFilter, usersList]);

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
        <View style={styles.header}>
          <Text style={styles.title}>User List</Text>
          <View style={styles.iconsWrapper}>
            {/* Switch List mode and Grid mode */}
            <TouchableOpacity onPress={() => setIsGrid(!isGrid)}>
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
            <TouchableOpacity onPress={() => setDescending(!isDescending)}>
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
            <TouchableOpacity onPress={() => setAvatarFilter(!avatarFilter)}>
              <Image
                style={[styles.icon, avatarFilter && { opacity: 0.5 }]}
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
          onEndReached={updatePageIndex}
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
  icon: {
    width: 30,
    height: 30,
  },
  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    justifyContent: "center",
  },
});
