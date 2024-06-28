
import * as constants from '../constants'


export function setUserData(userData: any) {
    return {
        type: constants.constants.USER_DATA,
        data: userData
    }
}