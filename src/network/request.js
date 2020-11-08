import axios from 'axios'

export function request(config) {
  // 配置新建一个 axios 实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
  })
  // 发送真正的网络请求
  return instance(config)
}