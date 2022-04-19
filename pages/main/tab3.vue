<template>
    <view class="content">
		<uni-swiper-dot :info="info" :current="current" field="content" mode="nav" >
			<swiper class="swiper-box" @change="change" indicator-dots="true" indicator-color="gray" indicator-active-color="#fff" autoplay="true" interval="8000">
				<swiper-item v-for="(item ,index) in info" :key="index">
						<image :src="item.images" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;margin-top: 10px;width: 95%;"
		v-if="functionList.indexOf('故障查询')>-1">
			<image src="../../static/img/lishiguzhang.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="lishiguzhang" style="font-size: 32upx;">
				故障查询
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;margin-top: 10px;width: 95%;"
		v-if="functionList.indexOf('隐患查询')>-1">
			<image src="../../static/img/yinhuanchaxuun.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="lishiyinhuan" style="font-size: 32upx;">
				隐患查询
			</view>
		</view>
		<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;margin-top: 10px;width: 95%;"
		v-if="functionList.indexOf('隐患查询')>-1">
			<image src="../../static/img/shipin.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="openVideo" style="font-size: 32upx;">
				监控视频
			</view>
		</view> -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;margin-top: 10px;width: 95%;"
		v-if="functionList.indexOf('体验账号信息')>-1">
			<image src="../../static/img/tiyanzhanghao.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="openTiyanzhanghao" style="font-size: 32upx;">
				体验账号
			</view>
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
					    content: '',
						images:'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=3.png'
				}, {
				    content: '',
					images:'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=4.png'
				}],
				current: 0,
			};
		},
        computed: {...mapState(['hasLogin', 'forcedLogin', 'functionList'])},
        methods: {
            ...mapMutations(['logout']),
			change(e) {
			    this.current = e.detail.current;
			},
			lishiguzhang() {
				console.log(2342)
				uni.navigateTo({
					url: '../tab3/lishiguzhang',
				});
			},
			lishiyinhuan(){
				uni.navigateTo({
					url: '../tab3/lishiyinhuan',
				});
			},
			openVideo(){
				uni.navigateTo({
					url: '../tab3/video',
				});
			},
			openTiyanzhanghao(){
				uni.navigateTo({
					url: '../tab3/tiyanzhanghao',
				});
			}
        },
	
		onLoad() {
			
		}
    }
</script>

<style>
	.swiper-box{width: 750upx;height: 350upx;}
	.swiper-item{width: 750upx;height: 350upx;}
</style>
