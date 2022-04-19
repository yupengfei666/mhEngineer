<template>
	<view id="bxrate" style="padding: 20rpx;background-color: white;height: 100vh;width:100%">
		<view style="display: flex;flex-direction: column;align-items: center;">
			<h2 style="margin-top: 20rpx;" class='uni-h4'>{{text}}</h2>
			<u-rate style="margin-top: 20rpx;" :disabled="true"  :count="count" :min-count="1" v-model="cvalue" :size="57"></u-rate>
			<u-input v-model="content" :disabled ="true" placeholder="请输入评价内容" style="width: 90%;margin-top: 60rpx;" type="textarea" :border="true" :height="200"/>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				gdId: '',
				text: '',
				count:5,
				cvalue:5,
				content: '我觉得你做的非常好'
			}
		},
		computed: {},
		methods: {
			getRate(){
				this.text = '满意'
				this.count = 5
				this.content = '我觉得你做的非常好'
			}
		},
		onLoad(val) {
			this.gdId = val.id
			this.getRate()
		}
	}
</script>

<style>
</style>
