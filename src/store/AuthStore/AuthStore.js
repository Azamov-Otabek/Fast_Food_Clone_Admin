import {create} from "zustand"
import axios from "axios"
import {toast} from 'react-toastify'
const baseURL = "https://app.rarebek.uz/v1"
export const useAuthStore = create((set) => ({ 
    RegisterOwner: async(payload)=> {
        try {
          const response = await axios.post(`${baseURL}/register`, payload)
          return response
        } catch (error) {
            toast.error(error.message)
        }
    },
    VerifyOwner: async(email, code)=> {
        try {
          const response = axios.get(`${baseURL}/verification?email=${email}&code=${code}`)
          return response
        } catch (error) {
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