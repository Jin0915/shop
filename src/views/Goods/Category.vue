<template>
	<div>
		<el-card class="box-card">
			<div>
				<span>商品分类</span>
			</div>
			<!-- 添加弹窗 -->
			<el-dialog :visible.sync="insertModleShow">
				<el-form :model="insertForm">
					<el-form-item label="添加分类" label-width="120px"></el-form-item>
					<el-form-item label="分类名称" label-width="120px">
						<el-input v-model="insertForm.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="insertModleShow = false">取 消</el-button>
					<el-button type="primary" @click="append">确定</el-button>
				</div>
			</el-dialog>
			<!-- 编辑 -->
			<el-dialog :visible.sync="editModleShow">
				<el-form :model="editForm">
					<el-form-item label="分类名称" label-width="120px">
						<el-input v-model="editForm.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editModleShow = false">取 消</el-button>
					<el-button type="primary" @click="eidt">确定</el-button>
				</div>
			</el-dialog>

			<el-tree :props="defaultProps" lazy :load="loadNode" ref="tree">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" :disabled="node.label==='全部分类'?true:false" size="mini" @click.stop="() => editInsertModleShow(data)"
						 icon="el-icon-edit">
							编辑
						</el-button>
						<el-button type="text" size="mini" @click.stop="() => addInsertModleShow(data)" icon="el-icon-plus">
							添加
						</el-button>
						<el-button type="text" :disabled="node.label==='全部分类'?true:false" size="mini" @click="() => remove(node, data)" icon="el-icon-delete">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name',
				},
				insertModleShow: false,
				editModleShow: false,
				delModleShow: false,
				type: '',
				node: '',
				resolve: '',
				// 节点数据
				nodeData: {},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					name: '',
					parent_id: '',
					id: '',

				},
				delForm: {
					id: '',

				},
			};
		},
		methods: {
			// 删除
			remove(node, data) {
				let catec = data;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					let id = catec.pId;
					let { status, data } = await Goods.subCate({ id });
					if (data.length == 0) {
						Goods.remove({ id: catec.pId }).then(res => {
							if (res.status) {
								node.remove();
								this.$message.success('删除成功!');
							}
						});
					} else {
						this.$message.success('有子节点无法删除！！！！');
					}
				});
			},
			// 编辑
			async eidt() {
				let { status, data } = await Goods.edit({ ...this.editForm });
				if (status) {
					this.loadNode(this.node, this.resolve);
					this.editModleShow = false;
				}
			},
			editInsertModleShow(dat) {
				this.editModleShow = true;
				let id = dat.pId;
				this.editForm.id = dat.pId;
				this.editForm.name = dat.name;
				this.editForm.parent_id = dat.parent_id;
			},
			// 添加
			addInsertModleShow(data) {
				this.insertForm.title = "添加分类";
				this.insertModleShow = true;
				this.insertForm.parent_id = data.pId;
				this.nodeData = data;
				this.insertForm.end = "添加";
				this.type = 'add';
			},
			async append() {
				let { status, data } = await Goods.insert({ ...this.insertForm });
				if (status) {
					this.loadNode(this.node, this.resolve);
					this.insertModleShow = false;
				};
			},

			async loadNode(node, resolve) {
				this.node = node;
				this.resolve = resolve;
				if (node.level == 0) {
					let { status, data } = await Goods.sub({ pId: 0 });
					return resolve(data);
				}
				if (node.level > 0) {
					let pId = node.data.id;
					let { status, data } = await Goods.sub({ pId });
					return resolve(data);
				}
			}
		}
	};
</script>

<style>
	.box-card {
		width: 1000px;
		padding: 30px;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
