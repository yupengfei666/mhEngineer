<template>
	<view class="content">
		<checkbox-group @change="systemCheckboxChange">
			<label class="uni-list-cell uni-list-cell-pd"  v-for="(system,index) in systemList" :key="index">
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
				systemList: [],
				systemCheck:[]
			}
		},
		computed: mapState(['forcedLogin',"url"]),
		methods: {
			...mapMutations(['login', 'logout', 'setStorage']),
			systemCheckboxChange: function (e) {
					var values = e.target.value;
					uni.setStorage({
						key: "systemCheck",
						data: values,
					});
				},
				getSystem() {
					uni.showToast({
					    title: '加载中...',
						icon:'loading',
						duration:30000
					});
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
								this.systemList = res.data;
								var isChecked = false;
								for (var i = 0, lenI = this.systemList.length; i < lenI; ++i) {
									this.systemList[i].Checked = false;
									for (var j = 0, lenJ = this.systemCheck.length; j < lenJ; ++j) {
										if (this.systemList[i].Name == this.systemCheck[j]) {
											this.systemList[i].Checked = true;
											isChecked = true;
											break
										}
									}
								};
								if(!isChecked)
								{
									for (var i = 0, lenI = this.systemList.length; i < lenI; ++i) {
										this.systemList[i].Checked = true;
									};
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
				}
			},
			onShow() {
				uni.getStorage({
					key: "systemCheck",
					success: (res) => {
						this.systemCheck = res.data;
					}
				});
				uni.getStorage({
					key: "name",
					success: (res) => {
						this.getSystem();
						this.login(res.data);
					},
					fail: () => {
						if (this.forcedLogin) {
							uni.reLaunch({
								url: '../login/login',
							});
						}
					}
				});
			}
	}
</script>

<style>
</style>
