<template>
	<view id="bxmessage" style="background-color: white;height: 100vh;width:100%">
		<scroll-view :scroll-y="true" :scroll-top="scropTop" style="height: calc(100vh - 90rpx);font-size: 32rpx;">
			<view :class="item.class" v-for="item in list" style="margin: 10rpx;">
				<view style="font-weight: bold;margin-bottom: 20rpx;display: flex;align-items: center;">
					<u-icon name="account-fill" size="40"></u-icon>
					<span style="margin-left: 5rpx;">{{item.OrderMessagePersonName}}</span>
				</view>
				<view v-if="item.Type === '0'" style="margin-bottom: 10rpx;width: 80%;">{{item.Content}}</view>
				<view v-else style="margin-bottom: 10rpx;width: 80%;">
					<pictureShow :imgData="[item.PictureAddress]"></pictureShow>
				</view>
				<view class="uni-h5"
					style="border-bottom: 2rpx solid #E4E7ED;padding-bottom: 10rpx;margin-bottom: 10rpx;width: 100%;font-size: 32rpx;">
					{{item.CreateTime}}
				</view>
			</view>
		</scroll-view>
		<view
			style="border-top: #DCDFE6 1px solid;height: 90rpx;background-color: #E4E7ED;display: flex;align-items: center;justify-content: space-between;">
			<view style="width: 11%;display: flex;justify-content: center;">
				<!-- <u-icon name="photo" color="#2979ff" size="60"></u-icon> -->
				<u-upload :action="action" :custom-btn="true" :show-upload-list="false" @on-success="uploadSuccess">
					<view slot="addBtn">
						<u-icon name="photo" size="60" color="#2979ff"></u-icon>
					</view>
				</u-upload>
			</view>
			<view style="width: 89%;height: 100%;padding: 10rpx;display: flex;align-items: center;">
				<u-input v-model="inputMessage" style="width: 100%;" :custom-style="{background: 'white',padding: '0px'}" type="text"
					:border="false" />
				<u-button style="margin-left: 8rpx;" @click="submit(0)" size="mini" type="success" shape="square">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		BASE_URL
	} from '../../common/api.js'
	import pictureShow from '../../components/common/pictureShow.vue'
	export default {
		components: {pictureShow},
		data() {
			return {
				scropTop: 0,
				gdId: '',
				inputMessage: '',
				list: [],
				action: BASE_URL + 'Image/PostUpload',
			}
		},
		computed: {},
		methods: {
			// 0 文本 1 图片
			submit(type,imgUrl =''){
				console.log(this.inputMessage)
				let temp = {
					OrderID: this.gdId,
					Type:type,
					PictureAddress: imgUrl
				}
				if(type === 0) {
					if(!this.inputMessage){
						return
					}
					temp.Content = this.inputMessage
				} else {
					temp.Content = ''
				}
				let p = {
					info: JSON.stringify(temp)
				}
				this.$myHttp('Order/AddOrderMessage', p).then(res => {
					console.log(res)
					this.getList()
				})
			},
			getList() {
				let p = {
					OrderMessageID: 'all',
					OrderID: this.gdId,
					pageSize: 30,
					pageIndex: 1
				}
				this.$myHttp('Order/SelectOrderMessage', p).then(res => {
					this.list = []
					for (let item of res.Data) {
						item.class = item.IsUser === '1' ? 'right-context' : ''
						this.list.push(item)
					}
					this.inputMessage = ''
					// 滚动到底部
					this.scropTop += 9999
				})
			},
			uploadSuccess(data) {
				let imgUrl = data.url
				this.submit(1,imgUrl)
			}
		},
		onLoad(val) {
			this.gdId = val.id
			this.getList()
		}
	}
</script>

<style lang="scss">
	#bxmessage {
		.right-context {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			text-align: right;
		}
	}
</style>
