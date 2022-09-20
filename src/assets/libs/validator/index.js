import { isEmptyObject } from '../../util/index'
import Vue from 'vue'
import { Toast } from 'vant'
import 'vant/lib/toast/style'

Vue.use(Toast)

export function isNullValue(msg, target) {
    let flag = true
    const type = Object.prototype.toString.call(target)
    if (type === '[object Object]' ) {
        if (isEmptyObject(target)) {
            Toast(msg)
            flag = false
        }
    } else if (type === '[object String]' || type === '[object Number]') {
        // if (target===0 || target === '0') {
        //     Toast(msg)
        //     flag = false
        // }
    }
    return flag
}

export function beforeBiggerThanAfter(msg, before, after) {
    let flag = true
    if (Number(before) > Number(after)) {
        Toast(msg)
        flag = false
    }
    return flag
}

export function isNegativeNumber(msg, target) {
    let flag = true
    if (Number(target) < 0) {
        Toast(msg)
        flag = false
    }
    return flag
}

export function hasPickGoods(msg, target) {
    let flag = true
    let count = 0
    if (isEmptyObject(target)) {
        Toast(msg)
        flag = false
    }
    for (let item in target) {
        count += Number(target[item]['amount'])
    }
    if (count === 0) {
        Toast(msg)
        flag = false
    }
    return flag
}
