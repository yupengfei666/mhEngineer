<template>
	<view class="content">
		<view v-if="filterAgentList.length === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
			———暂无数据———
		</view>
		<view class="page-body" v-else>
			<scroll-view class="nav-left" scroll-y :style="'height:'+ height +'px;background-color:#F0F8FF;'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)"  :class="index==categoryActive?'active':''"
				 v-for="(item,index) in fenlei" :key="index">
					<view v-if="item.Type=='警告'||item.Type=='故障'" style="color: #FF6666;">
						{{item.Classify}}
					</view>
					<view v-else >
						{{item.Classify}}
					</view>
				</view>
			</scroll-view>
			<view class="nav-right">
				<view v-show="categroy.Classify !== '总览'" style="background-color: white;">
					<view  :id="index==0?'first':''" v-for="(value,key) in filterAgentList" :key="key">
						<view v-if="key==='标准时间'||key==='时间'" class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;">
							<view v-if="key==='标准时间'" style="color:black">
								北京时间
							</view>
							<view v-else-if="key==='时间'" style="color:black">
								现场时间
							</view>
							<view>
								{{value}}
							</view>
							<view style="width: 50upx;">
								
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;" v-show="filterAgentList.AgentData">
						<view style="width: 92%;">
							<input class="uni-input"  placeholder="请输入过滤条件" v-model='guolvtiaojian'/>
						</view>
						<view style="width: 8%;">
							<image src="../../static/img/clear.png" style="height: 50upx;width: 50upx;" @tap="Clearguolvtiaojian"></image>
						</view>
					</view>
				</view>
				<scroll-view  scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+(height-115)+'px'" scroll-with-animation="true">
					<view v-show="categroy.Classify === '总览'">
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
								<view class="qiun-title-dot-light">最近30天日严重故障数趋势</view>
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
					</view>
					<view v-show="categroy.Classify !== '总览'&&filterAgentList.AgentData" :id="index==0?'first':''" v-for="(value,index) in filterAgentList.AgentData" :key="index">
						<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;" v-show="value.agentName.indexOf(guolvtiaojian) != -1">
							<view style="color:#8a8a8a;">
								{{value.agentName}}
							</view>
							<view v-show="value.value === 'True'||value.value==='False'">
								<view v-show="value.color === 'green'">
									<view  style="border-radius: 80upx;background-color: #7cd788;color: #7cd788;width: 40upx;height:40upx;margin-top: 5upx;">
									</view>
								</view>
								<view v-show="value.color === 'gray'">
									<view  style="border-radius: 80upx;background-color: #8a8a8a;color: #8a8a8a;width: 40upx;height:40upx;margin-top: 5upx;">
									</view>
								</view>
								<view v-show="value.color === 'red'">
									<view  style="border-radius: 80upx;background-color: #FF2D2D;color: #FF2D2D;width: 40upx;height:40upx;margin-top: 5upx;">
									</view>
								</view>
							</view>
							<view v-show="value.value !=='True' && value.value !=='False'">
								{{value.value}}{{value.unit}}
							</view>
						</view>
					</view>
				</scroll-view>
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
				filterAgentList: {},
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
				guolvtiaojian:''
			};
		},
		computed: mapState(['forcedLogin', "url"]),
		methods: {
			...mapMutations(['login', 'logout', 'setStorage']),
			Clearguolvtiaojian()
			{
				this.guolvtiaojian = ''
			},
			getServerData(){
				uni.request({
					url: this.url + "WeChat/GetDeviceMonthAlarmInfo",
					data:{
						DeviceID: this.system,
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
						let LineA={categories:[],series:[{name: '严重故障',data: []}]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						for(var i =0 ;i<res.data.length;i++)
						{
							LineA.categories.push(res.data[i]['时间'])
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
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
					},
					yAxis: {
						//disabled:true
						gridType:'dash',
						splitNumber:8,
						min:10,
						max:180,
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
					url: this.url + "WeChat/GetNowAgent",
					data: {
						DeviceID: this.system,
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
									if (this.fenlei[j].Classify == this.agentList[i].机构) {
										isHave = false;
										break;
									}
								}
								if (isHave) {
									this.fenlei.push({Type:'',Classify:this.agentList[i].机构});
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
			getZongLan() {
				uni.request({
					url: this.url + "WeChat/DeviceAlarm",
					data: {
						DeviceID: this.system,
					},
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if(res.statusCode===401)
							{
								uni.reLaunch({
									url: '../tab4/login',
								});
							}
						} else {
							this.zonglan = res.data;
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
			refreshAppAgent() {
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				this.getAppAgent();
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
					if (this.agentList[i].机构 == categroy.Classify) {
						this.filterAgentList = this.agentList[i].data;
					}
				}
				this.scrollTop = -this.scrollHeight * index;
			},
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
				title: JSON.parse(e.system).Name+'_实时状态'
			})
			this.refreshAppAgent();
			// setTimeout(() => {
			// 	this.getZongLan();
			// 	this.getServerData();
			// }, 1000);
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
		width: 15%;
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
		width: 85%;
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
