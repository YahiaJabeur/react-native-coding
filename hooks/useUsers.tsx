import { User } from "@/types/User";
import { useMemo } from "react";

const useUsers = (
  usersList: User[],
  isDescending: boolean,
  avatarFilter: boolean,
) => {
  const users: User[] = useMemo(() => {
    if (!usersList) return [];

    let filteredUsers = usersList as User[];

    // Apply avatar filter
    if (avatarFilter) {
      filteredUsers = filteredUsers.filter(
        (user) => user.avatar_large !== null,
      );
    }

    // Sort users by last_name, placing null or undefined at the end
    filteredUsers.sort((a, b) => {
      const lastNameA = a.last_name || "";
      const lastNameB = b.last_name || "";

      if (lastNameA === "" && lastNameB === "") return 0;
      if (lastNameA === "") return 1;
      if (lastNameB === "") return -1;

      return isDescending
        ? lastNameB.localeCompare(lastNameA)
        : lastNameA.localeCompare(lastNameB);
    });

    return filteredUsers;
  }, [isDescending, avatarFilter, usersList]);

  return users;
};

export default useUsers;
