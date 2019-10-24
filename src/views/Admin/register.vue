<template>
	<div class="banner">
		<div class="bgcolor">
			<div class="title">注册</div>
			<div class="bg-size">
				<el-form ref="form" :model="user" :rules="rules">
					<el-form-item :span="10" label="账户" prop="username">
						<el-input v-model="user.username" placeholder="请输入登录用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="user.password" placeholder="请输入登录密码"></el-input>
					</el-form-item>
					<el-form-item label="昵称" prop="nickname">
						<el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="user.sex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="手机" prop="tel">
						<el-input v-model="user.tel" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
					 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					<el-form-item label="" prop="checkbox">
						<el-checkbox v-model="user.checkbox" label="已同意"></el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">注册</el-button>
					</el-form-item>
				</el-form>
				<el-row :gutter="20">
					<el-col :span="6"><a href="">登录账户</a></el-col>
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
				imageUrl: '',
				fileList: [
					{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
					{ name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
				],
				user: {
					username: '',
					password: '',
					nickname: '',
					sex: '',
					tel: '',
					email: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					checkbox: {},
				},
				rules: {
					username: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ type: 'string', pattern: /^[0-9]{3,}$/, message: '至少3个字符', trigger: 'blur' }
					],
					nickname: [
						{ required: true, message: '用户昵称不能为空', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '手机号码不能为空', trigger: 'blur' },
						{ type: 'string', pattern: /^1((3|5|8){1}\d{1}|70)\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{ type: 'string', pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/, message: '请输入正确的邮箱地址',
							trigger: 'blur' }
					],
					checkbox: [
						{ type: 'object', message: '请勾选协议', trigger: 'change' },
						{ type: 'object', message: '', trigger: 'change' },
					]
				},
			}
		},
		methods: {
			handleRemove(file, fileList) {
				// console.log(file, fileList);
			},
			handlePreview(file) {
				// console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			onSubmit() {
				// 提取数据
				let data = { ...this.user };
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.register(data);
						if (status) {
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
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

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
		height: 315px;
	}

	.bgcolor {
		background-color: white;
		width: 400px;
		margin: 20px 20px 0 900px;
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
