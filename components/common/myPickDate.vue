<template>
	<view id="myPickDate" style="width: 100%;">
		<u-input v-model="selectTime" type="select" @click="timeShow = true" />
		<u-picker v-model="timeShow" :default-time="pTime" mode="time" :params="params" @confirm="selectChange"></u-picker>
	</view>
</template>

<script>
	export default {
		name: 'myPickDate',
		props: {
			defaultTime: {
				type: String,
				default: ''
			},
			dateType: {
				type: String,
				default: 'all'
			}
		},
		data() {
			return {
				timeShow: false,
				pTime: '',
				selectTime: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				}
			}
		},
		mounted() {
			this.pTime = this.defaultTime
			this.selectTime = this.defaultTime
			if(this.dateType === 'date') {
				this.params.year = true
				this.params.month = true
				this.params.day = true
				this.params.hour = false
				this.params.minute = false
				this.params.second = false
			} else if(this.dateType === 'time') {
				this.params.year = false
				this.params.month = false
				this.params.day = false
				this.params.hour = true
				this.params.minute = true
				this.params.second = true
			}
		},
		methods: {
			selectChange(val) {
				let time = ''
				if(this.dateType === 'date'){
					time = val.year + '-' + val.month + '-' + val.day
				} else if(this.dateType === 'time') {
					time = val.hour + ':' + val.minute + ':' + val.second
				} else {
					time = val.year + '-' + val.month + '-' + val.day + ' ' + val.hour + ':' + val.minute + ':' + val.second
				}
				this.selectTime = time
				this.pTime = time
				this.$emit('selectTime', time)
			}
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";
</style>