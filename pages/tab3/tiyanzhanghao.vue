<template>
	<view class="content">
		<view v-if="selectAgent.length === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
			———暂无数据———
		</view>
		<view class="uni-list-cell"  v-for="(oldAgent,index) in selectAgent" :key="index" v-else>
			<view class="uni-list-cell-navigate  uni-navigate-badge">
				<view class="view1">
					<view class="uni-list-cell-navigate"  >
						<view style="display: flex;width: 100%;">
							<view style="width: 35%;color:#8a8a8a;">
								体验账号名称
							</view>
							<view style="width: 65%;" >
								{{oldAgent['Name']}}
							</view>
						</view>
					</view>
				</view>
				<view class="view1">
					<view class="uni-list-cell-navigate"  >
						<view style="display: flex;width: 100%;">
							<view style="width: 35%;color:#8a8a8a;">
								体验账号密码
							</view>
							<view style="width: 65%;" >
								{{oldAgent['Password']}}
							</view>
						</view>
					</view>
				</view>
				<button type="primary" hover-class="uni-hover" class="primary" @tap="ok(oldAgent)" style="margin-left:5%;width: 90%;">
					<view style="display: flex;flex-direction: row;justify-content: center;">
						<view>
							一键切换体验账号
						</view>
					</view>
				</button>
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
				selectAgent:[]
			};
		},
		computed: mapState(["url", "functionList"]),
		methods: 
		{
			...mapMutations(['login','setFunctionList']),
			cheAgent() {
				uni.navigateTo({
					url: "./zhuangtaiquxian"
				});
			},
			getAppOldAgent() {
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				uni.request({
					url: this.url + "WeChat/GetTiyan",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					success: (res) => {
						uni.stopPullDownRefresh();
						uni.hideToast()
						if(res.statusCode!== 200){
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../tab4/login',
								});
							}
						}else
						{
							if(res.data === '无')
							{
								return
							}
							this.selectAgent = [];
							for(var i =0;i<res.data.length;i++)
							{
								this.selectAgent.push(res.data[i]);
							}

						}
					},
					fail: () => {
						uni.stopPullDownRefresh();
						uni.hideToast()
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
					}
				})
			},
			GetFunction () {
				uni.request({
					url: this.url + "WeChat/GetFunction",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../tab4/login',
								});
							}
						} else {
							this.setFunctionList(res.data)
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
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
			},
			ok(oldAgent){
				uni.request({
					url: this.url + "WeChat/CheckUser",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						name: oldAgent.Name,
						password: oldAgent.Password
					},
					success: (res) => {
						this.buttonloading = false
						if (res.data.Code !== 1) {
							uni.showToast({
								icon: 'none',
								title: '用户账号或密码不正确',
							})
							return;
						};
						uni.setStorageSync("name", oldAgent.Name);
						uni.setStorageSync("password", res.data.Data.session);
						uni.setStorageSync("yonghu", res.data.Data.用户);
						uni.setStorageSync("jituan", res.data.Data.集团);
						uni.setStorageSync("gongsi", res.data.Data.公司);
						uni.setStorageSync("zhiwu", res.data.Data.职务);
						this.GetFunction();
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
			}
		},

		onPullDownRefresh() {
			this.getAppOldAgent();
		},
		onLoad(e) {
			this.getAppOldAgent();
		}
	}
</script>

<style>

		.view2{
			width: 50%;
			align-items: flex-start;
			white-space: nowrap; 
			text-overflow:ellipsis; 
			overflow:hidden; 
		}
		
		.view1{
			width: 100%;
			align-items: flex-start;
			
		}
		
		.view3{
			width: 30%;
			align-items: flex-start;
		}
		

		.view4{
	
			width: 30%;
			align-items: flex-start;
		}
		
		.view5{
			width: 20%;
			align-items: flex-start;
		}
		
		.uni-navigate-badge {
			display: flex;
			flex: 1;
			flex-direction: row;
			flex-wrap:wrap;
			justify-content: flex-start;
		}
		
		.hello {
			display: flex;
			flex: 1;
			flex-direction: column;
		}
	
		.title {
			color: #8f8f94;
			margin-top: 50upx;
		}
	
		.ul {
			color: #8f8f94;
			margin-top: 50upx;
		}
	
		.ul>view {
			line-height: 50upx;
		}
</style>
