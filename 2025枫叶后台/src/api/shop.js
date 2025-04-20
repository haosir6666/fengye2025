import request from '@/utils/request'


//获取商拼搏列表
export function getShopList(data) {
    return request({
        url: '/trade/queryPage',
        method: 'get',
        params:{
            pageNo: data.pageNo,
            pageSize: data.pageSize,
            itemType: data.itemType===10086?'':data.itemType,
            itemId: data.itemId,
            itemName: data.itemName,
            amountType: data.amountType===10086?'':data.amountType,
            tradeType: data.tradeType===10086?'':data.tradeType,
            createTimeOrder: data.createTimeOrder,
        }
    })
}

//下架
export function offShelf(id) {
    return request({
        url: '/trade/compulsoryRejection',
        method: 'post',
        params: {
            id
        }
    })
}
//审核商品
export function audit(id,type) {
    return request({
        url: '/trade/examine',
        method: 'post',
        params: {
            id,
            type
        }
    })
}
//查询交易规则
export function queryTradeRule() {
    return request({
        url: '/trade/rule/loadRule',
        method: 'get'
    })
}
//修改交易规则
export function updateTradeRule(cashLimit,bondsLimit,pointLimit,shelvesCommission,appointCommission) {
    return request({
        url: '/trade/rule/updateRule',
        method: 'post',
        data:{
            cashLimit,
            bondsLimit,
            pointLimit,
            shelvesCommission,
            appointCommission
        }
    })
}
