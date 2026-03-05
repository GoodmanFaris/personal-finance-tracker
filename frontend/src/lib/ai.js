import api from "./api";

export async function getAISummary(startMonth, endMonth) {
  const response = await api.get("/ai/insight", {
    params: { start_month: startMonth, end_month: endMonth },
  });
  return response.data;
}