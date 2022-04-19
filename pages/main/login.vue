<template>
	<view class="container1">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view style="height: 150upx;">
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view style="font-size: 40rpx;margin-bottom: 20rpx;" class="input-content">
				美恒物联网服务平台工程师版
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input 
						type="mobile" 
						v-model="account"
						placeholder="请输入用户名"
						maxlength="11"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
					    v-model="password"
						type="mobile" 
						placeholder="6-18位不含特殊字符的数字、字母"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="bindLogin"
					/>
				</view>
			</view>
			<button  :loading="buttonloading" class="confirm-btn" @click="bindLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				本程序只供内部客户使用，需要先登录方可使用
			</view>
		</view>
		<view v-if="showChangeUrl" style="padding: 20upx;margin: 20upx; border: 1upx solid lightgray;">
			<text class="tit">请求地址</text>
			<input 
				v-model="value"
				style="margin-top: 10upx;border-bottom: 1upx solid lightgray;padding-bottom: 20upx;"
				placeholder="请输入用户名"
			/>
			<view style="margin-top: 20upx;display: flex;justify-content: center;">
				<button class="mini-btn" type="default" @click="setInitUrl" size="mini">初始化</button>
				<button class="mini-btn" type="primary" @click="setTextUrl" size="mini">确定</button>
			</view>
		</view>           
		<button style="position: absolute;bottom: 20upx;right: 20upx;" class="mini-btn" @click="showChangeUrl = true" type="primary" size="mini">更改请求地址</button>
	</view>
</template>

<script>
	import {  
		mapState,
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				logining: false,
				account: '',
				password: '',
				buttonloading: false,
				showChangeUrl: false,
				value: ''
			}
		},
		onReady(){
			const localUrl = uni.getStorageSync('localUrl')
			if (localUrl) {
				this.setUrl(localUrl)
			}
			this.value = this.url
			this.setUrl(this.value)
		},
		onLoad(){
		},
		onShareAppMessage() {
			return {
				title: '分享',
				path: 'pages/main/login'
			}
		},
		computed: mapState(["url", "initUrl"]),
		methods: {
			...mapMutations(['login', 'setUrl']),
			setInitUrl() {
				uni.setStorageSync('localUrl', this.initUrl)
				this.setUrl(this.initUrl)
				this.value = this.initUrl
				uni.showToast({
					icon: 'none',
					title: '修改成功'
				});
			},
			setTextUrl(){
				uni.setStorageSync('localUrl', this.value)
				this.setUrl(this.value)
				uni.showToast({
					icon: 'none',
					title: '修改成功'
				});
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 1 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				this.getData();
			},
			getData() {
				this.buttonloading = true
				uni.request({
					url: this.url + "WeChat/CheckUser",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						name: this.account,
						password: this.password,
						type: 1
					},
					success: (res) => {
						this.buttonloading = false
						console.log(res)
						if (res.data.Code === 0) {
							uni.showToast({
								icon: 'none',
								title: '用户账号或密码不正确',
							})
							return;
						};
						if (res.data.Code === -1) {
							uni.showToast({
								icon: 'none',
								title: '您不是美恒工程师，不允许登录',
							})
							return;
						};
						uni.setStorageSync("name", this.account);
						uni.setStorageSync("password", res.data.Data.session);
						uni.setStorageSync("yonghu", res.data.Data.用户);
						uni.setStorageSync("jituan", res.data.Data.集团);
						uni.setStorageSync("gongsi", res.data.Data.公司);
						uni.setStorageSync("zhiwu", res.data.Data.职务);
						uni.setStorageSync("comanyId", res.data.Data.公司ID);
						this.toMain(this.account);
					},
					fail: () => {
						this.buttonloading = false
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						})
					}
				})
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '../main/tab1',
				});
			}
		},
		onLoad() {
			uni.getStorage({
				key: "name",
				success: (res) => {
					/**
					* 如果需要强制登录跳转回登录页面
					*/
					this.account = res.data;
				}
			});
			uni.getStorage({
				key: "password",
				success: () => {
					/**
					 * 如果需要强制登录跳转回登录页面
					 */
					if (this.forcedLogin) {
						uni.reLaunch({
							url: '../main/tab1',
						});
					}
				}
			});
		}

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container1{
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 390upx;
			height: 72upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 90px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 90px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60rpx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
