import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        userName: "",
		initUrl: 'https://www.mhitco.com:9092/api/',
		url:"https://www.mhitco.com:9092/api/",
		// url:"http://www.mhitco.com:9098/api/",
		functionList: []
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
        },
        logout(state) {
            state.userName = "";
        },
		setFunctionList(state,functionList) {
			state.functionList = functionList
		},
		setUrl(state, url) {
			state.url = url
		}
    }
})

export default store
