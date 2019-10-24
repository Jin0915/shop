<template>
	<div>
		<NavBar></NavBar>
		<el-container>
			<SiderBar></SiderBar>
			<div class="main">
				<router-view></router-view>
			</div>
		</el-container>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar"
	import SiderBar from "@/components/SideBar"
	export default {
		components: {
			NavBar,
			SiderBar,
		}

	}
</script>

<style>

	body {
		margin: 0;
	}
</style>
