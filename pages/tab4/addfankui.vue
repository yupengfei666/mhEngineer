<template>
	<view style="width: 100vw;">
		<view style="margin-top: 20rpx;margin-left: 20rpx;font-size: 32rpx;">
			请先选择您反馈的问题类型
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
				keyword: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'url'])
		},
		methods: {

		}
	}
</script>

<style>
	.textarea1 {
		height: 500upx;
		width: 690upx;
		padding: 0 30upx;
		margin-top: 30upx;

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
