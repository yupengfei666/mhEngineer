<template>
	<view id="baoxiujilu" style="background-color: #EBEEF5;">
		<view v-if="selectData.length === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
			———暂无技术支持单———
		</view>
		<view v-else>
			<u-card style="margin-top: 15rpx;display: block;" v-for="item in selectData">
				<view slot="head">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view @click="copyId(item.OrderID)">
								{{item.OrderID}}
							</view>
							<view style="margin-left: 30rpx;">
								<u-button v-if="type > 0" size="mini" @click="progress(item.OrderID)" plain type="success">
									查看进度</u-button>
							</view>
						</view>
						<view style="color: #2979ff;" @click="detailItem(item)">
							详情
						</view>
					</view>
				</view>
				<view slot="body">
					<view style="background-color: #f4f7fc;padding: 10rpx;padding-bottom: 0rpx;">
						<u-tag :text="itemT" :key="itemT" v-for="itemT in item.ProductType" type="warning"
							style="margin-right: 10rpx;margin-bottom: 10rpx;display: inline-block;" mode="plain" />
					</view>
					<view
						style="display: flex;justify-content: space-between;height: 80rpx;align-items: center;border-bottom: solid 2rpx #E4E7ED;">
						<view>上报公司</view>
						<view style="color: #909399;" @click="">
							{{item.CompanyName}}
						</view>
					</view>
					<view
						style="display: flex;justify-content: space-between;height: 80rpx;align-items: center;border-bottom: solid 2rpx #E4E7ED;margin-bottom: 20rpx;">
						<view>上报时间</view>
						<view style="color: #909399;" @click="">
							{{item.RepairsTime}}
						</view>
					</view>
					<view style="text-align: right;position: relative;">
						<u-button v-if="type == 1" type="primary" size="medium" :plain="true" @click="complete(item)"
							style="margin-right: 16rpx;">
							完成</u-button>
						<u-button v-if="type == 0" type="primary" size="medium" :plain="true" @click="accept(item)"
							style="margin-right: 16rpx;">
							接单</u-button>
						<!-- <u-button v-if="type > 1 && item.isRate == 1" type="success" size="medium" :plain="true" @click="rate(item.id)"
							style="margin-right: 16rpx;">
							查看评价</u-button> -->
						<u-button v-if="type == 1" type="primary" size="medium" :plain="true" @click="shift(item)"
							style="margin-right: 16rpx;">
							转单</u-button>
						<u-button v-if="type > 0" type="primary" size="medium" :plain="true" @click="message(item.OrderID)"
							style="margin-right: 16rpx;">
							留言</u-button>
						<u-badge v-if="item.MessageNum > 0" type="error" :count="item.MessageNum"
							style="position: absolute;top: -30rpx;">
						</u-badge>
					</view>
				</view>
			</u-card>
			<u-loadmore :status="status" :load-text="loadText" @loadmore="getNextData" />
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: "loadmore",
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				pageCount: 10,
				pages: 1,
				selectData: [],
				showData: [],
				showDetailVisible: false,
				showDelete: false,
				deleteItemId: '',
				tabList: [{
					name: '全部'
				}, {
					name: '未接单',
					count: 1
				}, {
					name: '进行中',
					count: 0
				}, {
					name: '已完成',
				}],
				current: 0,
				type: 0
			};
		},
		computed: {},
		methods: {
			copyId(val){
				uni.setClipboardData({
					data: val,
					success: function () {
					}
				});
			},
			complete(data) {
				data.ProductType = JSON.stringify(data.ProductType)
				let p = {
					info: JSON.stringify(data),
					type: 4
				}
				this.$myHttp('Order/UpdateOrder', p).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: '完成了订单',
						type: 'success'
					})
					this.initData()
				})
			},
			change(index) {
				this.current = index;
			},
			deleteOk() {
				console.log(this.deleteItemId)
				this.initData()
			},
			deleteItem(val) {
				this.deleteItemId = val
				this.showDelete = true
			},
			showDetail(val) {
				this.showData = val
				this.showDetailVisible = true
			},
			rate(id) {
				uni.navigateTo({
					url: "../tab2/bxrate?id=" + id
				})
			},
			shift(data) {
				uni.navigateTo({
					url: "../tab2/bxshift?data=" + JSON.stringify(data)
				})
			},
			message(id) {
				uni.navigateTo({
					url: "../tab2/bxmessage?id=" + id
				})
			},
			accept(data) {
				data.ProductType = JSON.stringify(data.ProductType)
				let p = {
					info: JSON.stringify(data),
					type: 2
				}
				this.$myHttp('Order/UpdateOrder', p).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: '接单成功',
						type: 'success'
					})
					this.initData()
				})
			},
			progress(id) {
				uni.navigateTo({
					url: "../tab2/bxtimeline?id=" + id
				})
			},
			detailItem(data) {
				data.Describe = encodeURIComponent(data.Describe)
				uni.navigateTo({
					url: "../tab2/baoxiudetail?data=" + JSON.stringify(data)
				});
			},
			getData() {
				let p = {
					OrderID: 'all',
					pageSize: this.pageCount,
					pageIndex: this.pages,
					repairsStatus: this.type
				}
				this.$myHttp('Order/SelectOrder', p).then(res => {
					console.log(res)
					for (let item of res.Data) {
						item.ProductType = JSON.parse(item.ProductType || '[]')
						this.selectData.push(item)
					}
					this.status = this.selectData.length === res.Total ? 'nomore' : 'loadmore'
				})
				uni.stopPullDownRefresh();
			},
			getNextData() {
				this.pages = this.pages + 1;
				this.status = 'loading'
				this.getData();
			},
			initData() {
				this.selectData = []
				this.pages = 1;
				this.getData();
			}
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			this.getNextData()
		},
		onReady() {},
		onShow() {
			this.initData()
		},
		onLoad(data = '') {
			this.type = data.type
			let title = ''
			if (this.type == 0) {
				title = '未接单'
			} else if (this.type == 1) {
				title = '进行中'
			} else {
				title = '已完成'
			}
			uni.setNavigationBarTitle({
				title: title
			});

		}
	}
</script>

<style lang="scss">
	#baoxiujilu {
		width: 100%;

		.card-item {
			display: flex;
			margin-bottom: 16rpx;
		}
	}

	.u-size-medium {
		padding: 0px 50rpx !important;
	}

	.card-item-show {
		display: flex;
		padding: 16rpx;

		:nth-child(1) {
			width: 25%;
			color: #686868
		}

		:nth-child(2) {
			width: 75%;
			text-align: right;
		}
	}
</style>
