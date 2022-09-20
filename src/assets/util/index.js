import store from '../../store/index'
import Vue from 'vue'
import RN from '../../router/routeName'
import router from '../../router/index'
import envConfig from '../env.json'

export function onBridgeReady () {
  console.log('执行了')
  WeixinJSBridge.call('hideOptionMenu')
}
export function isDev() {
  const flag = process.env.NODE_ENV === 'development'
  console.log(
    flag ? '开发环境' : '生产环境'
  )
  return  flag
}
// 移动端展示loading
export function showLoading() {
  store.commit({
    type: 'showLoadingMutation',
    value: true
  })
}

export function hideLoading() {
  store.commit({
    type: 'showLoadingMutation',
    value: false
  })
}

// 判断是否为空对象
export function isEmptyObject(obj) {
  return !isDef(obj) || (typeof obj === 'object' && Object.keys(obj).length === 0)
}

// 判断对象是否定义
export function isDef(obj) {
  return obj !== undefined && obj !== null && obj !== ''
}

// 格式化时间
export function fomatDate(time) {
  if (time) {
    const date = new Date(time)
    return  `${date.getFullYear(date)}-${date.getMonth() + 1}-${date.getDate()}`  
  }
} 
// 登陆权限
export function authority(authority) {
  const defaultVal = {
    showConfirmBtn: true,
    showSearch: false,
    showConfirmCount: false
  }
  switch(authority) {
    case '1':
      return defaultVal
    case '2':
      return {
        showConfirmBtn: false,
        showSearch: true,
        showConfirmCount: false
      }
    case '3':
      return {
        showConfirmBtn: true,
        showSearch: true,
        showConfirmCount: true
      }
    default:
      return defaultVal
  }
}
// 序列化get传参
export function getQueryString(location, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = location.search.substr(1).match(reg)
  if (r && r[2].indexOf('%') > -1) {
    let str = r[2]
    const newStr = str.replace(/%/g,'%25')
    r[2] = newStr
  }
  if (r != null) return decodeURI(r[2])
  return null;
}

// pc端展示抽屉
export function handleDrawer(flag) {
  store.commit({
    type: 'setManageShowDrawer',
    value: flag
  })
}

// 计算当前页面请求的分页数据数量
export function pagingPageSize(dom, browserHeight, height) {
  const topDistance = dom.getBoundingClientRect().top
  return parseInt(( (Number(browserHeight) - Number(topDistance)) / Number(height) ) + 1)
}

// 登陆设备
export const detectUA = (function() {
  const u = (navigator.userAgent ? navigator.userAgent : navigator.appVersion).toLowerCase()
  console.log('agent', u)
  return {
    trident: u.indexOf('trident') > -1, // IE内核
    presto: u.indexOf('presto') > -1, // opera内核
    webKit: u.indexOf('applewebkit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1, // 火狐内核
    mobile: !!u.match(/.*applewebkit.*mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
    android: u.indexOf('android') > -1 || u.indexOf('adr') > -1, // android终端
    iPhone: u.indexOf('iphone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('ipad') > -1, // 是否iPad
    webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('micromessenger') > -1, // 是否微信 （2015-01-22新增）
    // wexin: u.match(/MicroMessenger/i) == 'micromessenger',
    qq: u.match(/\sqq/i) === ' qq', // 是否QQ
    info: u,
    isApp: u.indexOf('yjapp') > -1 || !!u.match(/mobile.*ios/) // 是恒安app
  }
})()

// 获取baseUrl
export const BASEURL = (function() {
  // return isDev() ? '/api/' : envConfig['env']['dev']
  // const BASEURL =  envConfig['env']['dev']
  // return '/api/'
  return process.env.NODE_ENV === 'production' ? envConfig['env']['pro'] : envConfig['env']['test']
})()


export const eventBus = new Vue()

export function deepClone (initalObj) {
  const obj = {};
  if(typeof initalObj !== 'object'){
    return initalObj
  }
  for (const key in initalObj) {
    if (typeof initalObj[key] === 'object') {
      //对数组特殊处理
      if (Array.isArray(initalObj[key])) {
        //用map方法返回新数组，将数组中的元素递归
        obj[key] = initalObj[key].map(item => this.deepClone(item))
      } else {
        //递归返回新的对象
        obj[key] = this.deepClone(initalObj[key])
      }
    } else if (typeof initalObj[key] === 'function') {
      //返回新函数
      obj[key] = initalObj[key].bind(obj)
    } else {
      //基本类型直接返回
      obj[key] = initalObj[key]
    }
  }
  return obj
}

export function hasBeenLogin (flag) {
  // 不用登陆页面
  // const timeStamp = localStorage.getItem('timeStamp')
  // const now = new Date().getTime()
  // // 43200000 
  // console.log(now, timeStamp, Number(now) - Number(timeStamp))
  // if ( !timeStamp || Number(now) - Number(timeStamp) > 100000) {
  //     console.log('重新登陆')
  //     router.push({name: RN.MANAGE_LOGIN})
  // } else {
  //     console.log('不用登陆，直接跳转')
  //     router.push({name: RN.MANAGE_GOODS_INFO})
  // }
  if (flag){
    router.push({name: RN.MANAGE_GOODS_INFO})
  }
}
export function getMyDate(str) {
  const oDate = new Date(str)
  const oYear = oDate.getFullYear()
  const oMonth = oDate.getMonth()+1
  const oDay = oDate.getDate()
  const oHour = oDate.getHours()
  const oMin = oDate.getMinutes()
  const oSen = oDate.getSeconds()
  const oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+ addZero(oMin) +':'+addZero(oSen)
  return oTime
}
  
//补零操作
function addZero(num){
  if(parseInt(num) < 10){
    num = '0'+num
  }
  return num

}
// 整个页面不可编辑
export function AllNoClick() {
  // document.getElementById('app').className += ' noClick'
  document.getElementById('app').classList.add("noClick")
}
// 放开页面不可编辑
export function RelieveNoClick() {
  // document.getElementById('app').className = document.getElementById('app').className.replace(' noClick', '')
  document.getElementById('app').classList.remove("noClick")
}
