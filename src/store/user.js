import  Cookie from 'js-cookie'
export default {
    state: {
        token: ""//存放token
    },
    mutations: {
        setToken(state, token) {
            state.token = token//将获取的token存放在vuex中的state.token中
            Cookie.set('token',token)//将获取的token粗放在Cookie中
        },//设置token
        clearToken(state) {
            state.token = ""//token为空
            Cookie.remove('token')//移除cookie里的token
        },//清楚token
        getToken(state) {
            state.token = Cookie.get('token')//设置vuex中的token为cookie里存放的token
        }//获取token(刷新使用)
    },
    actions: {},

}