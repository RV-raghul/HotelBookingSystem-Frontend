import config from '../config/config'
import axios from 'axios'
import toast from 'react-hot-toast'

const apiService = axios.create({
    baseURL: config.API_BASE_URL,
    headers:{
        'Content-Type': 'application/json'
    }
})


apiService.interceptors.request.use((config) => {
    if(config.authentication){
        let token = sessionStorage.getItem('token')
        config.headers.Authorization = token ? `Bearer ${token}` : ""
    }
    return config
},(error) =>{
    return Promise.reject(error.response.data)
})


apiService.interceptors.response.use((response)=>{
    return response.data
},(error) => {
    if(error?.status == 401 && window.location.pathname !== "/success"){
        toast.error(error?.response?.data?.message || error.message || "Something went Wrong! Try again later")
        sessionStorage.clear()

        setTimeout(() => {
            window.location.href = config.BASE_URL
        })
    }  
        else if (error?.response?.status === 400) {
            throw error
        }
        return Promise.reject(error.response?.data || error);
    })




export default apiService