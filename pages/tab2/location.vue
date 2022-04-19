<template>
	<!-- 定位 -->
	<view id="location" class="content" style="display: flex;align-items: center;">
		<view style="margin: 40rpx;font-size: 36rpx;">当前位置</view>
		<view style="margin: 10rpx;font-size: 40rpx;padding: 20rpx;border: 4rpx dotted #19be6b;">
			{{province}} - {{city}} - {{district}}
		</view>
		<view style="width: 100%;padding: 20rpx;">
			<view>上次打卡信息</view>
			<view v-if="front.length > 0">
				<view style="margin-top: 20rpx;">
					打卡时间：{{front[0].UpdataTime}}
				</view>
				<view>
					打卡位置：{{front[0].Address}}
				</view>
				<view>
					服务公司：{{front[0].Company || ''}}
				</view>
				<view>
					项目号：{{front[0].PID || ''}}
				</view>
				<view>
					备注：{{front[0].Remark || ''}}
				</view>
			</view>
			<view v-else style="height: 180rpx;">
				<u-empty text="暂未打卡" mode="list"></u-empty>
			</view>
			<view style="height: 2rpx;background-color: #DCDFE6;margin-top: 10rpx;"></view>
			<view>
				<view style="font-size: 30rpx;margin: 10rpx 0rpx;">
					选填信息
				</view>
				<view style="border: 2rpx solid #DCDFE6;padding: 10rpx;">
					<u-form :model="form" :label-width="165" ref="uForm" style="margin: 0rpx 30rpx;">
						<u-form-item label="服务公司">
							<u-input v-model="form.Company" type="text" />
						</u-form-item>
						<u-form-item label="项目号">
							<u-input v-model="form.PID" type="text" />
						</u-form-item>
						<u-form-item label="备注">
							<u-input v-model="form.Remark" type="text" />
						</u-form-item>
					</u-form>
				</view>
			</view>
		</view>
		<u-button type="success" style="margin-top: 60rpx;display: block;width: 90%;" @click="submit">更新位置</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				form: {
					Longitude: '',
					Latitude: '',
					Address: '',
					UserID: '',
					Company: '',
					PID: '',
					Remark: ''
				},
				province: '',
				city: '',
				district: '',
				front: []
			}
		},
		computed: {},
		methods: {
			submit(){
				console.log(23)
				let p = {
					info: JSON.stringify(this.form)
				}
				this.$myHttp('CustomerService/CheckInLocation',p).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: '更新位置成功',
						type: 'success'
					})
					this.getUserLocation()
				})
			},
			initUserLocation(){
				let p = {
					name: uni.getStorageSync('name')
				}
				this.$myHttp('Main/GetUserInfo',p).then(res => {
					this.form.UserID = res.ID
					this.getUserLocation()
				})
			},
			getUserLocation(){
				let pt = {
					userID: this.form.UserID,
					pageSize: 10,
					pageIndex: 1
				}
				this.$myHttp('CustomerService/SelectLocation',pt).then(lRes => {
					this.front = lRes.Data
					console.log(this.front)
				})
			},
		},
		onLoad() {
			this.initUserLocation()
			let _this = this
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					console.log(res);
					_this.form.Longitude = res.longitude
					_this.form.Latitude = res.latitude
					let urlP = 'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=5TPBZ-I7MWO-67ZWZ-SL7SV-PJTNE-6CFQQ'
					uni.request({
					    url: urlP,
					    success: (resP) => {
					        console.log(resP)
					        console.log(resP.data)
									let rData = resP.data.result.address_component
									_this.form.Address = rData.province + rData.city + rData.district
									_this.province = rData.province
									_this.city = rData.city
									_this.district = rData.district
					    }
					});
				},
				fail: function (err) {
					console.log(err);
				}
			});
		}
	}
</script>

<style>
</style>
