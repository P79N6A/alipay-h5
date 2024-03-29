import axios from 'axios';

class AjaxRequest {
  constructor () {
    // this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';
    // this.baseURL = '/';
    this.timeout = 5000;
  }

  request (config) { // 用户请求设置的方法
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
    // 设置拦截器
    instance.interceptors.request.use((config) => {
      config.headers.token = localStorage.getItem('token');
      return config;
    }, err => Promise.reject(err));
    // 设置响应拦截器
    instance.interceptors.response.use(res => {
      if (res.data.code === 500) {
        return Promise.reject(res.data.msg)
      }
      return res.data
    }, err => Promise.reject(err));

    return instance(config);
  }
}

export default new AjaxRequest();
