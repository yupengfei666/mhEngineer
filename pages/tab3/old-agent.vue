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
								<view style="width: 25%;color:#8a8a8a;">
									现场时间
								</view>
								<view style="width: 75%;" >
									{{oldAgent['时间']}}
								</view>
							</view>
						</view>
					</view>
					<view class="view1">
						<view class="uni-list-cell-navigate"  >
							<view style="display: flex;width: 100%;">
								<view style="width: 25%;color:#8a8a8a;">
									北京时间
								</view>
								<view style="width: 75%;" >
									{{oldAgent['标准时间']}}
								</view>
							</view>
						</view>
					</view>
					<view class="view1">
						<view class="uni-list-cell-navigate">
							<view style="display: flex;width: 100%;">
								<view style="width: 25%;color:#8a8a8a;">
									故障编码
								</view>
								<view style="width: 75%;" >
									{{oldAgent['故障编码']}}
								</view>
							</view>
						</view>
					</view>
					<view class="view1">
						<view class="uni-list-cell-navigate"  >
							<view style="display: flex;width: 100%;">
								<view style="width: 25%;color:#8a8a8a;">
									含义解析
								</view>
								<view style="width: 75%;" >
									{{oldAgent['含义解析']}}
								</view>
							</view>
						</view>
					</view>
					<!--<view class="view4">
						<view v-if="oldAgent.Type==='警告'" style="color: #333333;">
							{{oldAgent.Type}}
						</view>
						<view v-else-if="oldAgent.Type==='故障'" style="color: #333333;">
							{{oldAgent.Type}}
						</view>
					</view>
					<view class="view4">
						<view v-if="oldAgent.Type==='警告'">
							<image src="../../static/img/警告.png" style="height: 40upx;width: 40upx;"></image>  
						</view>
						<view v-else-if="oldAgent.Type==='故障'">
							<image src="../../static/img/故障.png" style="height: 40upx;width: 40upx;"></image>  
						</view>
					</view> -->
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
				beginDate: "",
				endDate: "",
				cheName: "",
				classify: "",
				
				pageCount:10,
				pages:1,
				selectAgent:[],
				
				oldAgentList: [],
				systemCheck:[]
			};
		},
		computed: mapState(["url"]),
	
		methods: 
		{
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
					url: this.url + "WeChat/GetAlarmInfoBySearch",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						begin: this.beginDate,
						end: this.endDate,
						deviceId: this.cheName,
						subCode: this.classify
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
							this.selectAgent = [];
							this.oldAgentList = res.data;
							for(var i =0;i<this.oldAgentList.length;i++)
							{
								if(i>=this.pageCount)
								{
									break;
								}
								this.selectAgent.push(this.oldAgentList[i]);
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
			}
		},
		onPullDownRefresh() {
			this.pages = 1;
			this.getAppOldAgent();
		},
		onReachBottom() {
			for(var i =this.pageCount* this.pages;i<this.oldAgentList.length;i++)
			{
				if(i>= (this.pageCount*(this.pages+1)))
				{
					break;
				}
				this.selectAgent.push(this.oldAgentList[i]);
			}
			this.pages=this.pages+1;
		},
		onLoad(e) {
			this.beginDate = e.beginDate;
			this.endDate = e.endDate;
			this.cheName = e.cheName;
			this.classify = e.classify==='全部'? '-1':e.classify;
			uni.setNavigationBarTitle({
				title: e.name+'_'+e.classify+'_历史报警'
			})
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
