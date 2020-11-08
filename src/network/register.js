import { request } from "./request"

// 用户注册接口
export function getRegister(data) {
  return request({
    url: '/user/register',
    method: "post",
    data: data
  })
}