<template>
	<view class="content">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+ height +'px;background-color:#F0F8FF;'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)"  :class="index==categoryActive?'active':''"
				 v-for="(item,index) in fenlei" :key="index">
					<view>
						{{item.Classify}}
					</view>
				</view>
			</scroll-view>
			<view class="nav-right">
				<view v-show="filterAgentListlength === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
					———暂无数据———
				</view>
				<view v-show="filterAgentListlength > 0">
					<scroll-view  scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+(height-115)+'px'" scroll-with-animation="true">
						<view v-show="categroy.Classify === '行为隐患'">
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
							<view :id="index==0?'first':''" v-for="(agent,index) in filterAgentList" :key="index">
								<view class="uni-list-cell uni-list-cell-navigate" hover-class="uni-list-cell-hover" style="height: 90upx;" @tap="ok(agent)">
									<view style="width: 87%;">
										{{agent.Des}}
									</view>
									<view style="width: 10%;" >
										{{agent.Count}}
									</view>
									<view class="uni-list-cell-navigate1 uni-navigate-right" style="width: 3%;">
									</view>
								</view>
							</view>
						</view>
						<view v-show="categroy.Classify === '设备隐患'">
							<view :id="index==0?'first':''" v-for="(agent,index) in filterAgentList" :key="index">
								<view style="display: flex;flex-direction: column;padding-left: 30upx;">
									<view style="width: 100%;">
										{{agent['标准时间'].substring(5,16)}}
									</view>
									<view style="width: 100%;">
										{{agent.Des}}
									</view>
									<view style="width: 100%;">
										{{JSON.parse(agent.Data)['数据']}}
									</view>
									<view style="height: 10upx;border-bottom:1px solid #DCDCDC; color:#090">
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var canvaLineA=null;
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				filterAgentListlength: 0,
				height: 0,
				categroy:'',
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				timer: null,
				fenlei: [],
				system: '',
				agentList: [],
				zonglan: {"day":0,"month":0,"standard":0},
				filterAgentList: undefined,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
			};
		},
		computed: mapState(['forcedLogin', "url"]),
		methods: {
			...mapMutations(['login', 'logout', 'setStorage']),
			getChartData(){
				uni.request({
					url: this.url + "Danger/GetNearDangerInfo",
					data:{
						CraneID: this.system,
						type: 0
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
			getAppAgent() {
				uni.request({
					url: this.url + "Danger/DangerListByCrane",
					data: {
						CID: this.system,
					},
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					success: (res) => {
						uni.hideToast();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../tab4/login',
								});
							}
						} else {
							this.fenlei = [];
							// this.fenlei.push({Type:'',Classify:'总览'});
							this.agentList = res.data;
							for (var i = 0; i < this.agentList.length; i++) {
								var isHave = true;
								for (var j = 0; j < this.fenlei.length; j++) {
									if (this.fenlei[j].Classify == this.agentList[i].隐患类型) {
										isHave = false;
										break;
									}
								}
								if (isHave) {
									this.fenlei.push({Type:'',Classify:this.agentList[i].隐患类型});
								}
							}
							if (this.fenlei.length > 0) {
								this.categoryClickMain(this.fenlei[this.categoryActive], this.categoryActive);
							}
						}
					},
					fail: () => {
						uni.hideToast();
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
					}
				})
			},
			refreshAppAgent() {
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				this.getAppAgent();
				this.getChartData();
				this.timer = setInterval(() => {
					this.getAppAgent();
				}, 10000);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.categroy = categroy;
				this.filterAgentList = {};
				for (var i = 0; i < this.agentList.length; i++) {
					if (this.agentList[i].隐患类型 == categroy.Classify) {
						this.filterAgentList = this.agentList[i].Data;
					}
				}
				this.filterAgentListlength = this.filterAgentList.length
				this.scrollTop = -this.scrollHeight * index;
			},
			ok(e) {
				uni.navigateTo({
					url: "../tab1/dangerdetail?CID=" + this.system + "&typeID=" + e.Atype,
				});
			}
		},
		onLoad(e) {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(600);
			this.cHeight=uni.upx2px(500);
			this.height = uni.getSystemInfoSync().windowHeight;
			// console.log(JSON.stringify(e.system))
			this.system = JSON.parse(e.system).起重机ID;
			uni.setNavigationBarTitle({
				title: JSON.parse(e.system).Name + '_隐患分析'
			})
			this.refreshAppAgent();
		},
		onUnload() {
			this.timer && this.clearTimer();
		}
	}
</script>

<style>
	.swiper-box{width: 700upx;height: 400upx;}
	.swiper-item{width: 700upx;height: 400upx;}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.uni-navigate-badge {
		padding-right: 50upx;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50px;
	}

	.ul {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}

	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 20%;
		background-color: #eee;
	}

	.nav-left-item {
		border-bottom: solid 2px white;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 80%;
		padding-left: 10upx;
	}

	.nav-right-item {
		border-bottom: solid 2px #D9D9D9 ;
		width: 100%;
		height: 150upx;
		float: left;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.nav-right-item image {
		width: 100upx;
		height: 150upx;
	}

	.active {
		color: #007AFF;
		background-color: white;
	}
</style>
