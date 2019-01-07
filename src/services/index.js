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
