<template>
	<view class="content">
		<view>
			<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;">
				<view style="margin-left: 15upx;width: 30%;">
					开始时间
				</view>
				<view style="color:#007AFF;width: 40%;">
					<picker mode="date" :value="startDate" start="2000-01-01" end="2099-01-01" @change="bindStartDateChange">
						<view class="uni-input">{{startDate}}</view>
					</picker>
				</view>
				<view style="color:#007AFF;width: 30%;">
					<picker mode="time" :value="startTime" start="00:00" end="23:59" @change="bindStartTimeChange">
						<view class="uni-input">{{startTime}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;">
				<view style="margin-left: 15upx;width: 30%;">
					结束时间
				</view>
				<view style="width: 40%;color:#007AFF">
					<picker mode="date" :value="endDate" start="2000-01-01" end="2099-01-01" @change="bindEndDateChange">
						<view class="uni-input">{{endDate}}</view>
					</picker>
				</view>
				<view  style="width: 30%;color:#007AFF">
					<picker mode="time" :value="endTime" start="00:00" end="23:59" @change="bindEndTimeChange">
						<view class="uni-input">{{endTime}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;">
				<view style="margin-left: 15upx;width: 30%;">
					起重机
				</view>
				<view style="width: 70%;color:#007AFF">
					<picker @change="bindPickerChangeSystem" 
					range-key="Name" 
					:value="systemIndex" 
					:range="systemAll">
						<view class="uni-input">{{systemAll[systemIndex]['Name']}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell uni-list-cell-navigate" style="height: 70upx;">
				<view style="margin-left: 15upx;width: 30%;">
					隐患分类
				</view>
				<view style="width: 70%;color:#007AFF">
					<picker @change="bindPickerChangeClassify" :value="classifyIndex" :range="classifyList">
						<view class="uni-input">{{classifyList[classifyIndex]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<button type="primary" hover-class="uni-hover" class="primary" @tap="ok" style="margin-left:5%;width: 90%;">
			<view style="display: flex;flex-direction: row;justify-content: center;">
				<view>
					确定
				</view>
			</view>
		</button>
	</view>
</template>
<script>
	import {
		mapState,
	} from 'vuex';
	import { Utils } from '../../common/utils'
	let utils = new Utils()
	export default {
		data() {
			return {
				systemCheck:[],
				classifyList:['行为隐患','设备隐患'],
				title: 'picker',
				systemIndex: 0,
				systemValue: "",
				systemAll:[],
				classifyIndex: 0,
				classifyValue: "行为隐患",
				startDate: '2000-01-01',
				startTime: '00:00',
				endDate: '2000-01-01',
				endTime: '23:59',
			}
		},
		computed: mapState(["url"]),
		methods: {
			bindPickerChangeSystem: function(e) {
				this.systemIndex = e.target.value
				this.systemValue = this.systemAll[this.systemIndex].起重机ID;
			},
			bindPickerChangeClassify: function(e) {
				this.classifyValue = this.classifyList[e.target.value];
				this.classifyIndex = e.target.value
			},
			bindStartDateChange: function(e) {
				this.startDate = e.target.value;
			},
			bindStartTimeChange: function(e) {
				this.startTime = e.target.value;
			},
			bindEndDateChange: function(e) {
				this.endDate = e.target.value
			},
			bindEndTimeChange: function(e) {
				this.endTime = e.target.value
			},
			ok(){
				uni.navigateTo({
					url: "../tab3/old-danger?beginDate=" + this.startDate + " " + this.startTime + ":00" +
					"&endDate=" + this.endDate + " " + this.endTime  + ":59"  + 
					"&cheName=" + this.systemValue +
					"&classify=" + this.classifyValue +
					"&name=" + this.systemAll[this.systemIndex]['Name'],
				});
			},
			getSystem() {
				uni.request({
					url: this.url + "WeChat/GetSystem",
					data: {
						userName: uni.getStorageSync('name'),
					},
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					success: (res) => {
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
							this.systemAll = []
							for (var i = 0, lenI = res.data.length; i < lenI; ++i) {
								if(this.systemCheck.length>0)
								{
									for(var j = 0;j<this.systemCheck.length;j++)
									{
										if(this.systemCheck[j] ===res.data[i].Name)
										{
											this.systemAll.push(res.data[i])
										}
									}
								}
								else
								{
									this.systemAll.push(res.data[i])
								}
							}
							if(this.systemAll.length>0)
							{
								this.systemValue = this.systemAll[0].起重机ID
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
			}
		},
		onLoad() {
			uni.getStorage({
				key: "password",
				fail: () => {
					uni.reLaunch({
						url: '../tab4/login',
					});
				}
			});
			var date = new Date();
			date.setMonth(date.getMonth()-1);
			this.startDate = utils.getDateByDate(date);//一个月
			this.endDate = utils.getDate();
			this.systemCheck = []
			uni.getStorage({
				key: "systemCheck",
				success: (res) => {
					if(res.data.length==0)
					{
						this.getSystem();
					}
					else{
						this.systemCheck = res.data;
						this.getSystem();
					}
				},
				fail: () => {
					this.getSystem();
				}
			});
		}
	}
</script>

<style>

</style>
