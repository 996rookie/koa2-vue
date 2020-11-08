import { request } from './request'

// 获取商品详情接口
export function getDetail(data) {
  return request({
    url: 'goods/getDetailGoodsInfo',
    method: 'post',
    data:data
  })
}

// 获取商品分类一级分类信息接口
export function getCategoryList() {
  return request({
    url: 'goods/getCategoryList'
  })
}

// 获取商品分类二级分类信息接口
export function getCategorySubList(data) {
  return request({
    url: 'goods/getCategorySubList',
    method: 'post',
    data: data
  })
}

// 获取商品分类二级分类详细信息接口
export function getCategorySubListId(data) {
  return request({
    url: 'goods/getGoodsListByCategorySubId',
    method: 'post',
    data: data
  })
}
