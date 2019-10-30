import Vue from 'vue'
import axios from 'axios'
// // 路由实例
import router from '@/router'
// 服务加载 实例
import { Loading, Message } from 'element-ui'; //添加一个提示框 单独引用
let loading;
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.7)' });
	// 注册||登录请求忽略
	if (config.url == '/admin/login' || config.url == '/admin/register') { //解决注册或者登陆的时候会出现检测token
		return config;
	}
	// 添加/获取token
	let token = sessionStorage.token; //向Nextwork的request Header中添加Authorization
	// 如果没有token
	if (!token) {
		Message.error({ //对象 里面放的是键值对
			message: "登录密码或者用户账号输入错误！",
			onClose: () => {
				router.replace('/login'); //访问路由实例
				loading.close();
			}
		});
	}
	config.headers.Authorization = `Bearer ${token}`; //利用模板字符串进行拼接
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(({ status, data }) => {
	loading.close();

	//在这里你可以判断后台返回数据携带的请求码
	if (status === 200) {
		return data;
	} else {
		// 非200请求报错
		throw Error(data.msg || '服务异常')
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
