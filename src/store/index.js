import Vue from 'vue' // 本文件是原来的store衍生出来的 目的是为了module 原来的store会被删掉
import Vuex from 'vuex'
Vue.use(Vuex)

// 持久化插件
import createPersistedState from 'vuex-persistedstate'

import menu from './modules/menu/index' // index 可以省略 nodejs会进行找
import admin from './modules/admin/index' // index 可以省略 nodejs会进行找 
import card from './modules/card/index' // index 可以省略 nodejs会进行找

export default new Vuex.Store({ // 声明的参数  
	state: {},
	mutations:  {},
	actions: {}, // 可以拆分
	getters: {},
	modules: {
		menu,
		admin,
		card,
	},
	plugins: [createPersistedState()],
})
// 原来的 store.js文件
// import Vue from 'vue' // 本文件是原来的store衍生出来的 目的是为了module 原来的store会被删掉
// import Vuex from 'vuex'
// Vue.use(Vuex)


// export default new Vuex.Store({ // 
// 	state: {},
// 	mutations: {},
// 	actions: {
// 		async loadInfo({ commit }) { // 提交mutation
// 			let { id } = sessionStorage;
// 			let { status, data } = await Admin.info({ id }); // 去ajax请求数据
// 			if (status) {
// 				commit('saveUserInfo', data);
// 			}
// 			return data; // 返回的是一个promise
// 		},

// 	},

// })
// vuex笔记 
// 整个应用就是一个state state简单的应用可以使用 复杂了就没有办法维护  解决方案： 把每一个state拆分出去（企业级的中大型下项目）Module--模块化
// 组件依赖的状态放到仓库中,解决非父子组件消息传递问题  
// 应用场景：非父子组件消息传递或者同步的时候
// metheds 不区分同步异步 actions 只能异步 mutations 会影响state     computed 类比于getter
// actions 处理ajax 提交数据更改动作mutations  组件有交互 触发dispatch actions回到开头  commit触发得是mutations
// 有选择的使用vuex 
// vuex优点（特点）:
// 1.解决了非父子组件,传递消息更方便一些
// 2.减少ajax请求的次数,有些情境中直接在内存中state中获取
// vuex缺点:
// 1.刷新浏览器,vuex中的state数据就会重新变成初始化状态,不利于持久化保存数据,解决方案vuex-along
// 持久化保存原理
// let persist = store => {
// 	// 当 store 初始化后调用 ,取出localStorage里面的state
// 	if (localStorage.state) {
// 		store.replaceState(JSON.parse(localStorage.state)); // 永久保存 转化成Json
// 	}
// 	store.subscribe((mutation, state) => {
// 		// 每次 mutation 之后调用
// 		// mutation 的格式为 { type, payload }
// 		localStorage.state = JSON.stringify(state); // 永久保存 转化成Json
// 	})
// }
