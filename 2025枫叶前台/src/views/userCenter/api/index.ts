import { request } from "@/utils";
import type {
  RegisterData,
  ResponseData,
  PageParams,
  PageResult,
  InviteRecord,
  SponsorRecord,
  RebatePageResult,
  WithdrawRecord,
} from "./types";

const api = {
  register: (data: RegisterData): Promise<ResponseData<void>> =>
    request.post("/user/register", data),

  readInviteList: (
    params: PageParams
  ): Promise<ResponseData<PageResult<InviteRecord>>> =>
    request.get("/invite/queryPage", { params }),

  weChat: (amount: number): Promise<ResponseData<string>> =>
    request.post("/pay/weChat/?amount=" + amount),

  aliPay: (amount: number): Promise<ResponseData<string>> =>
    request.post("/pay/aliPay/?amount=" + amount),

  payOrderOn: (orderOn: string): Promise<ResponseData<boolean>> =>
    request.get(`/pay/payOrderOn/${orderOn}`),

  readSponsorList: (
    params: PageParams
  ): Promise<ResponseData<PageResult<SponsorRecord>>> =>
    request.get("/pay/queryPage", { params }),

  readRebatesList: (
    params: PageParams
  ): Promise<ResponseData<RebatePageResult>> =>
    request.get("/invite/rebate/queryPageInvitePay", {
      params,
      needTip: false,
    }),

  readWithdrawList: (
    params: PageParams
  ): Promise<ResponseData<PageResult<WithdrawRecord>>> =>
    request.get("/invite/rebateLog/queryPage", { params }),

  submitWithdraw: (data: { amount: number }): Promise<ResponseData<void>> =>
    request.post(`/invite/rebate/submit?amount=${data.amount}`),

  /**
   * 查询自己的返利金额信息
   * @returns
   */
  readRebatesNum: (): Promise<ResponseData> =>
    request.get("/invite/rebate/loadInvitePay"),
  //查询用户资金
  readUserMoney: (): Promise<ResponseData> =>
    request.get("/fund/getFundByUserId"),
  //查询商品
  getShopList: (params: any): Promise<ResponseData<any>> =>
    request.get(`/trade/queryPageUser`, {
      params,
    }),
  //下架商品
  deleteShop: (id: number): Promise<ResponseData<any>> =>
    request.post(`/trade/independence?id=${id}`),
  //取回资金
  withdraw: (moneyType: number, amount: number): Promise<ResponseData<any>> =>
    request.post(
      `/fund/return/returnFund?moneyType=${moneyType}&amount=${amount}`
    ),
};

export default api;
