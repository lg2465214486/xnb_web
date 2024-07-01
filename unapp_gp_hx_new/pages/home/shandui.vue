<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.shandui')" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="display: flex;justify-content: center;">
					<image src="/static/navbar/8.png" style="width: 150px; height: 150px;" ></image>
				</view>
				<!--选项卡-->
				<view style="display: flex;justify-content: center;">
					<view class="xxk-view" >
						<view>
							<text @click="xxkChange(1)" v-if="xxk==1" style="color: white; font-size: 15px;cursor: pointer; font-weight: 600;">BTC</text>
							<text @click="xxkChange(1)" v-else style="color: #818793; font-size: 15px;cursor: pointer;">BTC</text>
						</view>
						<view style="margin-left: 7%;" >
							<text @click="xxkChange(2)" v-if="xxk==2" style="color: white; font-size: 15px;cursor: pointer; font-weight: 600;">ETH</text>
							<text @click="xxkChange(2)" v-else style="color: #9fa6b5; font-size: 15px;cursor: pointer;">ETH</text>
						</view>
					</view>
				</view>
				
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<table>
						<tr>
							<td style="width: 20%;">
								<text style="font-size: 13px; color: #818793;">{{input1}}</text>
							</td>
							<td style="width: 80%;">
								<input @input="btcConver()" v-model="input1_value" class="uni-input" maxlength="10" placeholder="" placeholder-style="font-size:13px;" style="color: white; background-color: #434356;border-radius: 5px;"/>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<uni-icons @click="reverseInput()" type="loop" size="20" color="#818793" style="margin-left: 10px;"></uni-icons>
							</td>
						</tr>
						<tr>
							<td style="width: 20%;">
								<text style="font-size: 13px; color: #818793;">{{input2}}</text>
							</td>
							<td style="width: 80%;">
								<input v-model="input2_value" class="uni-input" disabled maxlength="10" placeholder="" placeholder-style="font-size:13px;" style="color: #818793; background-color: #434356;border-radius: 5px;"/>
							</td>
						</tr>
					</table>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<button type="primary" size="mini" style="width: 100px;" @click="btnClick()">{{$t('home.shandui.duihuan')}}</button>
				</view>
			</view>	
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
				ustdAddress:"dashioasoiadjsklkjljs",
				xxk: 1,
				input1: "USTD",
				input2: "BTC",
				input1_value: 0,
				input2_value: 0,
				btc:0,
				eth:0,
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					uuid: ''
				}
			}
		},
		onLoad() {
			getSys("eth", (response)=>{
				this.eth = response.data.data
			})
			getSys("btc", (response)=>{
				this.btc = response.data.data
			})
			getUserInfo((user)=>{
				if(user===undefined){
					sessionStorage.removeItem("userToken")
					return
				}
				this.user = user
			})
		},
		methods: {
			btnClick(){
				if(this.user.uuid == ""){
					uni.showToast({
						title: 'Plese Login',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				post("account/conversion",{"option":this.input1.toLocaleLowerCase()+"2"+this.input2.toLocaleLowerCase(),"num":this.input1_value},(response)=>{
					if(response.data.code == 200){
						uni.showToast({
							title: 'success',
							duration: 1500,
							icon: 'success'
						})
						setTimeout(() => {
							uni.reLaunch({
								url:"/pages/home/home"
							})
						}, 1000);
					}else{
						uni.showToast({
							title: response.data.message,
							duration: 1500,
							icon: 'error'
						});
					}
				},(error)=>{
					uni.showToast({
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
				})
			},
			btcConver(){
				if(this.input1_value == ""){
					return
				}
				if (this.input1.toLocaleLowerCase() == "ustd" && this.input2.toLocaleLowerCase() == "btc"){
				    let num1 = parseFloat(this.input1_value);
				    let num2 = Math.floor(num1 / this.btc * 10000)/10000
				    this.input2_value = num2.toFixed(4)
				}
				if (this.input1.toLocaleLowerCase() == "btc"){
				    let num1 = parseFloat(this.input1_value);
				    let num2 = num1 * this.btc
				    this.input2_value = num2.toFixed(4)
				}
				if (this.input1.toLocaleLowerCase() == "ustd" && this.input2.toLocaleLowerCase() == "eth"){
				    let num1 = parseFloat(this.input1_value);
				    let num2 = Math.floor(num1 / this.eth * 10000)/10000
				    this.input2_value = num2.toFixed(4)
				}
				if (this.input1.toLocaleLowerCase() == "eth"){
				    let num1 = parseFloat(this.input1_value);
				    let num2 = num1 * this.eth
				    this.input2_value = num2.toFixed(4)
				}
			},
			back(){
				uni.navigateBack()
			},
			xxkChange(flag){
				if (flag == 2) {
					this.xxk = 2
					this.input1 = "USTD"
					this.input2 = "ETH"
				} else{
					this.xxk = 1
					this.input1 = "USTD"
					this.input2 = "BTC"
				}
				this.input1_value=0
				this.input2_value=0
			},
			reverseInput(){
				let temp = this.input1
				this.input1 = this.input2
				this.input2 = temp
				this.input1_value=0
				this.input2_value=0
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
</style>
