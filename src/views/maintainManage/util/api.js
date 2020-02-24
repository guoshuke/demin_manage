import axios from 'axios'
import { getFn, postFn } from '../../../util/baseApi'
import {Message, Loading} from 'element-ui'
import store from '../store'
import * as CONST from '../util/const'

let base = window.context;
// post 新增  get 拉取  put  delete 删除 patch 更新
// 添加有ajax请求就显示模态框
let loadingInstance = null
let getToken = () => {
  return (localStorage.getItem('INDUSTRIAL_CARRIER') || '')
  // return ('Bearer ' + sessionStorage.getItem('INDUSTRIAL_CARRIER') || '')
}
let toLogin = () => {
  window.location.href = `${CONST.TOLOGIN}?next=${encodeURIComponent(window.location.href)}`
}

// 打开loading
let openLoading = () => {
  let option = {
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.5)'
  }
  loadingInstance = Loading.service(option)
}

// 关闭loading
let closeLoading = () => {
  loadingInstance.close()
}

axios.interceptors.request.use(config => {
  openLoading()
  const token = getToken()
  if (token) {
    config.headers.Authorization = token // 请求头添加token
  }
  // console.log("config",config)
  return config
}, err => {
  closeLoading()
  Message.error({message: '请求超时!'})
  return Promise.reject(err)
})

axios.interceptors.response.use(data => {
  console.log("data",data)
  closeLoading()
  // if(data.code == 501) {
  //   Message.error({message: data.message})
  // }
  return data
}, err => {
  // alert('走这里')
  /*
    200  成功
    400  请求失败，附上请求失败原因
    401  没有权限
    402  token过期，或无效token
    404  接口不存在
    500  内部程序错误， 抛出异常截获。 */
  closeLoading()
  console.log('err:', err)
  // if (err.response.status == 504 || err.response.status == 404) {
  //   Message.error({message: '接口不存在⊙﹏⊙∥'})
  // } else if (err.response.status == 401) {
  //   localStorage.clear()
  //   toLogin();
  //   Message.error({message: '权限不足,请联系管理员!'})
  // } else if (err.response.status == 404) {
  //   Message.error({message: '接口不存在'})
  // } else if (err.response.status == 500) {
  //   Message.error({message: '服务器错误!'})
  // } else {
  //   Message.error({message: '未知错误!'})
  // }
  return Promise.resolve(err)
})

export default {
  getAllList: params => getFn(`${base}mall/Surface/all`, params), // 获取列表内容
  addressList: params => getFn(`${base}mall/pay/getAddress/${params}`), // 获取地址列表
  getHelpers: params => getFn(`${base}mall/Helper/getHelpers/${params}`), // 获取地址列表
  getfilterList: params => postFn(`${base}mall/Surface/oneByAll`,params), // 列表筛选
}
