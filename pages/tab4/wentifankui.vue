<template>
	<view style="width: 100vw;">
		<u-search style="margin-top: 10rpx;" placeholder="请输入内容" v-model="keyword" :action-style="{color: '#18b566'}">
		</u-search>
		<h3 style="margin: 20rpx">常见问题</h3>
		<u-cell-group style="margin-bottom: 100rpx;">
			<u-cell-item title="需求反馈奖励机制"></u-cell-item>
		</u-cell-group>
		<view style="position: fixed;bottom: 0rpx;">
			<view style="display: flex;">
				<u-button type="primary" style="width: 50vw;">我的反馈</u-button>
				<u-button type="success" style="width: 50vw;" @click="goAddFk">我要反馈</u-button>
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
				keyword: ''
			}
		},
		computed: {
		},
		methods: {
			goAddFk(){
				uni.navigateTo({
					url: "./addfankui"
				});
			}
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
