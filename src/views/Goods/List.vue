<template>
	<div>
		<el-main>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>商品列表</span>
				</div>
				<el-table :data="tableData" :default-sort="{prop: 'price', order: 'descending'}">
					<el-table-column label="商品名称" prop="img_md" width="150">
						<template slot-scope="scope">
							<img style="width: 30px; height: 30px;" :src="scope.row.img_md" class="head_pic" />
						</template>
					</el-table-column>
					<el-table-column prop="name" width="200">
					</el-table-column>
					<el-table-column prop="price" label="价格" class="el-icon-d-caret" width="120" sortable></el-table-column>
					<el-table-column prop="inventory" label="库存" width="120" sortable>
					</el-table-column>
					<el-table-column prop="create_time" label="发布时间" width="100" sortable>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">
								<el-button type="primary" icon="el-icon-edit"></el-button>
							</el-button>
							<el-button @click="handleDelete(scope.row.id )" type="text" size="small">
								<el-button type="danger" icon="el-icon-delete"></el-button>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
					 :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" layout="sizes, prev, next">
					</el-pagination>
				</div>
			</el-card>
		</el-main>
	</div>
</template>
<script>
	import { Goods } from '@/api/index'
	export default {
		data() {
			return {
				total: 0,
				currentPage: 1,
				tableData: [],
				pageSize: 1,
			}
		},
		created() {
			this.pullData();
			// this.handleDelete(id);
		},
		methods: {
			// 删除
			async handleDelete(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let status = await Goods.remove({ id });
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.pullData();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 合并列
			arraySpanMethod({ row, column, rowIndex, columnIndex }) {
				if (rowIndex % 2 === 0) {
					if (columnIndex === 0) {
						return [1, 2];
					} else if (columnIndex === 1) {
						return [0, 0];
					}
				}
			},
			//  获取列表
			async pullData() {
				var aa = {
					pagesize: this.pageSize,
					pageindex: this.currentPage,
					cate_1st: this.cate_1st,
					cate_2nd: this.cate_2nd,
					cate_3rd: this.cate_3rd,
					sortByPrice: this.sortByPrice,
				};

				let { status, goods } = await Goods.list(aa);
				if (goods.length === 0) {
					this.currentPage = 1;
					this.pullData();
				}
				this.tableData = goods;

			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.pullData();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.pullData();
			}
		}
	}
</script>

<style>
	.box-card {
		width: 1100px;
		margin-left: 15px;
	}
</style>
