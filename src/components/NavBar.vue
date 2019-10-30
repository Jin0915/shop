<template>
	<div class="nav-bar">
		<el-header>
			<img style="width: 200px;" src="../../public/admin/img/logo.efe6a81a.png" alt="">
			<i @click="toggle" class="el-icon-s-fold"></i>
			<el-dropdown style="float: right; padding: 5px 20px;border-radius: 5px;">
				<span>
					<img style="width: 25px;border-radius: 5px;vertical-align: middle; padding-bottom:12px;" :src="userInfo.avatar"
					 alt="">
					<span style="vertical-align: middle;margin-left: 15px;width: 100px;display: inline-block; color:white">{{userInfo.username}}</span>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<template slot-scope="scope">
							<router-link :to="{name:'AdminInfo'}">
								账户设置
							</router-link>
						</template>
					</el-dropdown-item>
					<el-dropdown-item>切换账户</el-dropdown-item>
					<el-dropdown-item>注销</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
	</div>
</template>

<script>
	import { mapMutations, mapState, mapActions } from 'vuex' // 引进mapState   mapActions改进获取管理员资料

	export default {
		data: function() { // vue中data相当于Vuex中的state
			return {
				activeIndex: '1',
			}
		},
		created() { // 加载数据
			this.loadInfo().then(user => {
				this.$message.success(`欢迎${user.role_name}:${user.username}`); // es6的模板字符串
			});
		},
		methods: {
			...mapMutations('menu', { //当toggle 和后面的 CollapseMeun不一样的时候 用对象的形式进行写
				toggle: 'CollapseMeun' // 把toggle click事件映射到CollapseMeun上
			}),
			// 获取管理员资料
			...mapActions('admin', [ //当toggle 和后面的 CollapseMeun不一样的时候 用对象的形式进行写
				'loadInfo' // 把toggle click事件映射到CollapseMeun上
			]),

		},
		computed: {
			...mapState('admin', ['userInfo'])
		}, // 优点: 实现消息的传递 缺点：清空数据放到sessionStorage中，刷新后再次拿出来
	}
</script>

<style>
	.el-header {
		background-color: black;
		color: #333;
		line-height: 60px;
	}
</style>
