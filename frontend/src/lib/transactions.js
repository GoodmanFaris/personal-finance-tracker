import api from "./api";

export async function getTransaction(id) {
  const response = await api.get(`/transaction/${id}`);
  return response.data;
}

export async function listTransactions() {
  const response = await api.get("/transaction/list/");
  return response.data;
}

export async function listTransactionsByCategory(categoryId) {
  const response = await api.get(`/transaction/list-by-category/${categoryId}`);
  return response.data;
}

export async function createTransaction(data) {
  const response = await api.post("/transaction/", data);
  return response.data;
}

export async function updateTransaction(id, data) {
  const response = await api.put(`/transaction/${id}`, data);
  return response.data;
}

export async function deleteTransaction(id) {
  const response = await api.delete(`/transaction/${id}`);
  return response.data;
}




