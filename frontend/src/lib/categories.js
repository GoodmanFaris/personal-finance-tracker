import api from "./api";

export async function getCategory(id) {
  const response = await api.get(`/category/${id}`);
  return response.data;
}

export async function listCategoriesActive() {
  const response = await api.get("/category/list_all/active");
  return response.data;
}

export async function getCategoryByName(name) {
  const response = await api.get(`/category/name/${name}`);
  return response.data;
}

export async function listCategoriesAll() {
  const response = await api.get("/category/list_all/inactive/active");
  return response.data;
}

export async function createCategory(data) {
  const response = await api.post("/category/", data);
  return response.data;
}

export async function updateCategory(id, data) {
  const response = await api.put(`/category/${id}`, data);
  return response.data;
}

export async function getTotalCategories() {
  const response = await api.get("/category/number/total_active");
  return response.data;
}

export async function restoreCategory(id) {
  const response = await api.post(`/category/${id}/restore/`);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await api.delete(`/category/${id}`);
  return response.data;
}


