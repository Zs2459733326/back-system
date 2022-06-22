import axios from 'axios';
const axiosPro = axios.create({
    baseURL: "http://rap2api.taobao.org/app/mock/303924",
    timeout:3000,
    headers:{
        'Content-type':'application/json;charset=utf-8'
    }
})
// 请求拦截器
axiosPro.interceptors.request.use(function(config) {
    // 请求前做些什么
    return config
}, function(error){
    return Promise.reject(error)
})

// 响应拦截器
axiosPro.interceptors.response.use(function(response) {
    // 对响应数据做什么
    return config
}, function(error) {
    return Promise.reject(error)
})