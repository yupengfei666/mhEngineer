<template>
	<view class="content" style="display: flex;flex-direction: column;width: 100%;">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							原密码
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" password name="yuanmima" placeholder="请输入原密码" v-model='yuanmima'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							新密码
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" password name="xinmima" placeholder="请输入新密码" v-model='xinmima'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							确认新密码
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" password name="querenxinmima" placeholder="请再次输入新密码" v-model='querenxinmima'/>
						</view>
					</view>
				</view>
				<button type="primary" hover-class="uni-hover" class="primary" formType="submit" style="margin-left:5%;width: 90%;" >
					<view style="display: flex;flex-direction: row;justify-content: center;">
						<view>
							确定
						</view>
					</view>
				</button>
			</form>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
	} from 'vuex';
	import { Utils } from '../../../common/utils'
	let utils = new Utils()
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var  graceChecker = require("../../../common/graceChecker.js");
	export default {
		data() {
			return {
				title: '表单验证',
				yuanmima:'',
				xinmima:'',
				querenxinmima:''
			}
		},
		computed: mapState(["url"]),
		methods: {
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"yuanmima", checkType : "string", checkRule:"1,10",  errorMsg:"原密码不能为空"},
					{name:"xinmima", checkType : "string", checkRule:"1,10",  errorMsg:"新密码不能为空"},
					{name:"querenxinmima", checkType : "string", checkRule:"1,10",  errorMsg:"确认新密码不能为空"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					if(this.xinmima!=this.querenxinmima)
					{
						uni.showToast({
							icon: 'none',
							title: '新密码与确认新密码不一致',
						});
						return;
					}
					var that = this
					uni.request({
						url: this.url + "Main/UpdateUserPassword",
						method: 'GET',
						dataType: 'json',
						header: {
							'content-type': 'application/json',
							'sessionkey': uni.getStorageSync('password')
						},
						data: {
							name: uni.getStorageSync('name'),
							password1:that.yuanmima,
							password2:that.xinmima
						},
						success: (res) => {
							if(res.statusCode!== 200){
								console.log("请求失败:", res);
								if(res.statusCode===401)
								{
									uni.reLaunch({
										url: '../tab4/login',
									});
								}
							}else
							{
								uni.showToast({
									icon: 'none',
									title: res.data,
								});
							}
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络连接失败',
							});
						}
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			}
		},
		onShow() {
		}
	}
</script>

<style>
</style>
