/*
 * 对axios的封装
 */
import Vue from 'vue';
import axios from 'axios'
// import envConfig from '../../env.json'
// import QS from 'qs'
import { showLoading, hideLoading, BASEURL } from '../../util/index.js'
import { Dialog } from 'vant'
Vue.use(Dialog)
// const BASEURL =  isDev() ? '/api/' : envConfig['env']['dev']
// const BASEURL =  envConfig['env']['dev']
console.log( BASEURL,'===baseurl===')
function getYMDHMS(paramDate) {
    const date = paramDate || new Date()
    return date.getFullYear().toString() + _pad2(date.getMonth() + 1) + _pad2(date.getDate()) + _pad2(date.getHours()) + _pad2(date.getMinutes()) + _pad2(date.getSeconds())
}

function _pad2(n) { return n < 10 ? '0' + n : n + '' }

const Service = axios.create({
    timeout: 20000,
    baseURL: BASEURL
})

Service.interceptors.request.use( 
    requestInterceptor, 
    error => {
        console.log(error)
        return error
    }
)
Service.interceptors.response.use(
    responseInterceptor,
    error => {
        hideLoading()
        switch(error.response.status){
            case 401:
                Dialog.alert({
                    message: 'token无效',
                  }).then(() => {
                    // on close
                  });
            break
            case 404:
            // 404处理
            break
            case 500:
            // 500处理
            // Toast.fail("服务器异常\r\n请稍后重试")
            Dialog.alert({
                message: '服务器异常\r\n请稍后重试',
              }).then(() => {
                // on close
              });
            break
            default:
            break
        }
        return error
    }
)

function requestInterceptor(context) {
    // if(context.url.indexOf('history') === -1) {
    //     debugger
    // }
    showLoading()
    const header = getWeixinHeader()
    if (header) {
        Object.assign(context.headers, header)
    }
    // const token = window.sessionStorage.getItem('token') || '123'
    // if(token) {
    //     const NULL_VAL = 'NULL' // 默认空值
    //     const header = {
    //         'Authorization': 'Basic ' + token,
    //         // 'Authorization': 'Bearer ' + SSOToken.getToken('iscl', '814a0b7eb0f82e02246da5e098b6e2b5', 60 * 10),
    //         'Content-Type': 'application/json',
    //         'Accept-Device': 'PC', // 设备名称及型号
    //         'Accept-DeviceOS': 'Windows', // 设备系统名称及型号
    //         'Accept-Location': NULL_VAL, // 设置位置
    //         'Accept-ISP': 'wifi', // 网络
    //         'Accept-StartTime': getYMDHMS(), // 设备启动时间，格式YYYYMMDDHI24MISS
    //         'Accept-TimeZone': '28800000', // 时区偏移
    //         'Accept-Attr1': NULL_VAL, // 设备唯一号
    //         'Accept-Attr2': 'PHONE', // 终端类型（枚举：PAD，PC，PHONE其中一种）
    //         'Accept-Attr3': 'zh_CN', // 访问的语言Locale（可空，不传NULL），格式为如zh_CN这种
    //         'Accept-Attr4': NULL_VAL, // app信息，格式为appid加版本号，如：com.hasl.isp.native--1.1（PC传NULL ）
    //         'Accept-Attr6': NULL_VAL, // 前台登陆的用户名（没有登陆传NULL）
    //         'Real-Ip': NULL_VAL// 客户端IP地址
    //     }
    //     Object.assign(context.headers, header)
    // }
    return context
}
function responseInterceptor(response) {
    hideLoading()
    console.log(response)
    const res = Object.prototype.toString.call(response.data) === '[object String]' ? JSON.parse(response.data) : response.data
    if(res.result.isSuccess == true){
        return Promise.resolve(res)
    } else if (/^5/.test(res.status)) {
        Dialog({ 
            message: res.error.message
         })
        return Promise.reject(res)
    } else if (/^4/.test(res.status)) {
        Dialog({ 
            message: '客户端报错'
        })
        return Promise.reject(res)       
    } else {
        Dialog({ 
            message: res.result.error
        })
        return Promise.reject(res)
    }
    // return Promise.resolve(res)
    
}
// 默认空值
const NULL_VAL = 'NULL'

export function header() {
    const token = window.sessionStorage.getItem('token')
    let flag = false
    if(token) {
        flag = true
        const header = {
            'Authorization': 'Basic ' + token,
            // 'Authorization': 'Bearer ' + SSOToken.getToken('iscl', '814a0b7eb0f82e02246da5e098b6e2b5', 60 * 10),
            'Content-Type': 'application/json',
            'Accept-Device': 'PC', // 设备名称及型号
            'Accept-DeviceOS': 'Windows', // 设备系统名称及型号
            'Accept-Location': NULL_VAL, // 设置位置
            'Accept-ISP': 'wifi', // 网络
            'Accept-StartTime': getYMDHMS(), // 设备启动时间，格式YYYYMMDDHI24MISS
            'Accept-TimeZone': '28800000', // 时区偏移
            'Accept-Attr1': NULL_VAL, // 设备唯一号
            'Accept-Attr2': 'PHONE', // 终端类型（枚举：PAD，PC，PHONE其中一种）
            'Accept-Attr3': 'zh_CN', // 访问的语言Locale（可空，不传NULL），格式为如zh_CN这种
            'Accept-Attr4': NULL_VAL, // app信息，格式为appid加版本号，如：com.hasl.isp.native--1.1（PC传NULL ）
            'Accept-Attr6': NULL_VAL, // 前台登陆的用户名（没有登陆传NULL）
            'Real-Ip': NULL_VAL// 客户端IP地址
        }
        return {
            header: header,
            flag: flag
        }
    } else {
        return {
            flag: flag
        }
    }
    // Object.assign(context.headers, header)
}

export function getWeixinHeader() {
    const key = process.env.NODE_ENV === 'production' ? '6297391dca6d4090ae60959acb73cda1' : '814a0b7eb0f82e02246da5e098b6e2b5'
    // const key = isProduction() ? '6297391dca6d4090ae60959acb73cda1' : '814a0b7eb0f82e02246da5e098b6e2b5'
    console.log('=key=', key)
    // const commod = commonModule
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0Z3QiOiJUR1QtMTI3MS1RRnhBRXMxU0ZMRkNWb09mMlRHZXNuYWM2ckp6OUNyZ0haQmtpRWZJTEZCWXJkbFNBZC1jYXMiLCJzdWIiOiI2MDAwNTI3MyIsIm5iZiI6MTU5NDE5MjUwMywiZXhwIjoxNTk0MjM1NzAzLCJ1c2VyaWQiOiI2MDAwNTI3MyIsImlhdCI6MTU5NDE5MjUwMywia2V5IjoiVEdULTEyNzEtUUZ4QUVzMVNGTEZDVm9PZjJUR2VzbmFjNnJKejlDcmdIWkJraUVmSUxGQllyZGxTQWQtY2FzLVJFRCJ9.eaiDS1rwMV4vxhk0DASfHqoOlvLsDcn8x2-SFBnwKiY' // 假的但必须传。TODO 从token获取
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + SSOToken.getToken('iscl', key, 60 * 10),
    //   'Authorization': 'Basic ' + token,
      'Accept-Device': 'PC', // 设备名称及型号
      'Accept-DeviceOS': NULL_VAL, // 设备系统名称及型号
      'Accept-Location': NULL_VAL, // 设置位置
      'Accept-ISP': NULL_VAL, // 网络
      'Accept-StartTime': getYMDHMS(), // 设备启动时间，格式YYYYMMDDHI24MISS
      'Accept-TimeZone': '28800000', // 时区偏移
      'Accept-Attr1': NULL_VAL, // 设备唯一号
      'Accept-Attr2': 'PC', // 终端类型（枚举：PAD，PC，PHONE其中一种）
      'Accept-Attr3': 'zh_CN', // 访问的语言Locale（可空，不传NULL），格式为如zh_CN这种
      'Accept-Attr4': NULL_VAL, // app信息，格式为appid加版本号，如：com.hasl.isp.native--1.1（PC传NULL ）
      'Accept-Attr6': NULL_VAL, // 前台登陆的用户名（没有登陆传NULL） TODO 。此值不知道怎么取
      'Real-Ip': NULL_VAL// 客户端IP地址
      // 'Accept-Device': 'PC', // 设备名称及型号
      // 'Accept-DeviceOS': 'iOS11.4', // 设备系统名称及型号
      // 'Accept-Location': 'undefined', // 设置位置
      // 'Accept-ISP': 'wifi', // 网络
      // 'Accept-StartTime': getYMDHMS(), // 设备启动时间，格式YYYYMMDDHI24MISS
      // 'Accept-TimeZone': '28800000', // 时区偏移
      // 'Accept-Attr1': '1f60e49d2c16f247201e38b646e62cac7a1bca31', // 设备唯一号
      // 'Accept-Attr2': 'PC', // 终端类型（枚举：PAD，PC，PHONE其中一种）
      // 'Accept-Attr3': 'zh_CN', // 访问的语言Locale（可空，不传NULL），格式为如zh_CN这种
      // 'Accept-Attr4': 'com.hasl.isp.native--1.0.5', // app信息，格式为appid加版本号，如：com.hasl.isp.native--1.1（PC传NULL ）
      // 'Accept-Attr6': '62001554', // 前台登陆的用户名（没有登陆传NULL）
      // 'Real-Ip': NULL_VAL// 客户端IP地址
    }
  }

export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        Service.get(url, {            
            params: params        
        }).then(res => {
            // console.log(res)
            hideLoading()
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}

export function post(url, params) {
    // application/x-www-form-urlencoded;charset=UTF-8
    return new Promise((resolve, reject) => {
        Service.post(url, params, {
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
