<template>
	<div class="SideBar">
		<el-aside width="241px">
			<el-menu router background-color=" rgb(51, 78, 102)" text-color="#fff" active-text-color="#ffd04b">
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-goods"></i>商品管理</template>
					<el-menu-item-group>
						<el-menu-item index="/goods/category">商品分类</el-menu-item>
						<el-menu-item index="/goods/Release">发布商品</el-menu-item>
						<el-menu-item index="/goods/list">商品列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title"><i class="el-icon-files"></i>订单管理</template>
					<el-menu-item-group>
						<el-menu-item index="/Category/List">订单列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title"><i class="el-icon-setting"></i>账户设置</template>
					<el-menu-item-group>
						<el-menu-item index="/user/list">账户信息</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title"><i class="el-icon-user"></i>用户管理</template>
					<el-menu-item-group>
						<el-menu-item index="/role/list">用户列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title"><i class="el-icon-set-up"></i>权限设置</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/list">用户角色</el-menu-item>
						<el-menu-item index="/admin/list">菜单权限</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				data: [

				]
			}
		},
		watch: {
			$route() {
				if (this.$route.meta.parentPath) {
					this.pagedefault = this.$route.meta.parentPath; // 实现路由切换
				}
			}
		},

	}
</script>

<style>
	.SideBar {
		width: 240px;
		min-height: calc(100vh - 41px);
		color: white;
		background-color: rgba(51, 78, 102)
	}
</style>
