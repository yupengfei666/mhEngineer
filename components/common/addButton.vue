<template>
	<view class="addButton">
		<view id="cButton" class="cButton" @click="$emit('click')">
			<span style="margin-top: -10rpx;">+</span>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'addButton',
		props: {
		},
		data() {
			return {
			}
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.addButton{
		.cButton{
				background-color: #18B566;width: 80rpx;height: 80rpx;border-radius: 50%;display: flex;
				justify-content: center;align-items: center;position: fixed;z-index: 9;
				bottom: 3%;right: 3%;font-size: 44rpx;box-shadow: 0rpx 0rpx 16rpx green;color: white;
		}
	}
	
</style>