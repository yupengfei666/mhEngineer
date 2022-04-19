<template>
    <view class="content">
		<view style="height: 420upx;width: 100%;background: #3A74D5;">
			<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
			<view style="height: 140upx;">
				<view style="background:#3A74D5; padding-top:15upx;width: 100%;" v-if="userInfo != '获取不到用户信息'">
					<view style="text-align:center;">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl" @tap="mpClearUserInfo"></image>
						
					</view>
				</view>
				<view style="width: 100%;padding-top: 40upx;">
					<button type="primary" class="primary" style="background-color: #3A74D5; margin-left:35%;width:30%" 
					open-type="getUserInfo" @getuserinfo="mpGetUserInfo" v-if="userInfo === '获取不到用户信息'">获取微信头像</button>
				</view>
			</view>
			<!-- #endif -->
			<view class="uni-list-cell" style="padding-left: 40upx;height: 70upx;width: 90%;"> 
				<image src="../../static/img/yonghu.png" style="height: 50upx;width: 50upx;"></image>  
				<view class="uni-list-cell-navigate1" style="font-size: 32upx;color:white;">
					用户：{{yonghu}}
				</view>
			</view>
			<view class="uni-list-cell" style="padding-left: 40upx;height: 70upx;width: 90%;">
				<image src="../../static/img/jituan.png" style="height: 50upx;width: 50upx;"></image>  
				<view class="uni-list-cell-navigate1" style="font-size: 32upx;color:white;">
					集团：{{jituan}}
				</view>
			</view>
			<view class="uni-list-cell" style="padding-left: 40upx;height: 70upx;width: 90%;">
				<image src="../../static/img/gongsi.png" style="height: 50upx;width: 50upx;"></image>  
				<view class="uni-list-cell-navigate1"  style="font-size: 32upx;color:white;">
					公司：{{gongsi}}
				</view>
			</view>
			<view class="uni-list-cell" style="height: 70upx;padding-left: 40upx;width: 90%;">
				<image src="../../static/img/zhiwu.png" style="height: 50upx;width: 50upx;"></image>  
				<view class="uni-list-cell-navigate1" style="font-size: 32upx;color:white;">
					职务：{{zhiwu}}
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;margin-top: 10px;width: 95%;" 
		v-if="functionList.indexOf('关注美恒公众号')>-1">
			<image src="../../static/img/fenxiang.png" style="height: 50upx;width: 50upx;"></image> 
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="gongzhonghao" style="font-size: 32upx;">
				关注美恒公众号
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;width: 95%;" v-if="false" >
			<image src="../../static/img/weixin.png" style="height: 50upx;width: 50upx;"></image> 
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="weixin1" style="font-size: 32upx;">
				获取微信信息
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;width: 95%;">
			<image src="../../static/img/set.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="set" style="font-size: 32upx;">
				设置
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;width: 95%;" 
		v-if="functionList.indexOf('关于')>-1">
			<image src="../../static/img/guanyu.png" style="height: 50upx;width: 50upx;"></image> 
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindAbout" style="font-size: 32upx;">
				关于
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="height: 100upx;padding-left: 40upx;width: 95%;">
			<image src="../../static/img/tuichu.png" style="height: 50upx;width: 50upx;"></image>  
			<view class="uni-list-cell-navigate1 uni-navigate-right" @tap="bindLogout" style="font-size: 32upx;">
				退出
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
				userInfo: null,
				yonghu:'',
				jituan:'',
				gongsi:'',
				zhiwu:'',
				indicatorDots: true
			};
		},
        computed: {...mapState(['hasLogin', 'forcedLogin', 'functionList',"url"])},
        methods: {
            ...mapMutations(['logout']),
			gongzhonghao() {
			    uni.navigateTo({
			        url: '../tab4/gongzhonghao',
			    });
			},
			weixin1() {
			    uni.navigateTo({
			        url: '../tab4/get-user-info',
			    });
			},
			weixin2() {
			    uni.navigateTo({
			        url: '../tab4/weixin',
			    });
			},
            bindAbout() {
                uni.navigateTo({
                    url: '../tab4/about',
                });
            },
            bindLogout() {
				uni.removeStorageSync('password');
				uni.removeStorageSync('systemCheck')
				uni.reLaunch({
					url: '../main/login',
				});
            },
			bindWenTiFanKui(){
				uni.navigateTo({
					url: '../tab4/wentifankui',
				});
			},
			tapSwitchChange(){
				this.indicatorDots = !this.indicatorDots;
			},
			switchChange(e) {
				uni.setStorage({
					key: "ShengYinTiXing",
					data: e.target.value,
				});
			},
			checkMusic(){
				uni.navigateTo({
					url: '../tab4/checkmusic',
				});
			},
			set() {
				uni.navigateTo({
					url: '../tab4/set',
				});
			},
			// 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
			getUserInfo() {
				uni.getUserInfo({
					provider: this.loginProvider,
					success: (result) => {
						console.log('getUserInfo success', result);
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
					}
				});
			},
			mpClearUserInfo() {
				this.userInfo = '获取不到用户信息';
				uni.request({
					url: this.url + "WeChat/SetUserImageUrl",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						ImageUrl : '',
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../main/login',
								});
							}else
							{
								uni.showToast({
									icon: 'none',
									title: res.data,
								});
							}
						} 
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
					}
				})
			},
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				this.userInfo = result.detail.userInfo;
				console.log(JSON.stringify(this.userInfo))
				uni.request({
					url: this.url + "WeChat/SetUserImageUrl",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						ImageUrl : JSON.stringify(this.userInfo),
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../main/login',
								});
							}else
							{
								uni.showToast({
									icon: 'none',
									title: res.data,
								});
							}
						} 
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
					}
				})
			},
			GetUserImageUrl () {
				uni.request({
					url: this.url + "WeChat/GetUserImageUrl",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							if(res.data==='获取不到用户信息')
							{
								this.userInfo = '获取不到用户信息'
							}
							else
							{
								this.userInfo = JSON.parse(res.data)
							}
							console.log(this.userInfo)
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
					}
				})
			},
        },
		onShow(){
			this.GetUserImageUrl()
		}
		,
		onLoad() {
			uni.getStorage({
				key: "yonghu",
				success: (res) => {
					this.yonghu = res.data;
				},
				fail: () => { 
					this.yonghu = '';
				}
			});
			uni.getStorage({
				key: "jituan",
				success: (res) => {
					this.jituan = res.data;
				},
				fail: () => {
					this.jituan = '';
				}
			});
			uni.getStorage({
				key: "gongsi",
				success: (res) => {
					this.gongsi = res.data;
				},
				fail: () => {
					this.gongsi = '';
				}
			});
			uni.getStorage({
				key: "zhiwu",
				success: (res) => {
					this.zhiwu = res.data;
				},
				fail: () => {
					this.zhiwu = '';
				}
			});
		}
    }
</script>

<style>
	.userinfo-avatar {
		border-radius: 128upx;
		width: 128upx;
		height: 128upx;
	}
</style>
