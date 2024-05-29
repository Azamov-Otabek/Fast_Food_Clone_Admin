import {create} from "zustand"
import axios from "axios"
const baseURL = "https://app.rarebek.uz/v1"
export const useAuthStore = create((set) => ({ 
    RegisterOwner: async(payload)=> {
        try {
          const response = axios.post(`${baseURL}/register`, payload)
          return response
        } catch (error) {
            console.log(error);
        }
    },
    VerifyOwner: async(email, code)=> {
        try {
          const response = axios.get(`${baseURL}/verification?email=${email}&code=${code}`)
          return response
        } catch (error) {
            console.log(error);
            return error
        }
    },
    LoginOwner: async(payload)=> {
        try {
          const response = axios.get(`${baseURL}/login?email=${payload?.email}&password=${payload?.password}`)
          return response
        } catch (err) {
            console.error(err);
            return err
        }
    },
 }))