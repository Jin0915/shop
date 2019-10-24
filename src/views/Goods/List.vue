<template>
	<div>
		<el-main>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>商品列表</span>
				</div>
				<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'price', order: 'descending'}" >
					<el-table-column prop="main_photo" width="150">
						<template slot-scope="scope">
							<img style="width: 30px; height: 30px;" :src="scope.row.main_photo" class="head_pic" />
						</template>
					</el-table-column>
					<el-table-column fixed prop="name" label="商品名称" width="300" border-left='0'>
					</el-table-column>

					<el-table-column prop="price" label="价格" class="el-icon-d-caret" width="120" sortable></el-table-column>
					<el-table-column prop="inventory" label="库存" width="120" sortable>
					</el-table-column>
					<el-table-column prop="create_time" label="发布时间" width="120" sortable>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
							<el-button type="text" size="small">编辑</el-button>
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
		},
		methods: {
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
				console.log(goods)
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
