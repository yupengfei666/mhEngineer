<template>
	<view class="content">
		<view class="page-section">
			<view class="uni-list">
				<radio-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd"  v-for="(system,index) in musicList" :key="index">
						<view>
							<radio :value="system" :checked="system == musicCheck" />
						</view>
						<view>提示音{{system}}</view>
					</label>
				</radio-group>
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
				musicList: [1,2,3,4,5,6],
				musicCheck: 1
			}
		},
	
		computed: mapState(['forcedLogin',"url"]),
		methods: {
			...mapMutations(['login', 'logout', 'setStorage']),
			checkboxChange: function (e) {
				var values = e.target.value;
				
				const c = uni.createInnerAudioContext();
				c.autoplay = true;
				c.src = "../../static/audio/"+values+".wav";
				c.onPlay(() => {
					console.log(c.src);
				});
				
				
				uni.setStorage({
					key: "musicCheck",
					data: values,
				});
			}
		},
		onShow() {
			
			uni.getStorage({
				key: "musicCheck",
				success: (res) => {
					this.musicCheck = res.data;
				}
			});
			
			uni.getStorage({
				key: "name",
				success: (res) => {
					this.login(res.data);
				},
				fail: () => {
					if (this.forcedLogin) {
						uni.reLaunch({
							url: '../login/login',
						});
					}
					
				}
			});
		}
	}
</script>

<style>
	.page-body {
		width: 100%;
		flex-grow: 1;
		overflow-x: hidden;
	}
	.page-section {
		width: 100%;
		margin-bottom: 60upx;
	}
	.page-section-gap {
		box-sizing: border-box;
		padding: 0 30upx;
	}
	.page-section-title {
		font-size: 28upx;
		color: #999999;
		margin-top: 10upx;
		margin-bottom: 10upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.page-section-gap .page-section-title {
		padding-left: 0;
		padding-right: 0;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
</style>
