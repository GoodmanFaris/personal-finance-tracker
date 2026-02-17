import api from "./api";

export async function getExpensesByCategory(startDate, endDate) {
    const response = await api.get(`/summary/get_expenses_by_category?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
}

export async function getTotalExpenses(startDate, endDate) {
    const response = await api.get(`/summary/get_total_expenses?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
}

export async function getTotalTransactions(startDate, endDate) {
    const response = await api.get(`/summary/get_total_transactions?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
}

export async function getTotalIncome(startDate, endDate) {
    const response = await api.get(`/summary/get_total_income?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
}



