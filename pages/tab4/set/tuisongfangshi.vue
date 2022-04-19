<template>
	<view class="content" style="background-color:#F1F1F1;">
		<view style="padding-left: 30upx;padding-top: 40upx;height: 50upx;">推送方式</view>
		<checkbox-group @change="tuisongCheckboxChange" style="background-color: white;">
			<label class="uni-list-cell uni-list-cell-pd"  v-for="(system,index) in tuisongList" :key="index">
				<view style="width: 10%;">
					<checkbox :value="system['Name']" :checked="system.Checked" />
				</view>
				<view style="width: 90%;display: flex;">
					<view style="padding-left: 5px;">
						{{system['Name']}}
					</view>
				</view>
			</label>
		</checkbox-group>
		<view style="padding-left: 30upx;padding-top: 40upx;height: 50upx;">推送时间</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					开始时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="time1" start="09:01" end="21:01" @change="bindTimeChange1">
						<view class="uni-input">{{time1}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					结束时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="time2" start="09:01" end="21:01" @change="bindTimeChange2">
						<view class="uni-input">{{time2}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view style="padding-left: 30upx;padding-top: 40upx;height: 50upx;">推送日期</view>
		<checkbox-group @change="xingqiCheckboxChange" style="background-color: white;">
			<label class="uni-list-cell uni-list-cell-pd"  v-for="(system,index) in xingqiList" :key="index">
				<view style="width: 10%;">
					<checkbox :value="system['Name']" :checked="system.Checked" />
				</view>
				<view style="width: 90%;display: flex;">
					<view style="padding-left: 5px;">
						{{system['Name']}}
					</view>
				</view>
			</label>
		</checkbox-group>
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
				// tuisongList: [{Name:'是否微信推送',Checked:false}
				// 				,{Name:'是否短信推送',Checked:false}
				// 				,{Name:'是否邮箱推送',Checked:false}
				// 				,{Name:'是否语音推送',Checked:false}] ,
				tuisongList: [] ,
				xingqiList:[],
				time1: '00:00',
				time2: '00:00',
				checkvalues1: '',
				checkvalues2: ''
			}
		},
		computed: mapState(['forcedLogin',"url"]),
		methods: {
				...mapMutations(['login', 'logout', 'setStorage']),
				SetPushSetting:function(){
					uni.request({
						url: this.url + "Push/SetPushSetting",
						method: 'GET',
						dataType: 'json',
						data: {
							是否微信推送: this.checkvalues1.indexOf('是否微信推送') >= 0,
							是否短信推送: this.checkvalues1.indexOf('是否短信推送') >= 0, 
							是否语音推送: this.checkvalues1.indexOf('是否语音推送') >= 0,
							是否邮箱推送: this.checkvalues1.indexOf('是否邮箱推送') >= 0,
							推送开始时间: this.time1,
							推送结束时间: this.time2,
							推送星期设置: (this.checkvalues2.indexOf('星期日') >= 0 ?'1':'0') + (this.checkvalues2.indexOf('星期一') >= 0 ?'1':'0')+
							(this.checkvalues2.indexOf('星期二') >= 0 ?'1':'0') + (this.checkvalues2.indexOf('星期三') >= 0 ?'1':'0')+
							(this.checkvalues2.indexOf('星期四') >= 0 ?'1':'0') + (this.checkvalues2.indexOf('星期五') >= 0 ?'1':'0')+
							(this.checkvalues2.indexOf('星期六') >= 0 ?'1':'0') 
						},
						header: {
							'content-type': 'application/json',
							'sessionkey': uni.getStorageSync('password')
						},
						success: (res) => {
							uni.hideToast()
							uni.stopPullDownRefresh();
							if(res.statusCode!== 200){
								console.log("请求失败:", res)
								if(res.statusCode===401)
								{
									uni.reLaunch({
										url: '../tab4/login',
									});
								}
							}else
							{
							}
						},
						fail: () => {
							uni.stopPullDownRefresh();
							uni.hideToast()
							uni.showToast({
								icon: 'none',
								title: '网络连接失败',
							})
						}
					})
				},
				tuisongCheckboxChange:function (e) {
					this.checkvalues1 = e.target.value;
					this.SetPushSetting()
				},
				xingqiCheckboxChange:function (e) {
					this.checkvalues2 = e.target.value;
					this.SetPushSetting()
				},
				getTuisong() {
					uni.showToast({
					    title: '加载中...',
						icon:'loading',
						duration:30000
					});
					uni.request({
						url: this.url + "Push/Get_PushSetting",
						method: 'GET',
						dataType: 'json',
						header: {
							'content-type': 'application/json',
							'sessionkey': uni.getStorageSync('password')
						},
						success: (res) => {
							uni.hideToast()
							uni.stopPullDownRefresh();
							if(res.statusCode!== 200){
								console.log("请求失败:", res)
								if(res.statusCode===401)
								{
									uni.reLaunch({
										url: '../tab4/login',
									});
								}
							}else
							{
								if(res.data!==undefined&&res.data!==null){
									this.tuisongList = [
									//{Name:'是否微信推送',Checked:res.data.是否微信推送},
									{Name:'是否短信推送',Checked:res.data.是否短信推送}
									//,{Name:'是否邮箱推送',Checked:res.data.是否邮箱推送}
									//,{Name:'是否语音推送',Checked:res.data.是否语音推送},
									] 
									if(res.data.是否短信推送)
									{
										this.checkvalues1 ='是否短信推送'
									}
									if(res.data.推送开始时间 !==null )
									{
										this.time1 = res.data.推送开始时间
									}
									if(res.data.推送结束时间 !==null)
									{
										this.time2 = res.data.推送结束时间
									}
									if(res.data.推送星期设置 != null)
									{
										this.xingqiList = [
											{Name:'星期日',Checked:res.data.推送星期设置.substring(0,1) === '1'},
											{Name:'星期一',Checked:res.data.推送星期设置.substring(1,2) === '1'},
											{Name:'星期二',Checked:res.data.推送星期设置.substring(2,3) === '1'},
											{Name:'星期三',Checked:res.data.推送星期设置.substring(3,4) === '1'},
											{Name:'星期四',Checked:res.data.推送星期设置.substring(4,5) === '1'},
											{Name:'星期五',Checked:res.data.推送星期设置.substring(5,6) === '1'},
											{Name:'星期六',Checked:res.data.推送星期设置.substring(6,7) === '1'}
										]
									}else {
										this.xingqiList = [
											{Name:'星期日',Checked:false},
											{Name:'星期一',Checked:false},
											{Name:'星期二',Checked:false},
											{Name:'星期三',Checked:false},
											{Name:'星期四',Checked:false},
											{Name:'星期五',Checked:false},
											{Name:'星期六',Checked:false}
										]
									}

									if(res.data.推送星期设置.substring(0,1) === '1')
									{
										this.checkvalues2 ='星期日'
									}
									if(res.data.推送星期设置.substring(1,2) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期一'
									}
									if(res.data.推送星期设置.substring(2,3) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期二'
									}
									if(res.data.推送星期设置.substring(3,4) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期三'
									}
									if(res.data.推送星期设置.substring(4,5) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期四'
									}
									if(res.data.推送星期设置.substring(5,6) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期五'
									}
									if(res.data.推送星期设置.substring(6,7) === '1')
									{
										this.checkvalues2 =this.checkvalues2+',星期六'
									}
								}
							}
						},
						fail: () => {
							uni.stopPullDownRefresh();
							uni.hideToast()
							uni.showToast({
								icon: 'none',
								title: '网络连接失败',
							})
						}
					})
				},
				bindTimeChange1: function(e) {
					this.time1 = e.target.value
					this.SetPushSetting()
				},
				bindTimeChange2: function(e) {
					this.time2 = e.target.value
					this.SetPushSetting()
				}
			},
			onShow() {
				this.getTuisong();
			}
			
	}
</script>

<style>
</style>
