<template>
	<view class="content" >
		<view style="display: flex;flex-direction:column;align-items : center;">
			<image src="../../static/img/logo/logo.png" style="height: 150upx;width: 150upx;"></image> 
			<view class="label">美恒起重机工业物联网服务平台-小程序端</view>
			<view class="label">当前版本:1.3.25</view>
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
			}
		},
		computed: { ...mapState(['hasLogin', 'forcedLogin', 'url'])
		},
		methods: {
			...mapMutations(['logout'])
		}
	}
</script>

<style>
	.textare {
		height: 200upx;
		width: 100%;
	}

	.textarea-wrp {
		margin: 5upx;
		padding: 0 20upx;
		background-color: #ebebeb;
	}

	.text {
		margin: 5upx;
		padding: 0 20upx;
		background-color: #ebebeb;
		height: 70upx;
		line-height: 70upx;
	}
</style>
