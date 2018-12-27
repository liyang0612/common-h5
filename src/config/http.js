import axios from 'axios';
import qs from 'qs'
import { Toast } from 'antd-mobile';
import { apiCfg } from './index'

const instance = axios.create({
  timeout: 30000,
  baseURL: /* '/', */apiCfg,

  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    //'Authorization': access_token,
    // 'X-Requested-With': 'XMLHttpRequest'
  },

  transformRequest: [function (data, headers) {
    // console.log(arguments)
    return qs.stringify(data);
  }]
})

// 解决axios实例不存在all和spread方法
instance.all = axios.all
instance.spread = axios.spread

instance.interceptors.request.use(config => {
  Toast.loading('Loading...', 0);
  return config
}, error => {
  return Promise.reject(error)
})


instance.interceptors.response.use(res => {
  Toast.hide()
  if(res.data && typeof res.data === 'string' && res.config.responseType !== 'text'){
    document.documentElement.innerHTML = res.data;
  }
  if(res.data && res.data.code >= 400){
    const { msg, message } = res.data;
    if(typeof msg === 'string' || typeof message === 'string'){
      Toast.info(msg || message);
    }
  }
  return res.data
}, error => {
  const { response = {} } = error
  const { data, status } = response;

  if(status === 400 && data.error && data.error.redirect_url){
    window.location.href = data.error.redirect_url;
  }

  if(data && data.error && data.error.message){
    Toast.fail(data.error.message, 3)
  }

  Toast.hide()
  return Promise.reject(error)
})

export default instance