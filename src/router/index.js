import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)
export default new Router({
	routes: [{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Admin/register'),
	}, {
		path: '/',
		alias: '/login',
		name: 'Login',
		component: () => import('@/views/Admin/Login'),
	}, {
		path: '/goods/',
		name: 'Goods',
		component: Layout,
		children: [{
				path: 'list',
				name: 'GoodsList',
				component: () => import('@/views/Goods/List'),
			},
			{
				path: 'category',
				name: 'GoodsCategory',
				component: () => import('@/views/Goods/Category'),
			},
			{
				path: 'release',
				name: 'GoodsRelease',
				component: () => import('@/views/Goods/Release'),
			}
		],




	}],






})
