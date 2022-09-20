/**
 * 字符串 常用函数
 */
import * as exp from './regexpConstants'
var StringUtility = {}
/**
 * 判断 对象是否为空
 * @param obj
 * @returns {Boolean}
 */
StringUtility.isNull = function(obj) {
  var flag = false

  if (obj === '' || obj == null || obj === 'NULL' || obj === 'null' || obj === 'undefined' || obj === undefined) { flag = true }

  return flag
}

/**
 * 全角转半角方法
 */
StringUtility.vilidateaddressToCDB = function(str) {
  var tmp = ''
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i))
    }
  }
  return tmp
}
/**
 * 根据日期获取字符串
 */
StringUtility.calendarToString = function(cal) {
  if (StringUtility.isNull(cal)) {
    return null
  }
  // 年
  var year = (cal.getTime().getYear() + 1900) + ''
  // 月
  var month = (cal.getTime().getMonth() + 1) + ''
  if (month.length === 1) {
    month = '0' + month
  }
  // 日
  var date = cal.getTime().getDate() + ''
  if (date.length === 1) {
    date = '0' + date
  }
  return year + '-' + month + '-' + date
}
/**
 * 校验是否为日期格式
 */
StringUtility.stringToDate = function(str) {
  var red = exp.dateFormExp
  if (!red.test(str)) {
    return true
  }
  return false
}
/**
 * 验证字符长度
 * str	-- 字符
 * len	-- 长度
 */
StringUtility.stringToLength = function(str, len) {
  return str.length < len
}
/**
 * 校验内容是否为全角
 */
StringUtility.stringToCharCodeLength = function(str) {
  var num = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      num++
    }
  }
  if (num === str.length) {
    return false
  } else {
    return true
  }
}
/**
 * 过滤掉汉字以外的字符
 * 2018-10-23
 * tanqingqing
 */
StringUtility.removeChineseSpecial = function(str) {
  const patternName = exp.chineseExp
  return str.replace(patternName, '')
}
/**
 * 校验邮箱
 * 2018-10-23
 * tanqingqing
 * */
StringUtility.EmailValidate = function(str) {
  const pattern = exp.emailExp
  if (!str || !pattern.test(str)) {
    return false
  } else {
    return true
  }
}
/**
 * 校验电话号码数字规范
 * 2018-10-24
 * tanqingqing
 * */
StringUtility.phoneNumber = function(str) {
  const pattern = exp.phoneNumExp
  if (!str || !pattern.test(str)) {
    return false
  } else {
    return true
  }
}
// 邮编
StringUtility.postalCode = function(str) {
  if (!str || !exp.postalCodeExp.test(str)) {
    return false
  } else {
    return true
  }
}
// 数字分隔
StringUtility.divideNumber = function(str, count) {
  
  let oldStr = str ? str : ''
  let newStr = ''
  let target = count
  let result = []
  for (let m = 0; m < target.length; m++) {   
    if (m === 0) {
      const lastNumber = oldStr.length > target[m].count * target[m].amount ? target[m].count * target[m].amount : oldStr.length
      result.push(oldStr.slice(0, lastNumber))

    } else {
      console.log('b', oldStr.length,  target[0].count * target[0].amount + 1, oldStr.split(target[0].count * target[0].amount + 1, oldStr.length))
      result.push(oldStr.slice(target[0].count * target[0].amount, oldStr.length))
    }
  }
  for (let t = 0; t < result.length; t++) {
    let a = ''
    for (let n = 0; n < result[t].length; n++) {
      if ((n + 1) % target[t].amount == 0 && n !== 0 && target[t].count !== 0) {
      
        target[t].count--
        const flag = result[t][n] + ' '
        a += flag
      } else {
        a += String(result[t][n])
      }
    }
    newStr += a
  }
  return newStr
}
/**
 * 判断 字符串全部是汉字 或 英文字母
 */
StringUtility.validateName = function(name) {
  const result = {}
  result.istrue = false
  result.iswhich = '0'
  const reghan = /^[\u4e00-\u9fa5\·]*$/
  const regeng = /^[a-zA-Z\·\.\,\， \uFF00-\uFFFF]*$/
  if (reghan.test(name)) {
    result.istrue = true
    result.iswhich = '1'  // 1 是指汉字
    let henlen
    const reg = new RegExp('·', 'g')
    const arr = name.match(reg)
    if (arr != null && arr !== '' && arr.length > 0) {
      henlen = (arr.length) + (name.length - arr.length) * 2
    } else {
      henlen = name.length * 2
    }

    result.henlen = henlen
  }
  if (regeng.test(name)) {
    result.istrue = true
    result.iswhich = '2' // 2 是指英文
    result.englen = name.length
  }
  return result
}
/**
 * 字符串过滤
 * */
export const Filter = {
  str: '',
  text(value) {
    if (value !== null && value !== undefined) {
      this.str = value
    } else {
      this.str = ''
    }
    return this
  },
  // 不合法字符
  invalideRemove() {
    this.str = this.str.replace(exp.inValideExp, '')
    return this
  },
  // 只能数字
  intTrim() {
    this.str = this.str.replace(exp.intTrim, '')
    return this
  },
  isPhone(newVal, oldVal, count) {

    if (newVal.length > oldVal.length) { // 文本框中输入
      this.str = this.str.replace(exp.intTrim, '')
      this.str = StringUtility.divideNumber(this.str, count)
      // || newVal.length === 6 || newVal.length === 9
    } else { // 文本框中删除
      if (newVal.length === 4 || newVal.length === 7 || newVal.length === 10) {
        this.str = this.str.trim()
      }
    }
    return this
  },
  isBankNo(newVal, oldVal, count) {
    if (newVal.length > oldVal.length) { // 文本框中输入
      this.str = this.str.replace(exp.intTrim, '')
      this.str = StringUtility.divideNumber(this.str, count)
      // || newVal.length === 6 || newVal.length === 9
    } else { // 文本框中删除
      if (newVal.length === 4 || newVal.length === 7 || newVal.length === 10) {
        this.str = this.str.trim()
      }
    }
    return this
  },
  isId(newVal, oldVal, count, isArmy = false) {
    if (newVal.length > oldVal.length) { // 文本框中输入
      if (isArmy) {
        if (newVal.length >= 12) {
          this.str = this.str.replace(exp.intWord, '')
          this.str = StringUtility.divideNumber(this.str, count)
        } else {
          this.str = this.str
        }
      } else {
        this.str = this.str.replace(exp.intNumberWord, '')
        this.str = StringUtility.divideNumber(this.str, count)
      }
      
      // || newVal.length === 6 || newVal.length === 9
    } else { // 文本框中删除
      if (newVal.length === 4 || newVal.length === 7 || newVal.length === 10) {
        this.str = this.str.trim()
      }
    }
    return this
  },
  // 只能输入0-100的整数
  intHundred() {
    this.str = this.str.replace(exp.intHundred, '')
    return this
  },
  result() {
    return this.str
  }
}


export default StringUtility
