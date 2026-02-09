import api from "./api";

export const getTransaction = (id) =>
  api.get(`/transaction/${id}`).then(res => res.data);

export const listTransactions = () =>
  api.get("/transaction/list/").then(res => res.data);

export const createTransaction = (data) =>
  api.post("/transaction/", data);

export const updateTransaction = (id, data) =>
  api.put(`/transaction/${id}`, data);

export const deleteTransaction = (id) =>
  api.delete(`/transaction/${id}`);




