import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

export const useCategoryStore = create((set) => ({
  getCategory: async () => {
    try {
      let payload = {
        limit: 99,
        owner_id: (localStorage.getItem("owner_id")),
        page: 1,
      };
      console.log(payload)
      const response = axiosClient.post(`/category/getall`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addCategory: async (payload) => {
    try {
      const response = axiosClient.post(`/category/create`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateCategory: async (payload) => {
    try {
      const response = axiosClient.put(`/category/update`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = axiosClient.delete(`/category/delete/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));
