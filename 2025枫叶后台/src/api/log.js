import request from '@/utils/request'


export function getLoginLog(data) {
    return request({
        url: '/sys/sysLoginLog/list',
        method: 'get',
        data
    })
}

//获取操作日志
export function  getOperationLog(data) {
    return request({
        url: '/sys/sysOperLog/list',
        method: 'get',
        data
    })
}
