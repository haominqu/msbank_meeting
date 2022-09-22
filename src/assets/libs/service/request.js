import URL from './serviceUrlMapping'
// import RM from './serviceUrlMapping'
import { post, get } from './service'
import SC from './requestName' 
export function meetingSignin (params) {
    return post('/meeting/meeting_signin/', params)
}

export function meetingsearch (params) {
    return get('/meeting/meeting_signin/', params)
}