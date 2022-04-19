<template>
	<view :class="{ 'calendar-content-active ': infoShow }" class="calendar-content">
		<view v-if="showCalendar">
			<!-- 插入模式 -->
			<uni-calendar :insert="true"  :disable-before="tags[3].checked" :range="tags[5].checked" :start-date="startDate" :end-date="endDate" :date="date" :selected="selected" @change="change" />
			<!--<view class="calendar-tags-group example-body">
				<view v-for="(item, index) in tags" :class="{ checked: item.checked }" :key="index" class="calendar-tags" @click="toggle(index, item)">
					<view class="calendar-tags-item">{{ item.name }}</view>
				</view>
 				<view class="calendar-tags" @click="open">
					<view class="calendar-tags-item calendar-button">打开日历</view>
				</view> 
			</view>-->
			<!-- <button class="calendar-button" type="button" @click="open">打开日历</button> -->
			<view v-if="timeData.lunar" class="calendar-info-header">
				<text class="calendar-title">{{ timeData.fulldate }}</text>
			</view>
			<view v-if="timeData.lunar" class="calendar-info">
				<!-- <view>当前选择时间 : {{ timeData.fulldate }}</view> -->
				<view v-if="tags[0].checked">农历日期 : {{ timeData.year + '年' + timeData.month + '月' + timeData.date + '日 （' + timeData.lunar.astro + ')' }}</view>
				<view v-if="tags[0].checked">
					{{ timeData.lunar.gzYear + '年' + timeData.lunar.gzMonth + '月' + timeData.lunar.gzDay + '日 (' + timeData.lunar.Animal + '年)' }}
					{{ timeData.lunar.IMonthCn + timeData.lunar.IDayCn }} {{ timeData.lunar.isTerm ? timeData.lunar.Term : '' }}
				</view>
				<view>
					<button type="primary" hover-class="uni-hover" class="primary"  @tap="renwudianjian" style="width: 97%;margin-left:2%;">
						点检任务:{{ selectDataDianJian.length }}
					</button>
					<button type="primary" hover-class="uni-hover" class="primary"  @tap="renwuweixiu" style="width: 97%;margin-left: 2%;">
						维修任务:{{ selectDataWeiXiu.length }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			/**
			 * 时间计算
			 */
			function getDate(date, AddMonthCount = 0, AddDayCount = 0) {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/')
				}
				let dd = new Date(date)
				dd.setMonth(dd.getMonth() + AddMonthCount) // 获取AddDayCount天后的日期
				dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
				let y = dd.getFullYear()
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
				return y + '-' + m + '-' + d
			}
			let tags = [
				{
					id: 0,
					name: '打点',
					value: [{
							date: getDate(new Date(), 0, -1),
							info: '任务：1'
						},
						{
							date: getDate(new Date(), 0),
							info: '任务：5'
						},
						{
							date: getDate(new Date(), 0, 1),
							info: '任务：7'
						}
					],
					checked: false,
					attr: 'selected'
				}
			]
			return {
				selectDate:'',
				tags,
				date: '',
				startDate: '',
				endDate: '',
				timeData: {
					clockinfo: '',
					date: '',
					fulldate: '',
					lunar: '',
					month: '',
					range: '',
					year: ''
				},
				selectDataDianJian: [],
				selectDataWeiXiu:[],
				selected: [],
				infoShow: false,
				showCalendar: false
			}
		},
		onLoad() {
			setTimeout(() => {
				this.showCalendar = true
			}, 350);
			this.getData();
		},
		computed: mapState(["url"]),
		methods: {
			renwudianjian(){
				uni.navigateTo({
					url: "../tab2/renwudianjian?selectDate=" + this.selectDate,
				});
			},
			renwuweixiu(){
				uni.navigateTo({
					url: "../tab2/renwuweixiu?selectDate=" + this.selectDate,
				});
			},
			change(e) {
				// console.log('change 返回:', JSON.stringify(e))
				this.timeData = e
				this.infoShow = true
				this.selectDate = e.year +'-'+ (e.month<10? '0'+e.month:e.month) +'-' +(e.date<10?'0'+e.date:e.date) + ' 00:00:00'
				uni.request({
					url: this.url + "Device/Get_CalendarCheckLog_ByChargerID",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						userName: uni.getStorageSync('name'),
						date: this.selectDate,
						filter: '',
						pageSize: this.pageCount,
						pageIndex: this.pages
					},
					success: (res) => {
						uni.stopPullDownRefresh();
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
							this.selectDataDianJian = []
							for(var i =0;i<res.data.Data.length;i++)
							{
								this.selectDataDianJian.push(res.data.Data[i]);
							}
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
				uni.request({
					url: this.url + "Device/Get_CalendarMaintenancePlan_ByChargerID",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						userName: uni.getStorageSync('name'),
						date: this.selectDate,
						filter: '',
						pageSize: this.pageCount,
						pageIndex: this.pages
					},
					success: (res) => {
						uni.stopPullDownRefresh();
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
							this.selectDataWeiXiu = []
							for(var i =0;i<res.data.Data.length;i++)
							{
								this.selectDataWeiXiu.push(res.data.Data[i]);
							}
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
			getData(){
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				uni.request({
					url: this.url + "Device/Get_CalendarCheckLogAndMaintenance_ByChargerID",
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						userName: uni.getStorageSync('name')
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
							this.selected = res.data
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
			confirm(e) {
				console.log('confirm 返回:', e)
				this.timeData = e
				this.infoShow = true
			}
		},
		onPullDownRefresh() {
			this.getData();
			uni.stopPullDownRefresh();
		},
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.calendar-content {
		padding-bottom: 100upx;
		font-size: 26upx;
	}

	.calendar-content-active {
		padding-bottom: 150upx;
	}

	.calendar-tags-group {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.calendar-tags {
		width: 100%;
		box-sizing: border-box;
	}

	.calendar-tags-item {
		padding: 20upx 20upx;
		border: 1px rgba(0, 0, 0, 0.2) solid;
		color: #333;
		border-radius: 10upx;
		text-align: center;
		margin: 10upx;
		background: #f8f8f8;
	}

	.calendar-tags-item:active {
		background: #f8f8f8;
	}

	.checked .calendar-tags-item {
		background: rgb(0, 122, 255);
		color: #fff;
		border: 1px rgba(0, 0, 0, 0.1) solid;
	}

	.calendar-button {
		font-weight: bold;
		font-size: 32upx;
	}

	.calendar-button-groups {
		position: absolute;
		width: 100%;
		bottom: 0;
		display: flex;
	}

	.calendar-button-confirm {
		width: 50%;
		margin: 10upx;
		border: 1px #eee solid;
		font-size: 32upx;
	}

	.calendar-button-confirm:after {
		border: none;
	}

	.calendar-box {
		position: fixed;
		bottom: 0;
		background: #fff;
		color: #444;
		line-height: 1.5;
		width: 100%;
		transition: all 0.3s;
		transform: translateY(420upx);
		/* background: #f5f5f5; */
	}

	.calendar-active {
		transform: translateY(0);
	}

	.calendar-info-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 30upx;
		padding-left: 0;
		border-top: 1px #eee solid;
		border-bottom: 1px #eee solid;
	}

	.calendar-title {
		/* height: 80upx; */
		font-weight: bold;
		color: #666;
		font-size: 32upx;
		border-left: 2px #0d9ebb solid;
		padding-left: 20upx;
		margin: 0 20upx;
	}

	.calendar-info {
		overflow-y: scroll;
		height: 150upx;
		padding: 30upx 30upx;
	}
	.view2{
		width: 100%;
		align-items: flex-start;	
	}
</style>