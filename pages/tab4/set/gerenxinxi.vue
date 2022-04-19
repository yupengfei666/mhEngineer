<template>
	<view class="content" style="display: flex;flex-direction: column;width: 100%;">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							用户名
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="yonghuming" placeholder="请输入用户名" v-model='yonghuming'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 2s5%;">
							性别
						</view>
						<view style="width: 75%;color:#007AFF">
							<radio-group name="radio" @change="radioChange">
								<label>
									<radio value="男" :checked="xingbie === '男'"/><text>男</text>
								</label>
								<label>
									<radio value="女" :checked="xingbie === '女'"/><text>女</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							年龄
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" type="number" placeholder="请输入年龄" v-model="nianling"/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							地址
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="dizhi" placeholder="请输入地址" v-model='dizhi'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							联系电话
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="lianxidianhua" placeholder="请输入联系电话" v-model='lianxidianhua'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							办公电话
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="bangongdianhua" placeholder="请输入办公电话" v-model='bangongdianhua'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							邮箱
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="youxiang" placeholder="请输入邮箱" v-model='youxiang'/>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 65upx;">
						<view style="margin-left: 15upx;width: 25%;">
							备注
						</view>
						<view style="width: 75%;color:#007AFF">
							<input class="uni-input" name="beizhu" placeholder="请输入备注" v-model='beizhu'/>
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
				yonghuming:'',
				xingbie:'',
				nianling:'',
				dizhi:'',
				lianxidianhua:'',
				bangongdianhua:'',
				youxiang:'',
				beizhu:'',
			}
		},
		computed: mapState(["url"]),
		methods: {
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"yonghuming", checkType : "string", checkRule:"1,10",  errorMsg:"用户名不能为空"}
				];
				console.log(this.yonghuming)
				console.log(this.xingbie)
				console.log(this.nianling)
				console.log(this.dizhi)
				console.log(this.lianxidianhua)
				console.log(this.bangongdianhua)
				console.log(this.youxiang)
				console.log(this.beizhu)
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					var that = this
					uni.request({
						url: this.url + "WeChat/SetUserBaseInfo",
						method: 'GET',
						dataType: 'json',
						header: {
							'content-type': 'application/json',
							'sessionkey': uni.getStorageSync('password')
						},
						data: {
							Name: this.yonghuming,
							性别: this.xingbie,
							年龄: this.nianling,
							地址: this.dizhi,
							联系电话: this.lianxidianhua,
							办公电话: this.bangongdianhua,
							备注: this.beizhu,
							邮箱: this.youxiang
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
			},
			radioChange(evt) {
				this.xingbie = evt.target.value
			},
			getGeRenXinXi() {
				uni.showToast({
				    title: '加载中...',
					icon:'loading',
					duration:30000
				});
				uni.request({
					url: this.url + "WeChat/GetUserBaseInfo",
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
							if(res.data!==undefined&&res.data!==null){
								this.yonghuming = res.data.Name
								this.xingbie = res.data.性别
								this.nianling = res.data.年龄
								this.dizhi = res.data.地址
								this.lianxidianhua = res.data.联系电话
								this.bangongdianhua = res.data.办公电话
								this.youxiang = res.data.邮箱
								this.beizhu = res.data.备注
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
			this.getGeRenXinXi();
		}
	}
</script>

<style>
</style>
