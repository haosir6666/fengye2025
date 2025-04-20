import request from '@/utils/request'


export function loginApi(data) {
    return request({
        url: '/sys/login/user',
        method: 'post',
        data
    })
}

export function  getUserInfoApi() {
    return request({
        url: '/sys/user/loadUserInfo',
        method: 'get'
    })
}
