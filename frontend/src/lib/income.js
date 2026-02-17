import api from "./api";

export async function getIncomes() {
  const response = await api.get("/income/");
  return response.data;
}

export async function getIncomesByMonth(month) {
  const response = await api.get(`/income/month/${month}`);
  return response.data;
}

export async function listByTimePeriod(startDate, endDate) {
  const response = await api.get(`/income/period?start_date=${startDate}&end_date=${endDate}`);
  return response.data;
}

export async function createIncome(data) {
  const response = await api.post("/income/", data);
  return response.data;
}

export async function updateIncome(id, data) {
  const response = await api.put(`/income/${id}`, data);
  return response.data;
}

export async function updateIncomesByMonth(month, data) {
  const response = await api.put(`/income/${month}`, data);
  return response.data;
}

export async function deleteIncome(id) {
  const response = await api.delete(`/income/${id}`);
  return response.data;
}

