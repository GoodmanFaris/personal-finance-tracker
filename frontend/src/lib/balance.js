import api from "./api";

export const getBalance = () => api.get("/balance/").then((res) => res.data);

export const getBalanceByMonth = (month) =>
  api.get(`/balance/month/${month}/`).then((res) => res.data);

export const createBalance = (balanceData) =>
  api.post("/balance/", balanceData).then((res) => res.data);

export const listAllBalances = () => api.get("/balance/all/").then((res) => res.data);

export const updateBalance = (balanceId, balanceData) =>
  api.put(`/balance/${balanceId}/`, balanceData).then((res) => res.data);

export const deleteBalance = (balanceId) =>
  api.delete(`/balance/${balanceId}/`).then((res) => res.data);