<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" title="" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="display: flex;justify-content: center;">
					<image src="/static/icon/logo_transparent.png" style="width: 150px; height: 150px;" ></image>
				</view>
			</view>	
			<!--选项卡-->
			<view style="display: flex;justify-content: center;">
				<view class="xxk-view" >
					<view>
						<text @click="xxkChange(1)" v-if="xxk==1" style="color: white; font-size: 15px;cursor: pointer; font-weight: 600;">{{$t('login.denglu')}}</text>
						<text @click="xxkChange(1)" v-else style="color: #818793; font-size: 15px;cursor: pointer;">{{$t('login.denglu')}}</text>
					</view>
					<view style="margin-left: 7%;">
						<text @click="xxkChange(3)" v-if="xxk==3" style="color: white; font-size: 15px;cursor: pointer; font-weight: 600;">{{$t('login.miyaodenglu')}}</text>
						<text @click="xxkChange(3)" v-else style="color: #818793; font-size: 15px;cursor: pointer;">{{$t('login.miyaodenglu')}}</text>
					</view>
					<view style="margin-left: 7%;" >
						<text @click="xxkChange(2)" v-if="xxk==2" style="color: white; font-size: 15px;cursor: pointer; font-weight: 600;">{{$t('login.zhuce')}}</text>
						<text @click="xxkChange(2)" v-else style="color: #9fa6b5; font-size: 15px;cursor: pointer;">{{$t('login.zhuce')}}</text>
					</view>
				</view>
			</view>
			<view v-if="xxk==1" style="display: flex;justify-content: center;flex-direction: column;">
				<!-- <view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="loginJson.loginName" class="uni-input" maxlength="32" :placeholder="$t('login.yonghuming')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 50%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="loginJson.loginPassword" class="uni-input" password maxlength="32" :placeholder="$t('login.mima')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 50%;"/>
				</view> -->
				<view class="login-username">
								<input type="text" :placeholder="$t('login.yonghuming')"  v-model="loginJson.loginName">
				</view>
				<view class="login-password">
								<input type="safe-password" name="" id="" :placeholder="$t('login.mima')" v-model="loginJson.loginPassword">
				</view>
				
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="button">
					<button type="primary" size="mini" style="width: 100px;" @click="login()">{{$t('login.denglu')}}</button>
				</view>
			</view>
			<view v-if="xxk==3" style="display: flex;justify-content: center;flex-direction: column;">
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="login-username">
					<input v-model="loginJson.loginName"  maxlength="32" :placeholder="$t('login.miyao')" placeholder-style="font-size:13px;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="button">
					<button type="primary" size="mini" style="width: 100px;" @click="login()">{{$t('login.miyaodenglu')}}</button>
				</view>
			</view>
			<view v-if="xxk==2" style="display: flex;justify-content: center;flex-direction: column;">
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="login-username">
					<input  @input="regChange()" v-model="regName" maxlength="32" :placeholder="$t('login.yonghuming')" placeholder-style="font-size:13px;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="login-password">
					<input  @input="regChange()" v-model="regPwd" password maxlength="32" :placeholder="$t('login.mima')" placeholder-style="font-size:13px;" />
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="login-password">
					<input  @input="regChange()" v-model="regPwd1" password maxlength="32" :placeholder="$t('login.querenmima')" placeholder-style="font-size:13px;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;" class="button">
					<button type="primary" size="mini" style="width: 100px;" :disabled="registerBtn" ref="btn" @click="regeisterBtn()">{{$t('login.zhuce')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {get,post} from "@/js/axiosConfig.js";
import {getUserInfo} from "@/js/Api.js"
	export default {
		data() {
			return {
				ustdAddress:"dashioasoiadjsklkjljs",
				xxk: 1,
				registerBtn: true,
				regName: "",
				regPwd: "",
				regPwd1: "",
				loginJson: {
				  loginName:"",
				  loginPassword:""
				}
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			xxkChange(flag){
				this.xxk = flag
				this.regName =""
				this.regPwd =""
				this.regPwd1 =""
				this.loginJson.loginName =""
				this.loginJson.loginPassword =""
			},
			login(){
				post('pub/user/login', this.loginJson, (response) => {
					if (response.data.code == 200) {
						sessionStorage.setItem("userToken", response.data.data)
						localStorage.setItem("wxStatus", "1")
						uni.showToast({
							title: 'Login success',
							duration: 1500,
							icon: 'success'
						});
						setTimeout(() => {
							uni.reLaunch({
								url:"/pages/user/user"
							})
						}, 1000);
					} else {
						uni.showToast({
							title: response.data.message,
							duration: 1500,
							icon: 'error'
						});
					}
				}, (error) => {
					uni.showToast({
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
				})
			},
			regChange(){
				if(this.regPwd1 == this.regPwd){
					if(this.regName == "" || this.regPwd == ""){
						this.registerBtn = true
					}else{
						this.registerBtn = false
					}
				}else{
					this.registerBtn = true
				}
			},
			regeisterBtn(){
				if (this.regName.length < 6) {
					uni.showToast({
						title: 'Username length less than 6!',
						duration: 1500,
						icon: 'error'
					});
				}
				let register = {
					"userName": this.regName,
					"pwd": this.regPwd,
					"pwd2": this.regPwd1,
					"phone": "",
					"userEmail": "",
				}
				post('/qwertyuiop/user/add', register, (response) => {
					if (response.data.code == 200) {
						uni.showToast({
							title: 'register success',
							duration: 1500,
							icon: 'success'
						});
						this.regName = ""
						this.regPwd = ""
						this.regPwd1 = ""
						this.xxk = 1
					} else {
						uni.showToast({
							title: response.data.message,
							duration: 1500,
							icon: 'error'
						});
					}
				}, (error) => {
					uni.showToast({
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
				})
			}
		}
	}
</script>

<style>
.xxk-view{
	width: 95%;
	display: flex;
	justify-content: center;
	height: 50px; /* 高度自行调整 */
	margin-top: 20px;
}
		.login-username{
			display: flex;
			align-items: center;
		    margin: 0 50rpx;
			border-bottom: 1rpx solid gainsboro;
			input{
				padding: 10rpx;
				height: 60rpx;
				width: 80%;
			}
			color: #d0d3d3;
			i {
				color: #11c53e;
				padding-right: 20rpx;
				font-size: 50rpx;
			}
		}
		.login-password{
			display: flex;
			align-items: center;
		    margin: 0 50rpx;
			border-bottom: 1rpx solid gainsboro;
			margin-top: 50rpx;
			color: #d0d3d3;
			input{
				padding: 10rpx;
				height: 60rpx;
				width: 80%;
			}
			i {
				color: #11c53e;
				padding-right: 20rpx;
				font-size: 50rpx;
			}
		}
		.button{
				margin-top: 120rpx;
				
				button{
					background-color:#247c9c;
					width: 90%;
					height: 85rpx;
					text-align: center;
					line-height: 85rpx;
					color: #fff;
				}
			}
</style>
