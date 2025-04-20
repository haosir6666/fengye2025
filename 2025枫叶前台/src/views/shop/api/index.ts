import { request } from "@/utils";
import type { ResponseData, PageParams, PageUserParams } from "./types";

const api = {
  getShopList: (params: PageParams): Promise<ResponseData<boolean>> =>
    request.get(`/trade/queryPageFront`, {
      params,
    }),
  //查询自己上架的商品
  getUserShopList: (params: PageUserParams): Promise<ResponseData<boolean>> =>
    request.get(`/trade/queryPageFront`, {
      params,
    }),
  //自主下架
  RemovedShop: (id: number): Promise<ResponseData<boolean>> =>
    request.get(`/trade/independence/${id}`),

  getShopRole: (): Promise<ResponseData<boolean>> =>
    request.get(`/trade/rule/loadRule`),
    //查询商品属性
    getShopItemInfo: (id: number): Promise<ResponseData<boolean>> =>
    request.get(`/trade/getEquipDetails/${id}`),

    //购买物品
    buyShopItem: (id: number): Promise<ResponseData<boolean>> =>
    request.post(`/trade/buy?id=${id}`),

};

export default api;
