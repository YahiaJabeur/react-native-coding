import { User } from "@/types/User";
import axios from "axios";

const USERS_PAGE_LIST_URL =
  "https://gist.githubusercontent.com/dsandin/c8ed6c5a9486f311f4725f221b912220/raw/8c6d2d8e1f339d02e0ff3d2990560a4862c4beae/users_page_list";

const api = axios.create();

export const getUsersPageList = async () => {
  const { data } = await api.get<{ pages: string[] }>(USERS_PAGE_LIST_URL);
  return data;
};

export const getUsersPage = async (usersPageUrl: string) => {
  const { data } = await api.get<User[]>(usersPageUrl);
  return data;
};
