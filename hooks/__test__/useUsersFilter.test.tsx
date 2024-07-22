import { User } from "@/types/User";
import { renderHook } from "@testing-library/react-hooks";
import { useUsersFilter } from "../useUsersFilter";

const mockUsers: User[] = [
  {
    id: "1",
    first_name: "Alice",
    last_name: "Smith",
    text: "Text 1",
    email: "alice@example.com",
    backgroundColor: "#ffffff",
    avatar: "https://example.com/avatar1.png",
    avatar_large: "https://example.com/avatar_large1.png",
  },
  {
    id: "2",
    first_name: "Bob",
    last_name: null,
    text: "Text 2",
    email: "bob@example.com",
    backgroundColor: "#000000",
    avatar: "https://example.com/avatar2.png",
    avatar_large: null,
  },
  {
    id: "3",
    first_name: "Charlie",
    last_name: "Doe",
    text: "Text 3",
    email: "charlie@example.com",
    backgroundColor: "#123456",
    avatar: "https://example.com/avatar3.png",
    avatar_large: "https://example.com/avatar_large3.png",
  },
  {
    id: "4",
    first_name: "David",
    last_name: "Brown",
    text: "Text 4",
    email: "david@example.com",
    backgroundColor: "#654321",
    avatar: "https://example.com/avatar4.png",
    avatar_large: "https://example.com/avatar_large4.png",
  },
];

describe("useUsersFilter", () => {
  test("returns an empty array when usersList is null or undefined", () => {
    const { result } = renderHook(() => useUsersFilter(undefined, true, false));
    expect(result.current).toEqual([]);
  });

  test("filters out users without large avatars when avatarFilter is true", () => {
    const { result } = renderHook(() => useUsersFilter(mockUsers, false, true));
    expect(result.current.length).toBe(3);
    expect(result.current.every((user) => user.avatar_large !== null)).toBe(
      true,
    );
  });

  test("sorts users in descending order by last_name", () => {
    const { result } = renderHook(() => useUsersFilter(mockUsers, true, false));
    expect(result.current.map((user) => user.last_name)).toEqual([
      "Smith",
      "Doe",
      "Brown",
      null,
    ]);
  });

  test("sorts users in ascending order by last_name", () => {
    const { result } = renderHook(() =>
      useUsersFilter(mockUsers, false, false),
    );
    expect(result.current.map((user) => user.last_name)).toEqual([
      "Brown",
      "Doe",
      "Smith",
      null,
    ]);
  });

  test("places users with null last_name at the end when sorting", () => {
    const { result } = renderHook(() =>
      useUsersFilter(mockUsers, false, false),
    );
    const lastUser = result.current[result.current.length - 1];
    expect(lastUser.last_name).toBeNull();
  });

  test("handles empty usersList correctly", () => {
    const { result } = renderHook(() => useUsersFilter([], true, false));
    expect(result.current).toEqual([]);
  });
});
