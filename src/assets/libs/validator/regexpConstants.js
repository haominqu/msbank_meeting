/**
 * Created by admin on 2018/10/28.
 */
// 日期格式匹配
export const dateFormExp = /^(\d{4})-(\d{2})-(\d{2})$/
// 汉字匹配
export const chineseExp = /[^\u4E00-\u9FA5\u3400-\u4DB5\u9FB4-\u9FBB\u2E81\u2E84\u2E88\u2E8B\u2E8C\u2E97\u2EA7\u2EAA\u2EAE\u2EB3\u2EB6\u2EB7\u2EBB\u2ECA\uF92C\uF979\uF995\uF9E7\uF9F1\uFA0C\uFA0D\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA18\uFA1F\uFA20\uFA21\uFA23\uFA24\uFA27\uFA28\uFA29]/g
// 邮箱正则
// export const emailExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/   //原有校验邮箱正则
export const emailExp = /^([a-zA-Z0-9-_.]{1,16})@([a-zA-Z0-9]{1,9})(\.[a-zA-Z0-9]{1,9}){0,3}(\.(?:com|net|org|edu|gov|mil|cn|us)){1,4}$/
// 电话号码数字规范
export const phoneNumExp = /\d{3}-\d{8}|\d{4}-\d{7}/
export const phoneNumExp2 = /(0000000|1111111|2222222|3333333|4444444|5555555|6666666|7777777|8888888|9999999|1234567|7654321)+/
// 电话号码规则
export const phoneRulExp = /^1(3|4|5|8|7|6|9)\d{9}$/
// 连续7位相等 ccx
export const phoneRulExp2 = /(\d)\1{6}/
// 身份证号码规则
export const idNoExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
// 不合法的字符匹配
/**
 * 系统内所有录入框均不可录入\:：*?"<>｜~字符
 * */
export const inValideExp = /[`~!@#$￥……（）%^&*()_+=<>?:"{},.\/;'[\]]/
export const placeInValideExp = /[`~!@#$￥……%^&*_+=<>?:"{},.\/;'[\]]/
/**
 * 过滤掉数字以外的字符
 * */
export const intTrim = /\D/g
export const intHundred = /^(\\d|[1-9]\\d|100)$/
// export const intNumberWord = /^[^\u4e00-\u9fa5a-zA-Z\d]+$/
export const intNumberWord = /[^a-z0-9\u4e00-\u9fa5]+/gi
export const intWord = /[^0-9\u4e00-\u9fa5]+/gi
// 正整数校验（修改为小数点后三位）
// export const intRule = /^\+?[1-9][0-9]*$/ 不包括0
export const intRule = /^-?\d+\.?\d{0,3}$/
// 两位小数校验（修改为小数点后三位）
export const floatRule = /^-?\d+\.?\d{0,3}$/
// 英文特殊字符校验(不包括逗号句号)
export const enSpecialRule = /[`~!@#$%^&*()_+<>?:"{}\/;'[\]]/im
// 中文特殊字符校验(不包括逗号句号)
export const cnSpecialRule = /[·！#￥（——）：；“”‘、|《》？、【】[\]]/im
// 邮编
export const postalCodeExp = /^[0-9]{6}$/
// 中英文特殊字符
export const regsp = /[`~!@#$￥……%^&*_+=<>?:"{},.\/\\;'[\]！#￥（——）：；“”‘’、|《》？、【】。，！]/
// 手机号码校验正则
// export const mobilePhoneRuleExp = //
