import axios from 'axios';
import { toast } from '../components/Toast';
// import { setLoader } from '../Redux/actions/loader';
// import { storeInstance } from '../App';
// import { handleTokenExpiry } from './UserServices';
import { API_HOST } from '../config';

axios.defaults.baseURL = API_HOST;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    // config.headers['X-CSRF-Token'] = localStorage.getItem('csrfToken');
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    // storeInstance.dispatch(setLoader(false));
    return error;
  },
);
// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // storeInstance.dispatch(setLoader(false));
    return response;
  },
  (error) => {
    // storeInstance.dispatch(setLoader(false));
    // if (process.env.NODE_ENV !== 'development') {
    //   handleTokenExpiry(error);
    // }
    handleError(error);

    return error;
  },
);

function formatUrl(url, params) {
  params =
    params && Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : '';
  return `${url}${params}`;
}

function handleError(error) {
  error?.data?.message && toast.error(error?.data?.message);
  error?.response?.data?.message && toast.error(error?.response?.data?.message);
  error?.response?.data?.errors[0]?.message &&
    toast.error(error?.response?.data?.errors[0]?.message);
}

function handleSuccess(res) {
  if (res?.status === 200 || res?.status === 201)
    res?.data?.message && toast.success(res?.data?.message);
  else {
    res?.data?.message && toast.info(res?.data?.message);
  }
}

export const apiCallPost = (url, data, params = {}, showToast = false) =>
  new Promise((resolve) => {
    axios
      .post(formatUrl(url, params), data)
      .then((res) => {
        showToast && handleSuccess(res);
        resolve(res?.data);
      })
      .catch(() => {
        resolve(null);
      });
  });

export const apiCallGet = (url, params = {}, showToast = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params))
      .then((res) => {
        showToast && handleSuccess(res);
        resolve(res?.data);
      })
      .catch(() => {
        resolve(null);
      });
  });

export const apiCallPut = (url, data, params = {}, showToast = false) =>
  new Promise((resolve) => {
    axios
      .put(formatUrl(url, params), data)
      .then((res) => {
        showToast && handleSuccess(res);
        resolve(res?.data);
      })
      .catch(() => {
        resolve(null);
      });
  });

export const apiCallPatch = (url, data, params = {}, showToast = false) =>
  new Promise((resolve) => {
    axios
      .patch(formatUrl(url, params), data)
      .then((res) => {
        showToast && handleSuccess(res);
        resolve(res?.data);
      })
      .catch(() => {
        resolve(null);
      });
  });

export const apiCallDelete = (url, params = {}, showToast = false) =>
  new Promise((resolve) => {
    axios
      .delete(formatUrl(url, params))
      .then((res) => {
        showToast && handleSuccess(res);
        resolve(res?.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
