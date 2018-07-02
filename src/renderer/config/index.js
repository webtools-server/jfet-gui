/**
 * web配置
 */

const baseApi = {
  mock: 'http://mock.fe.jyb.com/mock-api/mock/5a73e010f6b8ef779d2e6e08',
  test: '',
  production: ''
};

export default {
  baseApi: baseApi[process.env.NODE_ENV] || baseApi.mock
};
