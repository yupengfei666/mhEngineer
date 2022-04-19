<template>
	<view id="dataquery" class="content">
		<!-- <u-subsection :list="list" active-color="#ff9900" :current="0" mode="subsection"></u-subsection> -->
		<view style="padding: 10rpx;">
			<u-form :model="form" :label-width="165" ref="uForm">
				<u-form-item label="开始时间">
					<myPickDate :defaultTime="form.startTime" @selectTime="startTimeChange"></myPickDate>
				</u-form-item>
				<u-form-item label="结束时间">
					<myPickDate :defaultTime="form.endTime" @selectTime="endTimeChange"></myPickDate>
				</u-form-item>
				<u-form-item label="起重机">
					<u-input v-model="form.qzjLabel" type="select" @click="qzjSelectShow = true" />
				</u-form-item>
				<u-form-item label="机构">
					<u-input v-model="form.ssjgLabel" type="select" @click="ssjgSelectShow = true" />
				</u-form-item>
				<u-form-item label="故障类型">
					<u-input v-model="form.gzlx" type="select" @click="gzlxSelectShow = true" />
				</u-form-item>
				<u-button size="default" type="success" @click="submit" style="width: 80%;margin-top: 10rpx;">查询</u-button>
			</u-form>
		</view>
		<view style="height: 2rpx;background-color: #c8c9cc"></view>
		<view style="margin-top: 30rpx;margin-left: 10rpx;color: #2b85e4;">
			注：查询时间间隔不能大于7天
		</view>
		<u-select v-model="qzjSelectShow" :list="qzjList" @confirm="qzjSelectChange">
		</u-select>
		<u-select v-model="ssjgSelectShow" :list="ssjgList" @confirm="ssjgSelectChange"></u-select>
		<u-select v-model="gzlxSelectShow" :list="gzlxList" @confirm="gzlxSelectChange"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import myPickDate from '../../components/common/myPickDate.vue'
	import {Utils} from '../../common/utils.js'
	let utils = new Utils()
	export default {
		components: {myPickDate},
		data() {
			return {
				form: {
					startTime: '',
					endTime: '',
					crane_id: '',
					qzjLabel: '',
					mechanism: '',
					ssjgLabel: '',
					gzlx: '',
					gzlxValue: ''
				},
				qzjSelectShow: false,
				ssjgSelectShow: false,
				gzlxSelectShow: false,
				qzjList: [],
				ssjgList: [],
				gzlxList: [],
			}
		},
		computed: {},
		methods: {
			startTimeChange(val){
				this.form.startTime = val
			},
			endTimeChange(val){
				this.form.endTime = val
			},
			submit(){
				let endT = new Date(this.form.endTime).getTime()
				let startT = new Date(this.form.startTime).getTime()
				let day = (endT - startT) / (1000 * 60 * 60 * 24)
				if(day > 7) {
					this.$refs.uToast.show({
						title: '查询时间间隔不能大于7天',
						type: 'error'
					})
					return
				}
				uni.navigateTo({
					url: "./alarmlist?startTime=" + this.form.startTime + 
					"&endTime=" + this.form.endTime + 
					"&qzjId=" + this.form.crane_id +
					"&jgId=" + this.form.mechanism + 
					"&gzlx=" + this.form.gzlxValue
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
			gzlxSelectChange(val) {
				this.form.gzlxValue = val[0].value
				this.form.gzlx = val[0].label
			},
			getQzjList() {
				const data = {
					SessionId: uni.getStorageSync('password')
				}
				this.$myHttp('WaterData/CraneInfo', data).then(res => {
					if (!res.cranes) {
						return
					}
					const cranes = res.cranes
					this.qzjList = []
					for (let item of cranes) {
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
			getJgList() {
				const data = {
					cid: this.form.crane_id,
					Tags: JSON.stringify(['mechanism']),
					toLevel: 2,
					cal: 0
				}
				this.ssjgList = []
				this.$myHttp('AgentTree/GetNodesByTag', data).then(res => {
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
		onLoad() {
			this.gzlxList = [{
				value: '[2,3,4]',
				label: '全部'
			},{
				value: '[2]',
				label: '警告'
			},{
				value: '[3]',
				label: '故障'
			},{
				value: '[4]',
				label: '严重故障'
			}]
			this.form.gzlx = this.gzlxList[0].label
			this.form.gzlxValue = this.gzlxList[0].value
			this.getQzjList()
			// 默认查看进7天故障和隐患
			this.form.startTime = utils.subMinuteToTime(60 * 24 * 7)
			this.form.endTime = utils.getDateTime()
		}
	}
</script>

<style>
</style>
