import api from "./api";

export const getCategory = (id) =>
  api.get(`/category/${id}`).then(res => res.data);

export const listCategoriesActive = () =>
  api.get("/category/list_all/active").then(res => res.data);

export const getCategoryByName = (name) =>
  api.get(`/category/name/${name}`).then(res => res.data);

export const listCategoriesAll = () =>
  api.get("/category/list/inactive/active").then(res => res.data);

export const createCategory = (data) =>
  api.post("/category/", data);

export const updateCategory = (id, data) =>
  api.put(`/category/${id}`, data);

export const restoreCategory = (id) =>
  api.post(`/category/${id}/restore/`);

export const deleteCategory = (id) =>
  api.delete(`/category/${id}`);









