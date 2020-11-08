import { request } from './request'

// 用户登录接口
export function getLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}