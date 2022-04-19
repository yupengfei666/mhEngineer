<template>
	<!-- 转单 -->
	<view id="bxshift" style="padding: 20rpx;background-color: white;height: 100vh;width:100%">
		<view class="uni-h4">
			您要转单的工单号为 <span style="margin-left: 10rpx;">{{orderID}}</span>
			<view class="uni-h5" style="margin-top: 10rpx;">
				请确保转单前已与被转单工程师沟通。
			</view>
		</view>
		<u-divider :fontSize="34"  style="margin: 20rpx 0rpx;display: block;">被转单人</u-divider>
		<u-search placeholder="被转单人" @custom="getPeople" @search="getPeople" v-model="name"></u-search>
		<view style="margin-top: 20rpx;height: calc(100vh - 400rpx);overflow: auto;">
			<u-cell-group>
					<u-cell-item :title-style="{color: item.color}" :icon-style="{color: item.color}" icon="account-fill" :title="item.showName" v-for="(item,index) in people" :arrow="false">
						<u-button slot="right-icon" size="mini" shape="circle" @click="selected(item.ID)" type="success">选择</u-button>
					</u-cell-item>
				</u-cell-group>
		</view>
		<u-button type="success" style="margin-top: 20rpx;display: block;" @click="submit">转单</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				orderID: '',
				people: [],
				personId: '',
				name: ''
			}
		},
		computed: {},
		methods: {
			submit(){
				if(!this.personId){
					this.$refs.uToast.show({
						title: '请选择转单人',
						type: 'error'
					})
					return
				}
				let subTemp = {
					OrderID: this.orderID
				}
				let p = {
					info: JSON.stringify(subTemp),
					userID: this.personId,
					type: 3
				}
				this.$myHttp('Order/UpdateOrder',p).then(res => {
					this.$refs.uToast.show({
						title: '转单成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 600)
				})
			},
			selected(val){
				this.personId = val
				for (let item of this.people) {
					item.color = item.ID == val ? '#19be6b' : ''
				}
			},
			getPeople(){
				let p = {
					sessionkey: uni.getStorageSync('password'),
					realName: this.name
				}
				this.people = []
				this.$myHttp('Main/GetEngineers',p).then(res => {
					for (let item of res) {
						if(item.Name === uni.getStorageSync('name')){
							continue
						}
						item.color = ''
						item.showName = item.真实姓名 + '(' + item.联系电话 + ')'
						this.people.push(item)
					}
				})
			}
		},
		onLoad(val) {
			console.log(val)
			let temp = JSON.parse(val.data)
			this.orderID = temp.OrderID
			this.getPeople()
		}
	}
</script>

<style>
</style>
