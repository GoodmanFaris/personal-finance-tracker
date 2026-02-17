import api from "./api";

export async function fetchMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function updateUser(UserUpdateData) {
  const res = await api.put("/auth/me", UserUpdateData);
  return res.data;
}