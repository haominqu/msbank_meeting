import URL from './serviceUrlMapping'
// import RM from './serviceUrlMapping'
import { post } from './service'
import SC from './requestName' 
export function meetingSignin (params) {
    return post('/meeting/meeting_signin', params)
}