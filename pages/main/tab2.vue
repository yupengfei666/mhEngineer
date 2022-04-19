<template>
	<view style="width: 100%;">
		<u-swiper :list="info" height="330"></u-swiper>
		<view style="margin-top: 10rpx;">
			<view style="display: flex;align-items: center;">
				<view style="width: 10rpx;height: 40rpx;background-color: #4399fc;margin: 15rpx 15rpx"></view>
				<span>工单</span>
			</view>
			<u-row gutter="16">
				<u-col span="3" @click="goGd(0)">
					<view style="display: flex;justify-content: center;position: relative;">
						<image src="../../static/img/work/wjd.png" style="width: 70%;" mode="widthFix"></image>
						<u-badge style="position: absolute;top: -20rpx;right: 0rpx;" type="error" :count="gdCount.wjd"></u-badge>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">未接单</span>
				</u-col>
				<u-col span="3" @click="goGd(1)">
					<view style="display: flex;justify-content: center;position: relative;">
						<u-badge style="position: absolute;top: -20rpx;right: 0rpx;" type="error" :count="gdCount.jxz"></u-badge>
						<image src="../../static/img/work/jxz.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">进行中</span>
				</u-col>
				<u-col span="3" @click="goGd(2)">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/ywc.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">已完成</span>
				</u-col>
				<u-col span="3" @click="replaceReport">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/db.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">代报</span>
				</u-col>
			</u-row>
		</view>
		<!-- <view style="margin-top: 10rpx;">
			<view style="display: flex;align-items: center;">
				<view style="width: 10rpx;height: 40rpx;background-color: #4399fc;margin: 15rpx 15rpx"></view>
				<span>设备监控</span>
			</view>
			<u-row gutter="16">
				<u-col span="3" @click="baoxiu">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/sszt.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">实时状态</span>
				</u-col>
				<u-col span="3" @click="goDataQuery">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/lscx.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">故障查询</span>
				</u-col>	
			</u-row>
		</view> -->
		<view style="margin-top: 10rpx;">
			<view style="display: flex;align-items: center;">
				<view style="width: 10rpx;height: 40rpx;background-color: #4399fc;margin: 15rpx 15rpx"></view>
				<span>其它</span>
			</view>
			<u-row gutter="16">
				<u-col span="3" @click="goLocation">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/gxwz.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">更新位置</span>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				info: [{
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=5.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=9.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=7.jpg'
				}],
				gdCount:{
					wjd:0,
					jxz:0
				}
			};
		},
		components: {
		},
		onShareAppMessage() {
			return {
				title: '分享',
				path: 'pages/main/tab2'
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'functionList'])
		},
		methods: {
			...mapMutations(['logout']),
			replaceReport(){
				uni.navigateTo({
					url:'../tab2/baoxiuadd'
				})
			},
			goDataQuery() {
				uni.navigateTo({
					url: '../tab2/dataquery',
				});
			},
			goGd(type) {
				uni.navigateTo({
					url: '../tab2/baoxiujilu?type=' + type,
				});
			},
			goLocation(){
				uni.navigateTo({
					url: '../tab2/location',
				});
			},
			getGdCount(){
				this.$myHttp('Order/SelectCurrentUserOrder').then(res => {
					this.gdCount.wjd = res.Data[0].StatusIs0
					this.gdCount.jxz = res.Data[0].StatusIs1
				})
			}
		},
		onShow() {
			this.getGdCount()
		},
		onLoad() {
		}
	}
</script>

<style>
	.swiper-box {
		width: 750upx;
		height: 350upx;
	}

	.swiper-item {
		width: 750upx;
		height: 350upx;
	}
</style>
