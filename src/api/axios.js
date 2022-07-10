import axios from 'axios';
const config = {
    // baseURL: "http://rap2api.taobao.org/app/mock/303924",
    // baseURL: "https://demo.crudapi.cn/api/business",
    baseURL: "http://localhost:8080/apiss",
    timeout:5000,
    headers:{
        'Content-type':'application/json;charset=utf-8'
    },
    auth:{
        username:'superadmin',
        password: '1234567890'
        // username:'jianan',
        // password: 'jianan0814'
    }
}
const axiosPro = axios.create(config)
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
    return response
}, function(error) {
    return Promise.reject(error)
})

export default axiosPro