import http from '../config/http'
const baseUrl = 'http://118.178.195.130:8090/app/mock/31'
/**
 * 促销活动-商品列表
 * @param params
 */
export const getList = (params) => {
  return http(`${baseUrl}/store/v1/promotions`, {params})
}
/**
 * 促销活动-买家相册
 * @param params
 */
export const getCustomerGallery = (params) => {
  return http(`${baseUrl}/store/v1/promotions/customer-gallery`, {params})
}
/**
 * 店主管理端——商品列表
 * @param params
 */
export const getManagerGoodsList = (params) => {
  return http(`${baseUrl}/store-admin/v1/promotion/gallery`, { params })
}
/**
 * 店主管理端——商品上下架
 * @param {*} params 
 */
export const managerGoodsOpr = (params) => {
  return http(`${baseUrl}/store-admin/v1/promotion/:promotion_id/:price_id/status`, { 
    method: 'post',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: params,
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }]
   })
}
