import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)
export default new Router({
	routes: [{
			path: '/card',
			name: 'Card',
			component: () => import('@/views/card'),
		},
		{
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
		}, {
			path: '/order/',
			name: 'Order',
			component: Layout,
			children: [{
				path: 'list',
				name: 'OrderList',
				component: () => import('@/views/Order/List'),
			}]
		},
		{
			path: '/admin/',
			name: 'Admin',
			component: Layout,
			children: [{
					path: 'info',
					name: 'AdminInfo',
					component: () => import('@/views/Admin/Info'),
				},
				{
					path: 'list',
					name: 'AdminList',
					component: () => import('@/views/Admin/List'),
				}
			]
		},
		{
			path: '/auth/',
			name: 'Auth',
			component: Layout,
			children: [{
					path: 'role',
					name: 'AuthRole',
					component: () => import('@/views/Auth/Role'),
				},
				{
					path: 'menu',
					name: 'AuthMenu',
					component: () => import('@/views/Auth/Menu'),
				}
			]
		},

	],






})
