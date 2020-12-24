import request from '@/utils/request'

//登录
export function login(data) {
  return request({
    url: '/api/account/admin/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/account/admin/login/out',
    method: 'post'
  })
}