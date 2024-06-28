
import * as constants from "../constants";
interface AuthenticationState {
    userData: any | null;
    profileData: any | null;
    accessToken: any | null;
}

const initialState: AuthenticationState = {
    userData: null,
    profileData: null,
    accessToken: null

};

export const Authentication = (state = initialState, action: any): AuthenticationState => {

    switch (action.type) {

        case constants.constants.USER_DATA:
            return {
                ...state, userData: action.data
            }
        default:
            return state;
    }
}

