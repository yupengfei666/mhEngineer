<template>
	<view id="bxtimeline" style="padding: 20rpx;background-color: white;height: 100vh;">
		<u-time-line>
			<u-time-line-item nodeTop="2" v-for="(item,index) in list" :key="index">
				<template v-slot:node>
					<view>
						<u-icon name="star-fill" color="#4cd964" :size="28"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">{{item.Action}}</view>
						<view class="u-order-desc">
							<span>{{item.Describe}}</span>
							<view v-if="item.tel" @click="callPhone(item.tel)" style="margin-top: 10rpx;color: #007AFF;font-weight: bold;">
								{{item.tel}}
							</view>
						</view>
						<view class="u-order-time">{{item.CreateTime}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list:[],
				orderId: ''
			}
		},
		computed: {},
		methods: {
			callPhone(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				});
			},
			getData(){
				let p = {
					OrderID: this.orderId,
					pageSize: 100,
					pageIndex: 1
				}
				this.$myHttp('Order/SelectOrderLog', p).then(res => {
					this.list = res.Data
					this.list.reverse()
					// 如果log中有电话号则根据规则解析 '$**$'
					for (let item of this.list) {
						let str = item.Describe
						let pattern = /\$(.*)\$/g
						let result = pattern.exec(str)
						if (result) {
							item.Describe = item.Describe.substring(0, result.index)
							item.tel = result[1]
						}
					}
				})
			}
		},
		onLoad(val) {
			console.log(val)
			this.orderId = val.id
			this.getData()
		}
	}
</script>

<style lang="scss">
	#bxtimeline {
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}

		.u-order-desc {
			margin-top:30rpx;
			color: #606266;
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}

		.u-order-time {
			margin-top:15rpx;
			color: #606266;
			font-size: 26rpx;
		}

		.u-time-axis::before {
			border-left-color: #4cd964 !important;
			border-left-width: 2px !important;
		}
	}
</style>
