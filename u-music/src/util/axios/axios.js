import axios from 'axios'


let http = axios.create()


//请求拦截
http.interceptors.request.use(req=>{

    //设置请求，根据需求
    return req
})

//登录拦截
http.interceptors.response.use(res=>{
    //大量的全局错误拦截
    //针对于返回信息进行拦截
    return res.data
})

//导出
export default http
