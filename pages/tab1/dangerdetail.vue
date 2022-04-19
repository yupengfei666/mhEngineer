<template>
	<view class="content">
		<view v-show="selectAgentlength === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
			———暂无数据———
		</view>
		<view v-show="selectAgentlength > 0" >
			<view>
				<!--#ifdef H5 -->
				<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
					<view class="qiun-title-dot-light">页面地址</view>
				</view>
				<view class="qiun-bg-white qiun-padding">
					<text>pages/basic/line/line-scroll</text>
				</view>
				<!--#endif-->
				<view class="qiun-bg-white qiun-title-bar qiun-common-mt" style="display: flex;justify-content: center;align-items: center;">
					<view class="qiun-title-dot-light">最近7天行为隐患数趋势</view>
				</view>
				<view class="qiun-charts" >
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'upx','height':cHeight+'upx'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					<!--#endif-->
				</view>
				<!--#ifdef H5 -->
				<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
					<view class="qiun-title-dot-light">标准数据格式</view>
				</view>
				<view class="qiun-bg-white qiun-padding">
					<textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea"/>
				</view>
				<view class="qiun-text-tips">Tips：修改后点击更新图表</view>
				<button class="qiun-button" @tap="changeData()">更新图表</button>
				<!--#endif-->
			</view>
			<view v-for="(oldAgent,index) in selectAgent.Data" :key="index">
				<view style="display: flex;flex-direction: column;width: 100%;padding-left: 20upx;">
					<view style="display: flex;width: 100%;">
						<view style="width: 20%;color:#8a8a8a;">
							发生时间
						</view>
						<view style="width: 80%;" >
							{{oldAgent['标准时间']}}
						</view>
					</view>
					<view style="display: flex;width: 100%;">
						<view style="width: 20%;color:#8a8a8a;">
							隐患名称
						</view>
						<view style="width: 80%;" >
							{{oldAgent['IdentifyStr']}}
						</view>
					</view>
					<view style="display: flex;width: 100%;">
						<view style="width: 20%;color:#8a8a8a;">
							处理建议
						</view>
						<view style="width: 80%;" >
							{{oldAgent['建议']}}
						</view>
					</view>
					<view style="display: flex;width: 100%;">
						<view style="width: 20%;color:#8a8a8a;">
							隐患详情
						</view>
						<view style="width: 80%;" >
							<view v-for="(buf,bufindex) in oldAgent['Data']" :key="bufindex">
								<view style="display: flex;width: 100%;">
									<view style="width: 40%;">
										{{buf.key}}
									</view>
									<view style="width: 60%;" >
										{{buf.val}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 20upx;border-bottom:1px solid #DCDCDC; color:#090">
					</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var canvaLineA=null;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				selectAgentlength: 0,
				CID: "",
				typeID: "",
				selectAgent:[],
				loadMoreText: "加载中...",
				showLoadMore: false,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
			};
		},
		computed: mapState(["url"]),
		methods: {
			getChartData(){
				uni.request({
					url: this.url + "Danger/GetNearDangerInfo",
					data:{
						CraneID: this.CID,
						type: this.typeID
					},
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					success: function(res) {
						if(res.statusCode===401)
						{
							uni.reLaunch({
								url: '../tab4/login',
							});
						}
						let LineA={categories:[],series:[{name: '行为隐患',data: []}]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						for(var i =0 ;i<res.data.length;i++)
						{
							LineA.categories.push(res.data[i]['时间'].substring(5,10))
							LineA.series[0].data.push(res.data[i]['数量'])
						}
						_self.textarea = JSON.stringify(LineA);
						_self.showLineA("canvasLineA",LineA);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel:true,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:8,
						scrollShow:true,
						scrollAlign:'left',
					},
					yAxis: {
						//disabled:true
						gridType:'dash',
						splitNumber:8,
						min:1,
						max:10,
						format:(val)=>{return val.toFixed(0)}//如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					},
				});
				
			},
			touchLineA(e){
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition:'right',
						animation:false
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			},
			cheAgent() {
				uni.navigateTo({
					url: "./zhuangtaiquxian"
				});
			},
			getAppOldAgent() {
				var that = this
				this.showLoadMore = false
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				uni.request({
					url: this.url + "Danger/DeviceDangerListByCraneAndType",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						CID: this.CID,
						type: this.typeID
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
							this.selectAgent =res.data
							that.selectAgentlength = this.selectAgent.Data.length
							console.log(that.selectAgentlength)
							console.log(JSON.stringify(this.selectAgent))
							if(res.data.Data.length === 0)
							{
								this.loadMoreText = "没有更多数据了!"
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
			this.loadMoreText = "加载中..."
			this.showLoadMore = false
			this.getAppOldAgent();
			this.getChartData();
		},
		onLoad(e) {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.CID = e.CID;
			this.typeID = e.typeID;
			this.getAppOldAgent();
			this.getChartData()
		}
	}
</script>

<style>
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
