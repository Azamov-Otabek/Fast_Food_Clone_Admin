import {create} from "zustand"
import axiosClient from "../../plugins/axiosClient"

export const useWorkerStore = create((set) => ({ 
    workers: [],
    getWorkers: async()=> {
        try {
          const owner_id = localStorage.getItem("owner_id")
          const response = axiosClient.get(`/workers/get/1/99/${owner_id}`)
          set({workers: response?.data?.all_workers})
          return response
        } catch (error) {
            console.log(error);
        }
    },
    postWorker: async(payload)=> {
        try {
          const response = axiosClient.post(`/worker/create`, payload)
          return response
        } catch (error) {
            console.log(error);
        }
    },
    updateWorker: async(payload)=> {
        try {
          const response = axiosClient.put(`/worker/update`, payload)
          return response
        } catch (error) {
            console.log(error);
        }
    },
    deleteWorker: async(id)=> {
        try {
          const response = axiosClient.delete(`/worker/delete/${id}`)
          return response
        } catch (error) {
            console.log(error);
        }
    },
    
 }))