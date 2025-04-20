import axios from 'axios'
import { useUserStore, } from "@/pinia";
import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // api的base_url
    timeout: 6000, // 超时响应

})

service.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        config.headers.Authorization = userStore.getToken()
        config.headers["Content-Type"]="application/json"
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 401) {
            ElMessage.error('登录失效，请重新登录')
            useUserStore().logout()
        }
        if(res.code===410){
            ElMessage.error('请先登录')
            useUserStore().logout()
        }
       return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
