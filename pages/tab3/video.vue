<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt" v-if="showVideo">
			<view>
				<view style="width: 100%;">
					美恒智慧起重机体验中心
				</view>
<!-- 				<video
				  id="myVideo" 
				  src="http://localhost:8012/playlist.m3u8" 
				  binderror="videoErrorCallback" 
				  danmu-list="" 
				  show-center-play-btn='false' 
				  show-play-btn="true" 
				  controls
				  picture-in-picture-mode="['push', 'pop']"
				></video> -->
				<video
				  id="myVideo" 
				  src="http://hls01open.ys7.com/openlive/348cccd2b70343839c8da584a75c4326.hd.m3u8" 
				  binderror="videoErrorCallback" 
				  danmu-list="" 
				  show-center-play-btn='false' 
				  show-play-btn="true" 
				  controls
				  picture-in-picture-mode="['push', 'pop']"
				></video>
<!-- 				<video
				  id="myVideo" 
				  src="http://127.0.0.1:8089/api/HKWS/GetVideo?filename=1.mp4" 
				  binderror="videoErrorCallback" 
				  danmu-list=""
				  show-center-play-btn='false' 
				  show-play-btn="true" 
				  controls
				  picture-in-picture-mode="['push', 'pop']"
				></video> -->
				<!--video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
				 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/poster.png"></video-->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'video',
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				showVideo: false
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
      // #ifdef APP-PLUS || MP-BAIDU
      setTimeout(()=>{
      	this.showVideo = true
      },350)
      // #endif
      // #ifndef APP-PLUS || MP-BAIDU
      this.showVideo = true
      // #endif
		},
		methods: {
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style>
	.uni-padding-wrap{
		width:690upx;
		padding:0 30upx;
	}
	.uni-common-mt{
		margin-top:30upx;
	}
	video {
		width: 690upx;
	}
</style>
