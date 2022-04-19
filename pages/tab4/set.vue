<template>
	<view class="content">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 70upx;padding-left: 0upx;margin-top: 10px;width: 100%;" >
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindGeRenXinXi" >
				修改个人信息
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 70upx;padding-left: 0upx;margin-top: 10px;width: 100%;" >
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindXiuGaiMiMa" >
				修改密码
			</view>
		</view>
<!-- 		待开发
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 70upx;padding-left: 0upx;margin-top: 10px;width: 100%;" >
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindTuiSongFangShi" >
				故障推送
			</view>
		</view> -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 70upx;padding-left: 0upx;margin-top: 10px;width: 100%;" >
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindGuanZhuQiZhongJi" >
				关注起重机
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {

			}
		},
		computed: mapState(['forcedLogin',"url"]),
		methods: {
			bindGeRenXinXi(){
				uni.navigateTo({
					url: '../tab4/set/gerenxinxi',
				});
			},
			bindXiuGaiMiMa(){
				uni.navigateTo({
					url: '../tab4/set/xiugaimima',
				});
			},
			bindTuiSongFangShi(){
				uni.navigateTo({
					url: '../tab4/set/tuisongfangshi',
				});
			},
			bindGuanZhuQiZhongJi(){
				uni.navigateTo({
					url: '../tab4/set/guanzhuqizhongji',
				});
			},
		},
		onShow() {
		}
	}
</script>

<style>
	

</style>
