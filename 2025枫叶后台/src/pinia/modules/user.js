import router from "@/router/index.js";
import { loginApi,getUserInfoApi } from '@/api/user'
import { ElMessage } from "element-plus";

const useAppStore = defineStore('user', {
    state: () => {
        return {
            token: '',
            userInfo: {},
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        },
        getUserInfo() {
            return this.userInfo
        },
        getToken() {
            return this.token
        },
        clearUserInfo() {
            this.userInfo = {}
        },
        clearToken() {
            this.token = ''
        },
        login(username, password) {
            loginApi({ username, password }).then(res => {
                if (res.code === 200) {
                    this.setToken(res.data.token)
                    getUserInfoApi().then(result => {
                        if (result.code === 200) {
                            this.setUserInfo(result.data)
                            router.push({ name: 'welcome' })
                            ElMessage.success('登录成功')
                        }
                    })

                } else {
                    ElMessage.error(res.message)
                }
            })
        },
        logout() {
            this.clearUserInfo()
            this.clearToken()
            router.push('/login')
        }
    },
    persist: true, // 启用持久化
    localStorage: true, // 使用 localStorage 存储数据
})

export default useAppStore
