<template>
	<view class="home_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" left-icon="contact" @clickLeft="toggle()"
								:title="$t('home.home')" :shadow="false" :border="false">		
		</uni-nav-bar>
		<view class="content">
			<!--轮播图-->
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" interval="2000" duration="500">
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/swiper/1.jpg" style="width: 100%;margin-top: 2px;"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/swiper/2.jpg" style="width: 100%;margin-top: 2px;"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/swiper/3.jpg" style="width: 100%;margin-top: 2px;"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/swiper/4.jpg" style="width: 100%;margin-top: 2px;"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!--公告-->
			<view style="display: flex;justify-content: center;" @click="openPage('/pages/home/gonggao', 'nav')">
				<uni-notice-bar :speed="40" class="remark" :showIcon="true" :scrollable="true" background-color="#2a2a38" color="#9fa6b5" single :text="remark" />
			</view>
			<!--功能按钮-->
			<view style="display: flex;justify-content: center;">
				<view class="uni-grid-btn">
					<view class="uni-grid-btn-item" @click="openPage('/pages/home/chongzhi', 'nav')">
						<image src="../../static/navbar/chongbi.png"></image>
						<view>{{$t('home.chongzhi')}}</view>
					</view>
					<view class="uni-grid-btn-item" @click="openPage('/pages/home/tixian', 'nav')">
						<image src="../../static/navbar/homeqiquanicon.png"></image>
						<view>{{$t('home.tibi')}}</view>
					</view>
					<view class="uni-grid-btn-item" @click="openPage('/pages/wakuang/wakuang', 'lch')">
						<image src="../../static/navbar/4.png"></image>
						<view>{{$t('home.wakuang')}}</view>
					</view>
					<view class="uni-grid-btn-item" @click="openPage('/pages/home/kefu', 'nav')">
						<image src="../../static/navbar/heyue.png"></image>
						<view>{{$t('home.kefu')}}</view>
					</view>
					<view class="uni-grid-btn-item" @click="openPage('/pages/home/shimin', 'nav')">
						<image src="../../static/navbar/renzheng.png"></image>
						<view>{{$t('home.shiming')}}</view>
					</view>
				</view>
			</view>
			<!--选项卡-->
			<view style="display: flex;justify-content: center;">
				<view class="xxk-view" >
					<view>
						<text @click="xxkChange(0)" v-if="xxk==1" style="color: white; font-size: 18px;text-decoration:underline;cursor: pointer;">{{$t('home.zixuan')}}</text>
						<text @click="xxkChange(1)" v-else style="color: #9fa6b5; font-size: 18px;cursor: pointer;">{{$t('home.zixuan')}}</text>
					</view>
					<view style="margin-left: 7%;" >
						<text @click="xxkChange(1)" v-if="xxk==0" style="color: white; font-size: 18px;text-decoration:underline;cursor: pointer;">{{$t('home.quanbu')}}</text>
						<text @click="xxkChange(0)" v-else style="color: #9fa6b5; font-size: 18px;cursor: pointer;">{{$t('home.quanbu')}}</text>
					</view>
				</view>
			</view>
			<!--虚拟币列表-->
			<view style="display: flex;justify-content: center;">
				<view class="xnb-list">
					<view v-for="item in xnbList" :key="item.index"
					@click="openXnbPage('/pages/maimai/maimai','lch',item[0])"
					class="xnb-list-item" style="margin-top: 20px; width: 100%; border-radius: 15px; height: 60px; background-color: #434356;display: flex; flex-direction: row;">
						<view style="border: 0px solid #434356; width: 40%;display: flex;align-items: center;">
							<image style="width: 30px; height: 30px;margin-left: 20px;" :src="item[2]"></image>
							<text style="font-size: 15px;margin-left: 2%; color: white;">{{item[1]}}</text>
						</view>
						<view style="font-size: 15px; width: 30%;display: flex;align-items: center;">
							<text style="font-size: 15px;margin-left: 8%;color: white;">{{item[3]}}</text>
						</view>
						<view style="border: 0px solid #434356; font-size: 15px; width: 30%;display: flex;align-items: center;">
							<text v-if="item[4]>=0" style="font-size: 15px;margin-left: 8%; color: green;">+{{item[4]}}%</text>
							<text v-if="item[4]<0" style="font-size: 15px;margin-left: 8%; color: red;">{{item[4]}}%</text>
						</view>
					</view>
				</view>	
			</view>
		</view>
		<view>
				<!-- 普通弹窗 -->
				<uni-popup ref="popup" background-color="#31313F">
					<view style="width: 300px; height: auto;">
						<!--用户栏-->
						<view style="display: flex;align-items: center;margin-top: 80px;">
							<uni-icons type="contact" size="60" color="white" style="margin-left: 10px;"></uni-icons>
							<view style="font-size: 19px; t-weight:bold;color: white;">Hello：</view>
							<navigator v-if="user.userName == ''" style="font-size: 15px; t-weight:bold;color:#bf5fc1" url="/pages/home/login" open-type="navigate">{{$t('login.qingdenglu')}}</navigator>
							<view v-if="user.userName != ''" style="font-size: 13px; t-weight:bold;color:#bf5fc1">{{user.userName}}</view>
						</view>
						<!--功能按钮-->
						<view style="display: flex;justify-content: center;margin-top: 25px;">
							<view class="uni-grid-btn">
								<view style="width: 33%;text-align: center" @click="openPage('/pages/home/chongzhi', 'nav')">
									<image src="../../static/navbar/chongbi.png" style="height: 54px;width: 54px;"></image>
									<view style="color: #9fa6b5; font-size: 12px;white-space: pre-wrap;word-break: break-all;">{{$t('home.chongzhi')}}</view>
								</view>
								<view style="width: 33%;text-align: center" @click="openPage('/pages/home/tixian', 'nav')">
									<image src="../../static/navbar/homeqiquanicon.png" style="height: 54px;width: 54px;"></image>
									<view style="color: #9fa6b5; font-size: 12px;white-space: pre-wrap;word-break: break-all;">{{$t('home.tibi')}}</view>
								</view>
								<view style="width: 33%;text-align: center" @click="openPage('/pages/home/kefu', 'nav')">
									<image src="../../static/navbar/heyue.png" style="height: 54px;width: 54px;"></image>
									<view style="color: #9fa6b5; font-size: 12px;white-space: pre-wrap;word-break: break-all;">{{$t('home.kefu')}}</view>
								</view>
							</view>
						</view>
						<!--功能列表-->
						<view style="display: flex;justify-content: center;flex-direction: column; margin-top: 10px;">
							<view style="width: 100%; height: 50px; border-top: 1px solid #9fa6b5;display: flex;align-items: center;" @click="openPage('/pages/home/czjilu', 'nav')">
								<uni-icons type="cloud-upload" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 17px;white-space: pre-wrap;word-break: break-all;">{{$t('home.chongzhijilu')}}</text>
							</view>
							<view style="width: 100%; height: 50px;border-top: 1px solid #9fa6b5;display: flex;align-items: center;" @click="openPage('/pages/home/txjilu', 'nav')">
								<uni-icons type="cloud-download" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 17px;white-space: pre-wrap;word-break: break-all;">{{$t('home.tixianjilu')}}</text>
							</view>
							<view style="width: 100%; height: 50px;border-top: 1px solid #9fa6b5;display: flex;align-items: center;" @click="openPage('/pages/home/shandui', 'nav')">
								<uni-icons type="cart" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 17px;">{{$t('home.shandui')}}</text>
							</view>
							<view style="width: 100%; height: 50px;border-top: 1px solid #9fa6b5;display: flex;align-items: center;" @click="sskeyOpen()">
								<uni-icons type="locked" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 17px;">{{$t('home.siyao')}}</text>
								<uni-icons type="more-filled" size="20" color="#9fa6b5" style="margin-left: 170px;"></uni-icons>
							</view>
							<view v-if="sskey==true" style="width: 100%; height: 50px;display: flex;align-items: center;">
								<uni-icons type="smallcircle" size="10" color="#9fa6b5" style="margin-left: 10px;"></uni-icons>
								<text style="color: #9fa6b5; margin-left: 10px;font-size: 12px;" @click="copy()">{{user.uuid}}</text>
								<!-- <div style="background-color: #434356;">sda</div> -->
							</view>
							<view style="width: 100%; height: 50px;border-top: 1px solid #9fa6b5;display: flex;align-items: center;">
								<uni-icons type="bars" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 15px;">{{$t('home.yuyan')}}：{{languageType}}</text>
								<uni-data-picker :clear-icon="false" :border="false" @change="languageChange()" v-model="languageType" :localdata="languageItems" placeholder="select" popup-title="Select language"></uni-data-picker>
							</view>
							<view v-if="userToken!=''" @click="logout()" style="width: 100%; height: 50px;border-top: 1px solid #9fa6b5;border-bottom: 1px solid #9fa6b5;display: flex;align-items: center;">
								<uni-icons type="trash" size="30" color="white" style="margin-left: 10px;"></uni-icons>
								<text style="color: white; margin-left: 10px; font-size: 17px;">{{$t('home.tuichudenglu')}}</text>
							</view>
						</view>
					</view>	
				</uni-popup>
		</view>
	</view>
</template>

<script>
import {get,post} from "@/js/axiosConfig.js";
import {getUserInfo, getSys} from "@/js/Api.js"
import {isEmpty} from "@/js/common.js"	
	export default {
		data() {
			return {
				title: 'home',
				remark: '',
				xxk: 0,
				sskey: false,
				languageType:"en",
				secKey: "1111111112321312312312312",
				userToken: "",
				languageItems: [
					{
				        text: "English",
				        value: "en"
				    },
					{
						text: "Portugal",
						value: "pt"
					},
					{
						text: "Finland",
						value: "fi"
					},
					{
						text: "French",
						value: "fr"
					},
					{
						text: "German",
						value: "de"
					},
					{
						text: "Italy",
						value: "it"
					},
					{
						text: "Türkiye",
						value: "tr"
					},
					{
						text: "Spain",
						value: "es"
					},
					{
						text: "Denmark",
						value: "dk"
					},
					{
						text: "繁体中文",
						value: "zh-Hant"
					},
					{
						text: "",
						value: "",
						disable: true
					},
					{
						text: "",
						value: "",
						disable: true
					},
				],
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					uuid: ''
				},
				userToken: "",
				xnbList:[
					{
						url:"/static/xnbimg/BTC.png",
						xnbName:"BTC/USDT",
						xnbPrice: 25634.52,
						xnbRiseAndFall: 155.52
					},
					{
						url:"/static/xnbimg/EOS.png",
						xnbName:"EOS/USDT",
						xnbPrice: 2634.52,
						xnbRiseAndFall: 15.52
					},
					{
						url:"/static/xnbimg/ETH.png",
						xnbName:"ETH/USDT",
						xnbPrice: 251.52,
						xnbRiseAndFall: -1.52
					}
				]
			}
		},
		onLoad() {
			getUserInfo((user)=>{
				if(user===undefined){
					sessionStorage.removeItem("userToken")
					return
				}
				this.user = user
			})
			
			getSys("login_notice", (response)=>{
				this.remark = response.data.data
			})
			
			if(sessionStorage.getItem("userToken") != undefined){
				this.userToken = sessionStorage.getItem("userToken")
			}
			this.getList()
			
			if (localStorage.getItem("language")){
				this.languageType = localStorage.getItem("language")
				uni.setLocale(this.languageType);
			}else{
				this.languageType = 'en'
				localStorage.setItem("language", "en")
				uni.setLocale(this.languageType);
			}
		},
		methods: {
			languageChange(){
				this.languageType = localStorage.setItem("language",this.languageType)
				window.location.reload();
			},
			getList(){
				if (this.xxk == 1 && isEmpty(sessionStorage.getItem("userToken"))){
					this.xnbList = []
					return
				}
				get("/coin/list", {'collect': this.xxk}, (response)=>{
					console.log(response.data.data)
					if(response.data.code == 200){
						this.xnbList = response.data.data
					}
				}, (error)=>{
					uni.showToast({
						title: error.data.message,
						duration: 1500,
						icon: 'error'
					});
				})
			},
			logout(){
				post('pub/user/logout',{},(response)=>{
					if(response.data.code == 200){
						sessionStorage.removeItem("userToken")
						localStorage.removeItem("wxStatus")
						uni.showToast({
							title: 'Logout success',
							duration: 1500,
							icon: 'success'
						})
						setTimeout(() => {
							this.openPage('/pages/home/home', 'lch')
						}, 1000);
					}
				}),(error)=>{
					openPage()
				}
			},
			openPage(url, type){
				if(type == "nav"){
					uni.navigateTo({
						url: url
					})
				}
				if(type == "lch"){
					uni.reLaunch({
						url: url
					})
				}
			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			xxkChange(flag){
				this.xxk = flag
				this.getList()
			},
			toggle() {
				this.$refs.popup.open("left")
			},
			sskeyOpen(){
				this.sskey = !this.sskey
			},
			copy() {
					uni.setClipboardData({
						data: this.user.uuid+'', //	这里是个坑接受字符串类型 value转化为字符串
						success: () => {
							uni.showToast({
							title: 'Copy success',
							duration: 1000,
							icon: 'success'
								});
							}
					});
			},
			openXnbPage(url, type, id){
				if(type == "nav"){
					uni.navigateTo({
						url: url
					})
				}
				if(type == "lch"){
					uni.reLaunch({
						url: url + "?coinId=" + id
					})
				}
			}
		}
	}
</script>

<style>
.home_body{
	flex-direction: column;
	background-color: #31313F;
}
.head{
	flex-direction: column;
	background-color: #31313F;
	height: 44px;
}
.swiper{
	width: 90%;
}
.content{
	border: 0px solid black;
	margin-top: auto;
}
.swiper-item image {
	width: 100%; 
	height: 150px; 
	border-radius: 18px;
}
.uni-margin-wrap{
	display: flex; /* 设置为flex布局 */
	justify-content: center; /* 水平居中 */
}
.remark{
	width: 90%;
	display: flex;
	align-items: center; /* 垂直居中 */
	height: 39px; /* 高度自行调整 */
	border-radius: 10px;
	margin-top: 15px;
}
.uni-grid-btn{
	width: 90%;
	display: flex;
	height: 100px; /* 高度自行调整 */
	margin-top: 15px;
}
.xxk-view{
	width: 95%;
	display: flex;
	height: 50px; /* 高度自行调整 */
	margin-top: 15px;
}
.uni-grid-btn-item{
	width: 20%;
	text-align: center;
}

.uni-grid-btn-item image{
	height: 54px;
	width: 54px;
}
.uni-grid-btn-item view{
	white-space: pre-wrap;
	word-break: break-all;
	color: #9fa6b5;
	font-size:12px;
}
.xnb-list{
	width: 90%;
	display: flex;
	align-items: center; /* 垂直居中 */
	height: auto; /* 高度自行调整 */
	flex-direction: column;
}
.xnb-list .xnb-list-item{
	border: 1px solid #434356; /* 设置边框 */
	box-shadow: 5px 5px 5px rgba(0.3, 0.3, 0.2, 0.2); /* 设置阴影 */
}
</style>
