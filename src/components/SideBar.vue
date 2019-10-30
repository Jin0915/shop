<template>
	<div class="SideBar">
		<el-menu router :collapse="isCollapse" background-color=" rgb(51, 78, 102)" text-color="#fff" active-text-color="#ffd04b"
		 class="el-menu-vertical-demo">
			<el-submenu index="1">
				<template slot="title"><i class="el-icon-goods"></i>
					<span slot="title">商品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/goods/category">商品分类</el-menu-item>
					<el-menu-item index="/goods/Release">发布商品</el-menu-item>
					<el-menu-item index="/goods/list">商品列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title"><i class="el-icon-files"></i>
					<span slot="title">订单管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/order/list">订单列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title"><i class="el-icon-setting"></i>
					<span slot="title">账户设置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/admin/info">
						账户信息
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title"><i class="el-icon-user"></i>
					<span slot="title">用户管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/admin/list">
						用户列表
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title"><i class="el-icon-set-up"></i>
					<span slot="title">权限设置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/auth/role">用户角色</el-menu-item>
					<el-menu-item index="/auth/menu">菜单权限</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data: function() {
			return {}
		},
		watch: {
			$route() {
				if (this.$route.meta.parentPath) {
					this.pagedefault = this.$route.meta.parentPath; // 实现路由切换
				}
			},
		},
		computed: mapState('menu', ['isCollapse']),

	}
</script>

<style>
	.SideBar {
		width: 240px;
		min-height: calc(100vh - 41px);
		color: white;
		background-color: rgba(51, 78, 102)
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 239px;
		min-height: 400px;
	}
	.el-menu{
		    border-right: solid 1px rgba(51, 78, 102,1) !important;
	}
</style>
