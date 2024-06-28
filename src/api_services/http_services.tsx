import { request } from "./http_requests";

const AuthenticateUser = (payload: any): Promise<any> => {
   return request("UserLogin/authenticate", payload, "POST", null) as Promise<any>;
}
export {
    AuthenticateUser
}