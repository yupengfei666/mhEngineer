<template>
	<view style="padding: 20rpx;">
		<u-row gutter="16">
			<u-col span="12" v-for="(item, index) in imgArr">
				<image @click="previewImg(index)" mode="aspectFit" style="width: 100%; background-color: #eeeeee;" :src="item"></image>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import {BASE_URL} from '../../common/api.js'
	export default {
		components: {},
		data() {
			return {
				src: '../../static/img/baoxiu.png',
				imgArr: []
			}
		},
		computed: {},
		methods: {
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.imgArr
				})
			}
		},
		onLoad(val) {
			let data = JSON.parse(val.img)
			for (let item of data) {
				this.imgArr.push(BASE_URL + '/Image/GetImage?image=' + item)
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}



	.text {
		font-size: 26upx;
		margin-top: 10upx;
	}

	.goods-carts {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
