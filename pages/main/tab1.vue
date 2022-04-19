<template>
	<view class="content">
		<u-empty style="margin-top: 30%;" text="功能正在开发中" mode="page"></u-empty>
	</view>
</template>

<script>
	var _self;
	var canvaLineA = null;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
			};
		},
		methods: {
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

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
