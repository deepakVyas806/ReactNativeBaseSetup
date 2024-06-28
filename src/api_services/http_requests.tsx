import axios from "axios";
import { baseUrl } from "./credentials";
// import { showMessage } from 'react-native-flash-message';
import { store } from "../redux/store";
// import { GetRefreshToken } from "./http_services";

const apiUrl = baseUrl + "/api"

let primaryHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
axios.interceptors.request.use((config:any) => {
  config.headers.Authorization = store.getState().Authentication.accessToken ? `Bearer ${store.getState().Authentication.accessToken}` : ''
  return config;
})
export const request = async (route: string, data: any, methodType: string, additionalHeaders: any) => {
  console.log(store.getState().Authentication.accessToken)
  return new Promise((resolve, reject) => {
    if (additionalHeaders != null) {
      primaryHeaders['Content-Type'] = additionalHeaders
    } else {
      primaryHeaders['Content-Type'] = "application/json"
    }
    let apiCall;
    // route = this.clean(route);
    methodType = methodType.toUpperCase();

    switch (methodType) {
      case "POST":
        console.log(apiUrl + '/' + route)
        apiCall = axios(apiUrl + '/' + route, {
          method: 'POST',
          headers: {
            ...primaryHeaders,
            ...additionalHeaders,
          },
          data: data,
          timeout: 1000 * 60,
        });
        break;
      case "PUT":
        apiCall = axios(apiUrl + '/' + route, {
          method: 'PUT',
          headers: {
            ...primaryHeaders,
            ...additionalHeaders,
          },
          data: data,
          timeout: 60000,
        });
        break;

      case "DELETE":
        apiCall = axios(apiUrl + '/' + route, {
          method: 'DELETE',
          headers: {
            ...primaryHeaders,
            ...additionalHeaders,
          },
          data: data,
          timeout: 60000,
        });
        break;

      default:
        console.log(apiUrl + '/' + route)
        apiCall = axios(apiUrl + '/' + route, {
          method: methodType,
          headers: {
            ...primaryHeaders,
            ...additionalHeaders,
          },
          params: data,
          timeout: 60000,
        });
        break;
    }

    apiCall
      .then(response => {
        //alert(response);
        //console.log(response.data.success === 0);
        // console.log('Response from api call : ', JSON.stringify(response));
        if (response.data.success === 0) {
          if (response.data.messsge == 'Invalid token') {
          } else {
            // showMessage({ message: response.data.messsge});
          }
          //   store.dispatch(getSearchToken("Regenerate"));
        }
        resolve(response.data);
      })
      .catch(error => {
        console.log('Response from Error  : ', JSON.stringify(error));
        if (error.response) {
          if (error.response.status === 401) {
            //Refresh Token api Calling
            const params = {
              UserName: store.getState().Authentication.profileData.retailerCode,
              JWTToken: store.getState().Authentication.accessToken
            }
            console.log("refresh token param", params)
            // GetRefreshToken(params).then((result) => {
            //   console.log("refresh token", result)
            //   if (result?.data?.jwtToken) {
            //     store.dispatch(setAccessToken(result?.data?.jwtToken));
            //     // return;
            //   }
            // }).catch((err: any) => {
            //   console.log("error", err)
            // })
            error.response.data.message = ""
            // showMessage({ message: '' });
            //   this.forceLogin();
            // store.dispatch(getSearchToken("Regenerate"));
            // store.dispatch(getVashishtTokenfromDB("Regenerate"))
            reject({ ...error, offline: false });
            return;
          }
          if (error.response.status === 400) {
            // showMessage({
            //   message:
            //     '400 invalid request',
            // });
            //   this.forceLogin();
            reject({ ...error, offline: false });
            return;
          }
          if (error.response.status === 404) {
            // showMessage({
            //   message:
            //     '404 Not Found:The server can not find the requested page.',
            // });
            //   this.forceLogin();
            reject({ ...error, offline: false });
            return;
          }
          if (error.response.status === 500) {
            // showMessage({
            //   message:
            //     '500 Internal Server Error :The request was not completed. The server met an unexpected condition.',
            // });
            //   this.forceLogin();
            reject({ ...error, offline: false });
            return;
          }
          if (error.response.status === 403) {
            // showMessage({
            //   message: "403 request forbidden"
            // })
            reject({ ...error, offline: false });
          }
          if (error.response.status === 401) {
            // showMessage({
            //   message: 'You have been logged out. Please log in again.',
            // });
            //   this.forceLogin();
            reject({ ...error, offline: false });
            return;
          }
          //   if (config.silent) {
          //     if (
          //       error.response.status === 422 &&
          //       typeof error.response.data.errors !== 'undefined'
          //     ) {
          //       errors = error.response.data.errors;
          //       // showMessage({
          //       //   message:
          //       //     errors[Object.keys(errors)[0]] ||
          //       //     `An error has occurred (${error.response.status}).`,
          //       // });
          //     }
          //     // else {
          //     //   console.log(
          //     //     'error.response.data.message',
          //     //     error.response.data.message,
          //     //   );
          //     //   showMessage({
          //     //     message:
          //     //       error.response.data.message ||
          //     //       `An error has occurred (${error.response.status}).`,
          //     //   });
          //     // }
          //     reject({...error, offline: false});
          //   }
          // } else {
          //   // alert(JSON.stringify(this.config))
          // //   if (!this.config.silent) {
          // //     showMessage({
          // //       message: 'No internet connection',
          // //       backgroundColor: '#ff0000',
          // //     });
          // //   }
          reject({ offline: true });
        }
      });

    return this;
  });
}


