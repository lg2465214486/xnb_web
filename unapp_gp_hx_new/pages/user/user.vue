<template>
	<view class="user_body">
		<view class="head">
			<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F"
									:shadow="false" :border="false" :title="$t('user.yonghuzhongxin')">
			</uni-nav-bar>
		</view>
		<view class="content">
			<!--基本信息-->
			<view class="content_head" style="margin-top: 20px; width: 100%; border-radius: 15px; height: 100px; background-color: #434356;display: flex; flex-direction: row;">
				<view style="display: flex;flex-direction: column;margin-top: 20px;">
					<uni-icons type="contact" size="40" color="white" style="margin-left: 10px;"></uni-icons>
					<image v-if="user.vipName == 'VIP0'" src="../../static/vip/vip0.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP1'" src="../../static/vip/vip1.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP2'" src="../../static/vip/vip2.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP3'" src="../../static/vip/vip3.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP4'" src="../../static/vip/vip4.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP5'" src="../../static/vip/vip5.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<image v-if="user.vipName == 'VIP6'" src="../../static/vip/vip6.png" style="width: 62px;height: 23px;margin-top: 5px;margin-left: 10px;"></image>
					<uni-tag v-if="user.isReal == 0" :text="$t('user.weishiming')" type="warning" size="mini" style="margin-left: 10px;margin-top: 5px;"
					custom-style="background-color: #68651c; border-color: #68651c; color: #fff;font-size:10px;"/>
					<uni-tag v-if="user.isReal == 1" :text="$t('user.yishiming')" type="warning" size="mini" style="margin-left: 10px;margin-top: 5px;"
					custom-style="background-color: #26731e; border-color: #26731e; color: #fff;font-size:10px;"/>
				</view>
				<view style="display: flex;flex-direction: row;margin-top: 20px;margin-left: 20px;width: 50%;">
					<view style="font-size: 15px; t-weight:bold;color: white;">Hello：</view>
					<navigator v-if="user.userName == ''" style="font-size: 15px; t-weight:bold;color:#bf5fc1" url="/pages/home/login" open-type="navigate">{{$t('login.qingdenglu')}}</navigator>
					<view v-if="user.userName != ''" style="font-size: 13px; t-weight:bold;color:#bf5fc1">{{user.userName}}</view>
				</view>
				<view style="display: flex;flex-direction: column;margin-top: 10px;font-size: 10px; color: #9fa6b5;">
					<view>
						<table>
							<tr>
								<td style="width: 30px;">
									<text>USTD</text>
								</td>
								<td>
									<text style="color: white;">{{user.ustd}}</text>
								</td>
							</tr>
						</table>
					</view>
					<view>
						<table>
							<tr>
								<td style="width: 30px;">
									<text>BTC</text>
								</td>
								<td>
									<text style="color: white;">{{user.btc}}</text>
								</td>
							</tr>
						</table>
					</view>
					<view>
						<table>
							<tr>
								<td style="width: 30px;">
									<text>ETH</text>
								</td>
								<td>
									<text style="color: white;">{{user.eth}}</text>
								</td>
							</tr>
						</table>
					</view>
				</view>
			</view>
		
			<!--功能按钮-->
			<view style="display: flex;justify-content: center;margin-top: 25px;">
				<view class="uni-grid-btn">
					<view style="width: 25%;text-align: center" @click="openPage('/pages/home/chongzhi', 'nav')">
						<image src="../../static/navbar/chongbi.png" style="height: 54px;width: 54px;"></image>
						<view style="color: #9fa6b5; font-size: 12px;">{{$t('home.chongzhi')}}</view>
					</view>
					<view style="width: 25%;text-align: center" @click="openPage('/pages/home/tixian', 'nav')">
						<image src="../../static/navbar/homeqiquanicon.png" style="height: 54px;width: 54px;"></image>
						<view style="color: #9fa6b5; font-size: 12px;">{{$t('home.tibi')}}</view>
					</view>
					<view style="width: 25%;text-align: center" @click="openPage('/pages/home/kefu', 'nav')">
						<image src="../../static/navbar/heyue.png" style="height: 54px;width: 54px;"></image>
						<view style="color: #9fa6b5; font-size: 12px;">{{$t('home.kefu')}}</view>
					</view>
					<view style="width: 25%;text-align: center" @click="openPage('/pages/home/shandui', 'nav')">
						<image src="../../static/navbar/8.png" style="height: 54px;width: 54px;"></image>
						<view style="color: #9fa6b5; font-size: 12px;">{{$t('home.shandui')}}</view>
					</view>
				</view>
			</view>
			
			<view style="display: flex;margin-top: 25px;">
				<view style="width: 90%;margin-left: 5%;font-size: 15px; font-weight: 600; font-family: '幼圆'; color: #a8a8a8;color: #9fa6b5;">{{$t('user.chiyoubizhong')}}</view>
			</view>	
			
			<!--持有币种-->
			<view style="display: flex;justify-content: center;">
				<view class="xnb-list">
					<view v-for="item in xnbList" :key="item.xnbName"
					@click="openXnbPage('/pages/maimai/maimai','lch',item[4])"
					class="xnb-list-item" style="margin-top: 20px; width: 100%; border-radius: 10px; height: 60px; background-color: #434356;display: flex; flex-direction: row;">
						<view style="border: 0px solid #434356; width: 35%;display: flex;align-items: center;">
							<image style="width: 20px; height: 20px;margin-left: 20px;" :src="item[1]"></image>
							<text style="font-size: 10px;margin-left: 2%; color: white;">{{item[0]}}</text>
						</view>
						<view style="font-size: 10px; width: 35%;display: flex;align-items: center;flex-direction: column;">
							<text style="color: #9fa6b5;border: #434356;">{{$t('user.chicang')}}</text>
							<text style="font-size: 10px;margin-left: 8%;color: white;">{{item[2]}} ≈ {{(item[2] * item[5]).toFixed(2)}}</text>
						</view>
						<view style="border: 0px solid #434356; font-size: 10px; width: 30%;display: flex;align-items: center;flex-direction: column;">
							<text style="color: #9fa6b5;border: #434356;">{{$t('user.shouyilv')}}</text>
							<text v-if="item[3]>=0" style="font-size: 10px; color: green;">+{{item[3]}}%</text>
							<text v-if="item[3]<0" style="font-size: 10px; color: red;">{{item[3]}}%</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {get,post} from "@/js/axiosConfig.js";
import {getUserInfo} from "@/js/Api.js"
import {isEmpty} from "@/js/common.js"
	export default {
		data() {
			return {
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					isReal: 0
				},
				userToken: "",
				xnbList:[
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
				console.log(user)
			})
			if(sessionStorage.getItem("userToken") != undefined){
				this.userToken = sessionStorage.getItem("userToken")
			}
			this.holdList()
		},
		methods: {
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
			holdList(){
				get("/coin/hold/list",{},(response)=>{
					if(response.data.code == 200){
						this.xnbList = response.data.data
					}
				},(error)=>{
					uni.showToast({
						title: error.data.message,
						duration: 1500,
						icon: 'error'
					});
				})
			},
			openXnbPage(url, type, id) {
				if (type == "nav") {
					uni.navigateTo({
						url: url
					})
				}
				if (type == "lch") {
					uni.reLaunch({
						url: url + "?coinId=" + id
					})
				}
			}
		}
	}
</script>

<style>
.uni-grid-btn{
	width: 90%;
	display: flex;
	height: 100px; /* 高度自行调整 */
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
	width: 90%;
	white-space: pre-wrap;
	word-break: break-all;
	color: #9fa6b5;
	font-size:12px;
}
.xxk-view{
	width: 95%;
	display: flex;
	height: 50px; /* 高度自行调整 */
	margin-top: 20px;
}
.xnb-list{
	width: 90%;
	display: flex;
	align-items: center; /* 垂直居中 */
	height: auto; /* 高度自行调整 */
	flex-direction: column;
}
</style>
