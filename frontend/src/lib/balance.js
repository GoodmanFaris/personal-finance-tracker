import api from "./api";

export async function getBalance() {
  const response = await api.get("/balance/");
  return response.data;
}

export async function getBalanceByMonth(month) {
  const response = await api.get(`/balance/month/${month}/`);
  return response.data;
}

export async function createBalance(balanceData) {
  const response = await api.post("/balance/", balanceData);
  return response.data;
}

export async function listAllBalances() {
  const response = await api.get("/balance/all/");
  return response.data;
}

export async function updateBalance(balanceId, balanceData) {
  const response = await api.put(`/balance/${balanceId}/`, balanceData);
  return response.data;
}

export async function deleteBalance(balanceId) {
  const response = await api.delete(`/balance/${balanceId}/`);
  return response.data;
}