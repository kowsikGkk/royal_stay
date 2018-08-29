import 'whatwg-fetch';
import { showMessageAlert } from '../containers/MessageAlert/MessageAlert.actions';
import { store } from '../index';
import { showNotification } from '../containers/Notification/notificationActions';
import { refreshToken, logout } from '../Routes/Dashboard/DashboardSaga/Dashboard.actions';

// Global handling for each specific response status code can be directly written under each case.
const GLOBAL_RESPONSE_STATUS_CODE_HANDLERS = {
  // Unauthorized
  403: (response, action) => {
    if (response.message === 'Access Denied') {
      store.dispatch(logout())
      store.dispatch(
        showNotification({
          message: 'Access denied please login again',
          messageType: 'error',
        }),
      );
    } 
  },
  500:(response, action)=>{
  
  },
  // 500 :async ( res, action) => {
  //     await store.dispatch(refreshToken());
  //     setTimeout( () => {
  //        store.dispatch({type: `${action.type}`, payload: action.payload})
  //     },1000);
  // },
  401: (response) => {
    if (response.message === 'Authentication Failed: User already logged in other browser') {
      store.dispatch(
        showMessageAlert({
          message: 'I see that you are active on another browser or device. By logging in here, you will be automatically logged out from your other session.',
          visible: true,
        }));
    }
  },
  503: () => {
    store.dispatch(
      showNotification({
        message: 'Server down! Please try later',
        messageType: 'error',
      }),
    );
    return false;
  },
};

export function get(url) {
  return api(url, 'GET');
}

export function post(url, payload) {
  return api(url, 'POST', payload);
}

function api(url, method, payload) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options = { method };
  options.headers = {
    Authorization: JSON.parse(localStorage.getItem('AUTH_TOKEN')),
  };

  return fetch(`/v1${url}`, {
    credentials: 'same-origin',
    ...options,
  }).then(res => res.json());
}

/**
 *
 * @param url
 * @param options
 * @param callback
 * @param tokenRequired
 * @returns {Function}
 */

export default function request(url, options, callback, tokenRequired = true, action) {
  if ((tokenRequired && localStorage.getItem('access_token')) || !tokenRequired) {
    options.body = typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body;
    const defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (tokenRequired) {
      options.headers = {
        Authorization: localStorage.getItem('access_token'),
      };
    }
    options.headers = options.headers
      ? Object.assign({}, defaultHeaders, options.headers)
      : defaultHeaders;
    let statusCode,
      responseStatus,
      responseStatusCode,
      StatusMessage;
    return fetch(url, {
      credentials: 'same-origin',
      ...options,
    })

      .then(checkStatus)
      .then((response) => {
        statusCode = response.status;
        responseStatus = statusCode >= 200 && statusCode < 300 ? 'onSuccess' : 'onError';
        responseStatusCode = statusCode.toString();
        return response.json();
      })

      .then((response) => {
        if (responseStatus in callback) {
          callback[responseStatus](response);
        }
        if (responseStatusCode in GLOBAL_RESPONSE_STATUS_CODE_HANDLERS) {
          GLOBAL_RESPONSE_STATUS_CODE_HANDLERS[responseStatusCode](response, action);
        }
        // Custom handling for each specific response status code is done based on whether
        // the specific response code keys are present in the callback object or not.
        if (responseStatusCode in callback) {
          callback[responseStatusCode](response);
        }
        return response;
      });
  }
}

/**
 * For 502 we will not get JSON response, hence throw error
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response.status !== 503) {
    return response;
  }
  if (response.status == 401) {
    if (response.message) {

    }
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
