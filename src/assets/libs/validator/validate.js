import Vue from 'vue'
import {ValidationProvider, extend, localize} from 'vee-validate'
import {required, email} from 'vee-validate/dist/rules' // 验证规则导入
// import CN from 'vee-validate/dist/locale/zh_CN.json' // 加载语言包
// import StringUtility from './StringUtility'
// import * as exp from './regexpConstants'
extend('required', required)
extend('email', email)

localize('zh_CN', {
  name: 'zh_CN',
  names: {
    applicant_name: '账户姓名',
    cert_type: '证件类型',
    cert_number: '证件号',
    opp_act: '账户',
    opp_bank: '开户银行',
    applicant_phone: '手机号',
    verfy_code:'验证码'
  },
  messages: {
    // your messages.
    _default: (field) => `${field}无效`,
    after: (field, [target]) => `${field}必须在${target}之后`,
    alpha_dash: (field) => `${field}能够包含字母数字字符、破折号和下划线`,
    alpha_num: (field) => `${field}只能包含字母数字字符`,
    alpha_spaces: (field) => `${field}只能包含字母字符和空格`,
    alpha: (field) => `${field}只能包含字母字符`,
    before: (field, [target]) => `${field}必须在${target}之前`,
    between: (field, [min, max]) => `${field}必须在${min}与${max}之间`,
    confirmed: (field, [confirmedField]) =>
      `${field}不能和${confirmedField}匹配`,
    credit_card: (field) => `${field}格式错误`,
    date_between: (field, [min, max]) => `${field}必须在${min}和${max}之间`,
    date_format: (field, [format]) => `${field}必须符合${format}格式`,
    decimal: (field, [decimals = '*'] = []) =>
      `${field}必须是数字，且能够保留${
        decimals === '*' ? '' : decimals}位小数`,
    digits: (field, [length]) =>
      `${field}必须是数字，且精确到${length}位数`,
    dimensions: (field, [width, height]) =>
      `${field}必须在${width}像素与${height}像素之间`,
    email: (field) => `${field}不是一个有效的邮箱`,
    ext: (field) => `${field}不是一个有效的文件`,
    image: (field) => `${field}不是一张有效的图片`,
    included: (field) => `${field}不是一个有效值`,
    integer: (field) => `${field}必须是整数`,
    ip: (field) => `${field}不是一个有效的地址`,
    length: (field, [length, max]) => {
      if (max) {
        return `${field}长度必须在${length}到${max}之间`
      }
      return `${field}长度必须为${length}`
    },
    max: (field, [length]) => `${field}不能超过${length}个字符`,
    max_value: (field, [max]) => `${field}必须小于或等于${max}`,
    mimes: (field) => `${field}不是一个有效的文件类型`,
    min: (field, [length]) => `${field}必须至少有${length}个字符`,
    min_value: (field, [min]) => `${field}必须大于或等于${min}`,
    excluded: (field) => `${field}不是一个有效值`,
    numeric: (field) => `${field}只能包含数字字符`,
    regex: (field) => `${field}格式无效`,
    required: (field) => {
        if(field=='证件类型' || field=='开户银行'){
            return `请选择${field}`
        }else{
            return `请输入${field}`
        }
        
    },
    url: (field) => field + '不是一个有效的url'
  }
})
// 手机号码验证
extend('mobile', {
  message: () => `请输入正确的手机号码`,
  validate: value => value.length === 11 && /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(value)
})
extend('onlyNumber', {
    message: () => `只能输入数字`,
    validate: value => {
        if(/^\d+$|^\d+[.]?\d+$/.test(value)){
            return true
        }else{
            return false
        }
    } 
})
extend('cnen', {
    message: () => `只能输入汉字或英文`,
    validate: value => {
        // const applicant_name = StringUtility.validateName(value)
        // if(applicant_name.istrue){
        if(/^[\u4e00-\u9fa5A-Za-z]+$/.test(value)){
            return true
        }else{
            return false
        }
    } 
})
extend('special', {
    message: () => `不能输入特殊字符`,
    validate: value => {
        if(/[`~!@#$￥……%^&*_+=<>?:"{},.\/\\;'[\]！#￥（——）：；“”‘’、|《》？、【】。，！]/.test(value)){
            return true
        }else{
            return false
        }
    } 
})

// 设置
Vue.component('ValidationProvider', ValidationProvider)
