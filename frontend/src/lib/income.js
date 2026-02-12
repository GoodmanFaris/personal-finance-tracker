import api from "./api";

export const getIncomes = () =>
    api.get(`/income/${id}`).then(res => res.data);

export const getIncomesByMonth = (month) =>
  api.get(`/income/month/${month}`).then((res) => res.data);

export const listByTimePeriod = (startDate, endDate) =>
    api.get(`/income/period?start_date=${startDate}&end_date=${endDate}`).then(res => res.data);

export const createIncome = (data) =>
    api.post("/income/", data);

export const updateIncome = (id, data) =>
    api.put(`/income/${id}`, data);

export const updateIncomesByMonth = (month, data) =>
    api.put(`/income/${month}`, data);

export const deleteIncome = (id) =>
    api.delete(`/income/${id}`);








