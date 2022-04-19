<template>
	<!-- 故障和隐患 -->
	<view id="alarmList" class="content">
		<u-empty v-if="selectData.length === 0" text="暂无报警" margin-top="80" mode="list"></u-empty>
		<view v-else style="background-color: #f4f4f5;font-size: 36rpx;height: 100vh;">
			<view v-for="item in selectData"
				style="margin: 15rpx;background-color: #f8e8cf;border-radius: 10rpx;padding: 15rpx;">
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 30%;">
						报警时间
					</view>
					<view style="width: 70%;">
						{{item['时间']}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 30%;">
						清除时间
					</view>
					<view style="width: 70%;">
						{{item['清除时间']}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 30%;">
						故障编码
					</view>
					<view style="width: 70%;">
						{{item['故障编码']}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 30%;">
						含义解析
					</view>
					<view style="width: 70%;">
						{{item['含义解析']}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view style="width: 30%;">
						类型
					</view>
					<view style="width: 70%;">
						{{item.type}}
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				selectData: [],
			}
		},
		computed: {},
		methods: {
			getList() {}
		},
		onLoad(p) {
			console.log(p)
			let param = {
				CID: p.qzjId,
				NID: p.jgId,
				Select_BeginTime: p.startTime,
				Select_EndTime: p.endTime,
				Prioritys: p.gzlx,
				LastMinite: 0
			}
			this.$myHttp('Alarm/GetHisAlarmsByNode', param).then(res => {
				for (let item of res) {
					item.时间 = item.时间.substr(0, 19)
					item.清除时间 = item.清除时间 || ''
				}
				this.selectData = res
				console.log(res)
			})
		}
	}
</script>

<style>
</style>
