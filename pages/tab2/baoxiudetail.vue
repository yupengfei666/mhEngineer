<template>
	<view class="content">
		<u-form :model="form" :error-type="['message']" :label-width="165" ref="uForm" style="margin: 0rpx 30rpx;">
			<u-form-item label="工单号">
				<span>{{form.OrderID}}</span>
			</u-form-item>
			<u-form-item label="起重机">
				<span>{{form.CraneName}}</span>
			</u-form-item>
			<u-form-item label="所属机构">
				<span>{{form.MechanismName}}</span>
			</u-form-item>
			<u-form-item label="项目/工作号">
				<span>{{form.ProjectNumber}}</span>
			</u-form-item>
			<u-form-item label="产品类型" prop="product_type">
				<u-tag style="margin-right: 10rpx;" :text="item" v-for="(item,index) in form.ProductType" type="success"  shape="circle"/>
			</u-form-item>
			<u-form-item label="需求描述">
				<span>{{form.Describe}}</span>
			</u-form-item>
			<u-form-item label="联系人">
				<span>{{form.ContactPersonName}}</span>
			</u-form-item>
			<u-form-item label="联系电话">
				<span>{{form.ContactNumber}}</span>
			</u-form-item>
			<u-form-item label="图片">
				<pictureShow :imgData="form.report_img"></pictureShow>
			</u-form-item>
		</u-form>
	</view>
</template>
<script>
	import pictureShow from '../../components/common/pictureShow.vue'
	export default {
		data() {
			return {
				form: {
				}
			}
		},
		computed: {},
		components:{
			pictureShow
		},
		methods: {
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onShow() {},
		onLoad(data) {
			let result = JSON.parse(data.data)
			result.Describe = decodeURIComponent(result.Describe)
			this.form = result
			console.log(this.form)
			this.form.report_img = JSON.parse(this.form.PictureAddress)
		}
	}
</script>

<style>
</style>
