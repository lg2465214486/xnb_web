<template>
	<view>
		<view class="wakuang_body">
			<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F"
									:shadow="false" :border="false" :title="$t('wakuang.zhiyawakuang')">
			</uni-nav-bar>
		</view>
		<view class="content">
			<!--挖矿按钮-->
			<view v-if="wkStatus==1">
				<view @click="wkAction()" style="display: flex;margin-top: 50px;justify-content: center;">
					<view style="cursor: pointer;box-shadow: 5px 5px 5px rgba(0.2, 0.2, 0.1, 0.1);margin-top: 20px; width: 200px; border-radius: 100px; height: 200px; background-color: #434356;display: flex; align-items: center;justify-content: center;">
						<text style="color: #b5b5b5; font-weight: 600; font-size: 20px;font-family: '幼圆';">{{$t('wakuang.kaishiwakuang')}}</text>
					</view>
				</view>
				<view style="display: flex;margin-top: 50px;justify-content: center;font-size:10px;color: #59736d;">
					{{$t('wakuang.zhanghushengyu')}}USTD:{{user.ustd}}
				</view>
				<view style="display: flex;margin-top: 0px;justify-content: center;">
					<input v-model="xnbCount" class="uni-input" maxlength="10" :placeholder="$t('wakuang.zhiyashuliang')" placeholder-style="font-size:13px;" style="color: white; background-color: #434356;border-radius: 5px;"/>
				</view>
			</view>
			<view v-if="wkStatus==2">
				<view style="display: flex;margin-top: 50px;justify-content: center;">
					<view @click="wkAction()" style="cursor: pointer;box-shadow: 5px 5px 5px rgba(0.2, 0.2, 0.1, 0.1);margin-top: 20px; width: 200px; border-radius: 100px; height: 200px; background-color: #7a4444;display: flex; align-items: center;justify-content: center;">
						<text style="color: #b5b5b5; font-weight: 600; font-size: 20px;font-family: '幼圆';">{{$t('wakuang.tingzhiwakuang')}}</text>
					</view>
				</view>
				<view style="display: flex;margin-top: 50px;justify-content: center;font-size:10px;color: #59736d;">
					<image src="../../static/grf/1923929193.gif" style="width: 50px;height: 50px;"></image>
				</view>
				<view style="display: flex;justify-content: center;font-size:10px;color: #59736d;">
					{{$t('wakuang.zhanghushengyu')}}USTD:{{user.ustd}}
				</view>
				<view style="display: flex;margin-top: 0px;justify-content: center;font-size:10px;color: #59736d;">
					{{$t('wakuang.zhiyashuliang')}}:{{earning.moneyQuantity}}
				</view>
				<view style="display: flex;margin-top: 0px;justify-content: center;font-size:10px;color: #59736d;">
					{{$t('wakuang.shouyi')}}:<font style="font-size:10px;color: #94c691;">{{earning.earnings}}</font>
				</view>
			</view>
			<view style="display: flex;margin-top: 50px;justify-content: center;font-size:10px;color: #b5b5b5;">
				<table>
				            <tr>
				              <td>{{$t('wakuang.t1')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t2')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t3')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t4')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t5')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t6')}}</td>
				            </tr>
				            <tr>
				              <td>{{$t('wakuang.t7')}}</td>
				            </tr>
				          </table>
			</view>
			<view style="display: flex;margin-top: 50px;justify-content: center;white-space:pre-wrap;font-size:10px;color: #b5b5b5;">
				{{vipNotice}}
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
				title: 'wakuang',
				xnbCount:"",
				wkStatus:1,
				vipNotice: "",
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					uuid: ''
				},
				earning:null
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
			getSys("vip_notice", (response)=>{
				this.vipNotice = response.data.data
			})
			this.getEarning()
			this.schedule()
		},
		methods: {
			getEarning(){
				get("mining/earnings",{},(response)=>{
					if(response.data.code = 200){
						if (response.data.data != null){
							this.earning = response.data.data
						    localStorage.setItem("wxStatus","2")
						}else{
						    localStorage.setItem("wxStatus","1")
						}
					}else{
						localStorage.setItem("wxStatus","1")
					}
					this.wkStatus = localStorage.getItem("wxStatus")
				},(error)=>{
					localStorage.setItem("wxStatus","1")
					this.wkStatus = localStorage.getItem("wxStatus")
				})
			},
			schedule(){
				if (localStorage.getItem("wxStatus") != "2"){
				    return
				}
				this.getEarning()
				setTimeout(this.schedule,5000)
			},
			wkAction(){
				if(this.user.uuid == ""){
					uni.showToast({
						title: 'Plese Login',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				if(this.wkStatus == 1){
					//开始
					post("mining/start",{'moneyQuantity':this.xnbCount},(response)=>{
						if(response.data.code == 200){
							uni.showToast({
								title: 'success',
								duration: 1500,
								icon: 'success'
							})
							setTimeout(() => {
								uni.reLaunch({
									url:"/pages/wakuang/wakuang"
								})
							}, 1500);
						}else{
							uni.showToast({
								title: response.data.message,
								duration: 1500,
								icon: 'error'
							});
						}
					},(error)=>{
						uni.showToast({
							title: error.data.message,
							duration: 1500,
							icon: 'error'
						});
					})
				}else {
					//暂停
					post("mining/stop",{},(response)=>{
						if(response.data.code == 200){
							uni.showToast({
								title: 'success',
								duration: 1500,
								icon: 'success'
							})
							setTimeout(() => {
								uni.reLaunch({
									url:"/pages/wakuang/wakuang"
								})
							}, 1500);
						}else{
							uni.showToast({
								title: response.data.message,
								duration: 1500,
								icon: 'error'
							});
						}
					},(error)=>{
						uni.showToast({
							title: error.data.message,
							duration: 1500,
							icon: 'error'
						});
					})
				}
			}
		}
	}
</script>

<style>

</style>
