<template>
	<view class="content">
		<view style="display: flex;flex-direction: column;justify-content:center;">
<!-- 			<official-account style="width: 100%;height: 300upx;"></official-account>
			<view style="width: 100%;margin-left:5%;">
			    <block v-if="hasLogin === true">
			        <view class="uni-h3 uni-center uni-common-mt">已登录</view>
			        <view class="uni-hello-text uni-center">
			            <text>每个账号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</text>
			        </view>
			    </block>
			    <block v-if="hasLogin === false">
			        <view class="uni-h3 uni-center uni-common-mt">未登录</view>
			        <view class="uni-hello-text uni-center">
			            请点击按钮登录
			        </view>
			    </block>
			</view> -->
<!-- 			<view  style="width: 100%;">
			    <!-- #ifdef MP-TOUTIAO -->
				<button :loading="buttonloading" type="primary" class="primary" hover-class="uni-hover" @tap="tologin(value)" v-for="(value,key) in providerList" style="margin-top:20px;margin-left:5%;width:90%"
				:key="key">
					登录
				</button>
			    <!-- #endif -->
			    <!-- #ifndef MP-TOUTIAO -->
			    <button :loading="buttonloading" type="primary" class="primary" hover-class="uni-hover" v-for="(value,key) in providerList" @click="tologin(value)" style="margin-top:20px;margin-left:5%;width:90%"
			        :key="key">{{value.name}}
				</button>
			    <!-- #endif -->
			</view> -->
			<view style="display: flex;flex-direction:column;align-items : center;">
				<image src="../../static/img/logo/logo.png" style="height: 150upx;width: 150upx;"></image> 
				<view class="label">起重机硬件相关问题联系美恒客服</view>
			</view>
			<view style="width: 100%;">
				<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
				<button type="primary" class="primary" style="margin-top:20px;margin-left:5%;width:90%" open-type="contact" >联系美恒客服</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				providerList: [],
				hasLogin:false
			}
		},
		computed: {
			...mapState({
				loginProvider: state => state.loginProvider
			})
		},
		onLoad() {
		    uni.getProvider({
		        service: 'oauth',
		        success: (result) => {
		            this.providerList = result.provider.map((value) => {
		                let providerName = '';
		                switch (value) {
		                    case 'weixin':
		                        providerName = '微信登录'
		                        break;
		                    case 'qq':
		                        providerName = 'QQ登录'
		                        break;
		                    case 'sinaweibo':
		                        providerName = '新浪微博登录'
		                        break;
		                    case 'xiaomi':
		                        providerName = '小米登录'
		                        break;
		                    case 'alipay':
		                        providerName = '支付宝登录'
		                        break;
		                    case 'baidu':
		                        providerName = '百度登录'
		                        break;
		                    case 'toutiao':
		                        providerName = '头条登录'
		                        break;
		                    case 'apple':
		                        providerName = '苹果登录'
		                        break;
		                }
		                return {
		                    name: providerName,
		                    id: value
		                }
		            });
		
		        },
		        fail: (error) => {
		            console.log('获取登录通道失败', error);
		        }
		    });
		},
		methods: {
			...mapMutations(['login']),
			tologin(provider) {
				this.hasLogin = true;
			    uni.login({
			        provider: provider.id,
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user', //支付宝小程序需设置授权类型
			        // #endif
			        success: (res) => {
			            console.log('login success:', res);
			            // 更新保存在 store 中的登录状态
			            this.login(provider.id);
			        },
			        fail: (err) => {
			            console.log('login fail:', err);
			        }
			    });
			},

			clear() {
				this.hasUserInfo = false;
				this.userInfo = {};
			}
		}
	}
</script>

<style>
</style>
