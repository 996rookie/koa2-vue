import axios from 'axios'

function request(config) {
  const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/ebee76cda93cd71e6dd2a0bb9963eef2/home',
    timeout: 3000
  })
  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    return response.data.data
  })
  return instance(config)
}

//商场首页所有信息接口
export function getHomeMultidata() {
  return request({
    url: '/index'
  })
}