/*
 * 存放请求地址 
 */ 
import envConfig from '../../env.json' 
import SC from './requestName'

const CUSTOMER = envConfig.module.customer
const ORDER = envConfig.module.order
const SYSTEM = envConfig.module.system
const TRANSFERAUTH = envConfig.module.transferauth

const URL = {
    [SC.TRANSFERAUTH_APPLY_TRANSFERAUTH]: compose(TRANSFERAUTH, 'service/applyTransferAuth'), // 5.申请授权接口
}

function compose(base, api) {
    return  base + '/' + api
}
// function compose(base, api) {
//     return  'api/' + base + '/' + api
// }
export default URL