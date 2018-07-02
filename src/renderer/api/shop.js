/**
 * 接口请求
 */

import axios from 'axios';
import { Message } from 'element-ui';
import webConfig from '@/config/index';

const axiosInstance = axios.create({
  baseURL: `${webConfig.baseApi}/api/v1`
});

axiosInstance.interceptors.response.use(res => res.data, (error) => {
  /* eslint-disable new-cap */
  Message({
    message: error.toString(),
    type: 'error'
  });
});

/**
 * 获取产品列表
 * @param {Object} params
 */
export function getProductList(params = {}) {
  return axiosInstance.get('/product', { params });
}

export function buyProducts(products, cb, errorCb) {
  setTimeout(() => {
    // simulate random checkout failure.
    (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
      ? cb()
      : errorCb();
  }, 100);
}
