import { getUsersPage, getUsersPageList } from "@/api";
import { GridItem } from "@/components/GridItem";
import { Header } from "@/components/Header";
import { ListItem } from "@/components/ListItem";
import { QUERY_KEYS } from "@/constants/queries";
import { useUsersFilter } from "@/hooks/useUsersFilter";
import { User } from "@/types/User";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const Question1 = () => {
  const onPressItem = () => {
    console.log("open item");
  };

  const [isGrid, setIsGrid] = useState(true);
  const [isDescending, setDescending] = useState(false);
  const [avatarFilter, setAvatarFilter] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const { data: usersPageList } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS_PAGE_LIST],
    queryFn: () => getUsersPageList(),
  });

  const pageUrl = useMemo(
    () => usersPageList?.pages[pageIndex],
    [usersPageList, pageIndex],
  );

  const { data: usersPage } = useQuery({
    enabled: usersPageList !== undefined && usersPageList.pages.length > 0,
    placeholderData: keepPreviousData,
    queryKey: [QUERY_KEYS.GET_USERS_PAGE, pageIndex, , pageUrl],
    queryFn: () => getUsersPage(pageUrl as string),
  });

  const users = useUsersFilter(usersPage, isDescending, avatarFilter);

  const updatePageIndex = () => {
    if (usersPageList === undefined) return;

    if (pageIndex < usersPageList.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

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
        <Header
          isDescending={isDescending}
          isGrid={isGrid}
          avatarFilter={avatarFilter}
          onAvatarIconPressed={() => setAvatarFilter(!avatarFilter)}
          onSortIconPressed={() => setDescending(!isDescending)}
          onViewIconPressed={() => setIsGrid(!isGrid)}
        />
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
  list: {
    justifyContent: "center",
  },
});
