import axios from 'axios';
//创建一个实例
const service = axios.create({
    timeout: 3000,//请求超时
})
//请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        console.log(err)
    }
);
//相应拦截器（对状态码操作）
service.interceptors.response.use(
    response => {
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    }, err => console.log(err)
);
export default service