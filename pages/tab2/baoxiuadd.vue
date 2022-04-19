<template>
	<view class="content">
		<u-search style="margin-top: 10rpx;" @custom="getCompanyList" @search="getCompanyList" placeholder="公司搜索" v-model="companyName"></u-search>
		<u-form :model="form" :error-type="['message']" :label-width="165" ref="uForm" style="margin: 0rpx 30rpx;">
			<u-form-item label="客户公司" :required="true">
				<u-input v-model="form.company" type="select" @click="companySelectShow = true" />
			</u-form-item>
			<u-form-item label="联系人" prop="create_person_id" :required="true">
				<u-input v-if="show.contactInput" v-model="form.create_person_id" />
				<u-input v-else v-model="form.create_person" type="select" @click="userSelectShow = true" />
				<u-button v-if="show.contactInput && show.contactButton" type="primary" size="mini" @click="changeContactShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">选择</u-button>
				<u-button v-if="!show.contactInput && show.contactButton" type="success" size="mini" @click="changeContactShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">手填</u-button>
			</u-form-item>
			<u-form-item label="联系电话" prop="report_tel" :required="true">
				<u-input v-model="form.report_tel" type="text" />
			</u-form-item>
			<u-form-item label="起重机" prop="qzjLabel" :required="true">
				<u-input v-if="show.qzjInput" v-model="form.qzjLabel" />
				<u-input v-else v-model="form.qzjLabel" type="select" @click="qzjSelectShow = true" />
				<u-button v-if="show.qzjInput" type="primary" size="mini" @click="changeQzjShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">选择</u-button>
				<u-button v-else type="success" size="mini" @click="changeQzjShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">手填</u-button>
			</u-form-item>
			<u-form-item label="所属机构" prop="ssjgLabel" :required="true">
				<u-input v-if="show.ssjgInput" v-model="form.ssjgLabel" />
				<u-input v-else v-model="form.ssjgLabel" type="select" @click="ssjgSelectShow = true" />
				<u-button v-if="show.ssjgInput && show.jgButton" type="primary" size="mini" @click="changeSsjgShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">选择</u-button>
				<u-button v-if="!show.ssjgInput && show.jgButton" type="success" size="mini" @click="changeSsjgShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">手填</u-button>
			</u-form-item>
			<u-form-item label="项目/工作号">
				<u-input v-model="form.gzh" type="text" />
			</u-form-item>
			<u-form-item label="产品类型" prop="product_type" :required="true">
				<u-tag :text="item.name" :mode="item.mode" type="success" v-for="(item, index) in typeList"
					shape="circle" @click="tagSelect(item.name)" style="margin-right: 10rpx;" />
			</u-form-item>
			<u-form-item label="需求描述">
				<u-input v-model="form.bug_description" type="textarea" :height="110" :auto-height="true" />
			</u-form-item>
			<u-form-item label="上传">
				<u-upload :action="action" :show-progress="false" @on-success="uploadSuccess" @on-remove="removeImg"></u-upload>
			</u-form-item>
			<view style="display: flex;">
				<view style="width: 100rpx;">提示：
				</view>
				<view style="color: grey;">
					上传请尽可能体现出问题设备的型号、序列号或现象
				</view>
			</view>
			<u-button type="success" @click="submitData" style="margin-top: 20rpx;">确 定</u-button>
		</u-form>
		<u-select v-model="qzjSelectShow" :list="qzjList" @confirm="qzjSelectChange"></u-select>
		<u-select v-model="ssjgSelectShow" :list="ssjgList" @confirm="ssjgSelectChange"></u-select>
		<u-select v-model="companySelectShow" :list="companyList" @confirm="companySelectChange"></u-select>
		<u-select v-model="userSelectShow" :list="userList" @confirm="userSelectChange"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		BASE_URL
	} from '../../common/api.js'
	export default {
		data() {
			return {
				form: {
					id: '',
					crane_id: '',
					qzjLabel: '',
					mechanism: '',
					ssjgLabel: '',
					gzh: '', // 工作号
					product_type: '', // 产品类型
					company: '',
					companyId: '',
					report_person: '',
					create_person: '',
					create_person_id: '',
					report_tel: '',
					report_time: '',
					bug_description: '',
					report_img: []
				},
				companyName: '',
				currentUserId: '',
				action: BASE_URL + 'Image/PostUpload',
				show: {
					qzjInput: false,
					ssjgInput: false,
					jgButton: true,
					contactInput: false,
					contactButton: true
				},
				typeList: [],
				qzjSelectShow: false,
				ssjgSelectShow: false,
				companySelectShow: false,
				userSelectShow: false,
				qzjList: [],
				ssjgList: [],
				companyList: [],
				userList: [],
				rules: {
					qzjLabel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					ssjgLabel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					report_tel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					create_person_id: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					company: [{
						required: true,
						message: '请选择公司',
						trigger: 'blur',
					}]
				}
			}
		},
		computed: {},
		methods: {
			tagSelect(name) {
				for (let item of this.typeList) {
					if (item.name === name) {
						item.mode = item.mode === 'plain' ? 'dark' : 'plain'
						break
					}
				}
			},
			removeImg(index, lists) {
				console.log(lists)
				this.form.report_img = []
				for (let item of lists) {
					this.form.report_img.push(item.response.url)
				}
			},
			uploadSuccess(data) {
				this.form.report_img.push(data.url)
			},
			changeContactShow(){
				this.show.contactInput = !this.show.contactInput
				this.form.create_person = ''
				this.form.create_person_id = ''
				this.form.report_tel = ''
			},
			changeQzjShow() {
				this.show.qzjInput = !this.show.qzjInput
				this.form.qzjLabel = ''
				this.form.crane_id = -1
				this.changeSsjgShow()
				// 如果起重机是手填状态，则机构也必须为手填状所以隐藏按钮
				if (this.show.qzjInput) {
					this.show.jgButton = false
					this.show.ssjgInput = true
				} else {
					this.show.jgButton = true
				}
			},
			changeSsjgShow() {
				this.show.ssjgInput = !this.show.ssjgInput
				this.form.ssjgLabel = ''
				this.form.mechanism = -1
			},
			getCranesByCompany(val) {
				const p = {
					companyID: val
				}
				this.$myHttp('WaterData/GetCranesInCompany', p).then(res => {
					console.log(res)
					if (res.length === 0) {
						console.log(111)
						return
					}
					this.qzjList = []
					for (let item of res) {
						this.qzjList.push({
							value: item.ID,
							label: item.起重机名称
						})
					}
					this.form.crane_id = this.qzjList[0].value
					this.form.qzjLabel = this.qzjList[0].label
					this.getJgList()
				})
			},
			getProductType() {
				const data = {
					pageIndex: 1,
					pageSize: 20,
					pid: 'all',
					name: '产品类型',
				}
				this.$myHttp('Dict/SelectSysDictType', data).then(res => {
					if (res.Total === 0) {
						return
					}
					const typeP = {
						pageIndex: 1,
						pageSize: 1000,
						dict_id: res.Data[0].ID
					}
					this.$myHttp('Dict/SelectSysDictTree', typeP).then(typeP => {
						this.typeList = []
						for (let item of typeP) {
							this.typeList.push({
								name: item.name,
								mode: 'plain'
							})
						}
					})
				})
			},
			submitData() {
				let temp = []
				for (let item of this.typeList) {
					if (item.mode === 'dark') {
						temp.push(item.name)
					}
				}
				if(temp.length === 0) {
					this.$refs.uToast.show({
						title: '请选择产品类型',
						type: 'error'
					})
					return
				}
				this.form.product_type = temp.length > 0 ? JSON.stringify(temp) : ''
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let subTemp = {
							OrderID: this.form.id,
							CraneID: this.form.crane_id,
							CraneName: this.form.qzjLabel,
							MechanismID: this.form.mechanism,
							MechanismName: this.form.ssjgLabel,
							ProjectNumber: this.form.gzh,
							ProductType: this.form.product_type,
							Describe: this.form.bug_description,
							ContactPerson: this.form.create_person_id,
							ReportPerson: this.currentUserId,
							ContactNumber: this.form.report_tel,
							PictureAddress: JSON.stringify(this.form.report_img),
							CompanyID: this.form.companyId,
						}
						let p = {
							info: JSON.stringify(subTemp),
							type: 1
						}
						this.$myHttp('Order/AddOrder', p).then(res => {
							this.$refs.uToast.show({
								title: '代报成功',
								type: 'success'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 600)
						})
					}
				});
			},
			qzjSelectChange(val) {
				this.form.crane_id = val[0].value
				this.form.qzjLabel = val[0].label
				this.getJgList()
			},
			ssjgSelectChange(val) {
				this.form.mechanism = val[0].value
				this.form.ssjgLabel = val[0].label
			},
			companySelectChange(val) {
				this.form.company = val[0].label
				this.form.companyId = val[0].value
				this.selectUser()
				this.getCranesByCompany(this.form.companyId)
			},
			getCompanyList() {
				console.log(23)
				let p = {
					companyName: this.companyName
				}
				this.companyList = []
				this.$myHttp('Main/GetAllCompany',p).then(res => {
					for (let item of res) {
						this.companyList.push({
							value: item.ID,
							label: item.名称
						})
					}
					this.form.company = this.companyList[0].label
					this.form.companyId = this.companyList[0].value
					this.selectUser()
					this.getCranesByCompany(this.form.companyId)
				})
			},
			userSelectChange(val){
				this.form.create_person = val[0].label
				this.form.create_person_id = val[0].value
				this.form.report_tel = val[0].extra
			},
			selectUser() {
				this.userList = []
				let p = {
					CompanyID: this.form.companyId
				}
				this.$myHttp('Main/Get_UerInformation_CompanyID',p).then(resU => {
					for (let item of resU) {
						this.userList.push({
							value: item.ID,
							label: item.真实姓名,
							extra:item.联系电话,
						})
					}
					console.log(this.userList)
					if(this.userList.length > 0) {
						this.form.create_person = this.userList[0].label
						this.form.create_person_id = this.userList[0].value
						this.form.report_tel = this.userList[0].extra
						this.show.contactButton = true
						this.show.contactInput = false
					} else {
						// 所选公司下没有用户 create_persong_id直接传所填姓名(工程师版未接单的单子可以看到联系人)
						this.form.create_person = ''
						this.form.create_person_id = ''
						this.form.report_tel = ''
						this.show.contactButton = false
						this.show.contactInput = true
					}
				})
			},
			getUserId(){
				let p = {
					name: uni.getStorageSync('name')
				}
				this.$myHttp('Main/GetUserInfo',p).then(res => {
					this.currentUserId = res.ID
				})
			},
			getJgList() {
				const data = {
					cid: this.form.crane_id,
					Tags: JSON.stringify(['mechanism']),
					toLevel: 2,
					cal: 0
				}
				this.ssjgList = []
				this.$myHttp('AgentTree/GetNodesByTag', data).then(res => {
					if(res.length === 0) {
						// 起重机下没有机构 则切换到手填模式
						this.show.ssjgInput = true
						this.form.mechanism = -1
						this.form.ssjgLabel = ''
						this.show.jgButton = false
						return
					}
					this.show.ssjgInput = false
					this.show.jgButton = true
					for (let item of res) {
						this.ssjgList.push({
							value: item.ID,
							label: item.NodeConfig.ShowName
						})
					}
					this.form.mechanism = this.ssjgList[0].value
					this.form.ssjgLabel = this.ssjgList[0].label
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onShow() {},
		onLoad() {
			this.getProductType()
			this.getCompanyList()
			this.getUserId()
		}
	}
</script>

<style>
	.u-form-item--right__content__slot {
		flex-wrap: wrap !important;
	}
</style>
