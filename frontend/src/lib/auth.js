import api from "./api";

export async function registerUser({ name, email, password }) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data; 
}

export async function loginUser({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; 
}

export async function fetchMe() {
  const res = await api.get("/auth/me");
  return res.data; 
}

export async function logoutUser() {
  await api.post("/auth/logout");
}
