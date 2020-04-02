<template>
	<div class="banner">
		<div class="bgcolor">
			<div class="title">登录</div>
<!--			<div>我更改了这里</div>-->
			<div class="bg-size">
				<el-form ref="form"  :model="user" :rules="rules">
					<el-form-item :span="10" label="账户" prop="username">
						<el-input v-model="user.username" placeholder="请输入登录用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="user.password" placeholder="请输入登录密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="loginHandle">登录</el-button>
					</el-form-item>
				</el-form>
				<el-row :gutter="20">
					<el-col :span="6"><a href="">注册账户</a></el-col>
					<el-col :span="6" :offset="6" class="forget"><a href="">忘记密码？</a></el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';
	export default {
		data() {
			return {
				user: {
					username: '',
					password: '',
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ type: 'string', pattern: /^[0-9]{3,}$/, message: '至少3个字符', }
					],
				}
			}
		},
		methods: {
			loginHandle() {
				// 提取数据
				let formData = { ...this.user };
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Admin.login(formData);
						if (status) {
							// 储存token
							sessionStorage.token = data.token; //解构出的data的token赋值给sessionStorage.token
							// 储存id
							sessionStorage.id = data.id; //解构出的data的id赋值给sessionStorage.id
							this.$message({
								showClose: true,
								message: msg,
								type: 'success',
								duration: 1000,
								onClose: () => {
									this.$router.push('/goods');
								}
							});
						} else {
							this.$message.error(msg);
						}
					}
				});

			}
		}
	}
</script>

<style>
	.forget a {
		padding-left: 24px;
	}

	a {
		text-decoration: none;
		color: #337ab7;
	}

	.el-col-6 {
		width: 37%;
	}

	.title {
		background-color: #d9edf7;
		height: 41px;
		line-height: 41px;
		padding-left: 15px;
	}

	.el-input__inner,
	.el-button--primary {
		width: 368px;
	}

	.el-form-item__content {
		line-height: 39px;
	}

	.bg-size {
		padding: 0 15px;
		/* height: 315px; */
	}

	.bgcolor {
		background-color: white;
		width: 400px;
		height: 350px;
		position: fixed;
		bottom: 102px;
		right: 20px;
	}

	.banner {
		display: flex;
		background-image: url(../../../public/admin/img/login-bg.04256fab.jpg);
		min-height: calc(100vh);
		background-size: cover;

		.el-row {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.el-col {
			border-radius: 4px;
		}

		.bg-purple-dark {
			background: #99a9bf;
		}

		.bg-purple {
			background: #d3dce6;
		}

		.bg-purple-light {
			background: #e5e9f2;
		}

		.grid-content {
			border-radius: 4px;
			min-height: 36px;
		}

		.row-bg {
			padding: 10px 0;
			background-color: #f9fafc;
		}
	}
</style>
