import api from "./api";

export const getExpensesByCategory = async (startDate, endDate) => {
    api.get(`/summary/expenses-by-category?start_date=${startDate}&end_date=${endDate}`)
        .then(res => res.data);
}

export const getTotalExpenses = async (startDate, endDate) => {
    api.get(`/summary/total-expenses?start_date=${startDate}&end_date=${endDate}`)
        .then(res => res.data);
}
