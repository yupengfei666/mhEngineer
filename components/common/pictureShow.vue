<template>
	<!-- 图片展示 -->
	<view id="pictureShow" style="width: 100%;">
		<u-row gutter="16">
			<u-col span="12" v-for="(item, index) in imgArr">
				<image @click="previewImg(index)" mode="aspectFit" style="width: 100%;" :src="item"></image>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import {BASE_URL} from '../../common/api.js'
	export default {
		name: 'pictureShow',
		props: {
			imgData: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				imgArr: []
			}
		},
		mounted(){
			for (let item of this.imgData) {
				this.imgArr.push(BASE_URL + '/Image/GetImage?image=' + item)
			}
		},
		methods: {
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.imgArr
				})
			}
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";
</style>