<template>
	<view class="jiaoyi_body">
		<uni-nav-bar fixed="true" color="#ffffff" backgroundColor="#31313F"
								:title="xnbName" @clickLeft="back()"
								left-icon="left" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="margin-top: 20px; width: 100%; border-radius: 15px; height: 100px; background-color: #434356;display: flex; flex-direction: row;">
					<view style="margin-top: 30px;margin-left: 5%;font-size: 30px;font-weight:600; color: aliceblue;">
						<text v-if="coin.increase24Hours>=0" style="color: green;">{{coin.price}}</text>
						<view v-if="coin.increase24Hours>=0" style="font-size: 10px; margin-top: 15px;">
							+{{coin.increase24Hours}}%
						</view>
						
						<text v-if="coin.increase24Hours<0" style="color: #aa2929; ">{{coin.price}}</text>
						<view v-if="coin.increase24Hours<0" style="font-size: 10px; margin-top: 15px;">
							-{{coin.increase24Hours}}%
						</view>
					</view>
					<view style="margin-top: 10px;margin-left: 15%; font-size: 10px; color: #9fa6b5;">
						<view>
							<table>
								<tr>
									<td style="width: 80px;">
										<text>24h{{$t('maimai.zuigao')}}</text>
									</td>
									<td>
										<text style="color: white;">{{coin.high}}</text>
									</td>
								</tr>
							</table>
						</view>
						<view>
							<table>
								<tr>
									<td style="width: 80px;">
										<text>24h{{$t('maimai.zuidi')}}</text>
									</td>
									<td>
										<text style="color: white;">{{coin.low}}</text>
									</td>
								</tr>
							</table>
						</view>
						<view>
							<table>
								<tr>
									<td style="width: 80px;">
										<text>{{$t('maimai.dangqianjiage')}}</text>
									</td>
									<td>
										<text style="color: white;">{{coin.price}}</text>
									</td>
								</tr>
							</table>
						</view>
					</view>
				</view>
				<view style="margin-top: 20px; width: 100%; border-radius: 15px; height: 200px; background-color: #434356;display: flex; flex-direction: column;">
					<view style="display: flex; flex-direction: row;">
						<view style="margin-left: 20px; margin-top: 20px;">
							<image :src="coin.image" style="width: 34px; height: 34px;"></image>
						</view>
						<view style="margin-top: 10px;margin-left: 25%; font-size: 10px; color: #9fa6b5;">
							<view>
								<table>
									<tr>
										<td style="width: 80px;">
											<text>{{$t('maimai.dangqianchiyou')}}</text>
										</td>
										<td style="width: 200px;">
											<text style="color: white;">{{coin.holdCount}} ≈ {{(coin.price * coin.holdCount).toFixed(2)}} USTD</text>
										</td>
									</tr>
								</table>
							</view>
							<view>
								<table>
									<tr>
										<td style="width: 80px;">
											<text>{{$t('maimai.zhanghu')}}ustd</text>
										</td>
										<td style="width: 200px;">
											<text style="color: white;">{{user.ustd}}</text>
										</td>
									</tr>
								</table>
							</view>
						</view>
					</view>
					
					<view style="margin-left: 20px;margin-top: 20px; width: 100%;">
						<uni-number-box @input="inputChange()" v-model="count" :value="0.00" :step="0.01" :max="99999"  :width="80" background="#1994ff" color="#ffffff"/>
					</view>
					<view style="margin-left: 20px;">
						<text style="color: #9fa6b5;font-size: 10px;">
							ustd≈
						</text>
						<text style="color: white;font-size: 10px;">
							{{xnbustd.toFixed(2)}}
						</text>
					</view>
					<view style="margin-left: 20px;margin-top: 20px;">
						<button type="primary" size="mini" style="width: 100px;" @click="buy(1)">{{$t('maimai.mairu')}}</button>
						<button type="warn" size="mini" style="width: 100px;margin-left: 10px;" @click="buy(0)">{{$t('maimai.maichu')}}</button>
					</view>
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
				xnbName:"BTC/USTD",
				xnbustd: 0.00,
				bid: "",
				count: 0,
				coin: {},
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					isReal: 0
				}
			}
		},
		onLoad(query) {
			this.bid = query.coinId
			getUserInfo((user)=>{
				if(user===undefined){
					return
				}
				this.user = user
			})
			this.getXnbInfo()
			if (isEmpty(sessionStorage.getItem("userToken"))){
				uni.showToast({
					title: "Please login.",
					duration: 1500,
					icon: 'error'
				});
				setTimeout(() => {
					uni.navigateTo({
						url:"/pages/home/login"
					})
				}, 1500);
			}
		},
		methods: {
			buy(flag){
				if (isEmpty(sessionStorage.getItem("userToken"))){
					uni.showToast({
						title: "Please login.",
						duration: 1500,
						icon: 'error'
					});
					return
				}
				post("/trading/trading",{'coinId':this.bid,'count':this.count,'status':flag},(response)=>{
					if(response.data.code == 200){
						uni.showToast({
							title: 'success',
							duration: 1500,
							icon: 'success'
						})
						setTimeout(() => {
							uni.reLaunch({
								url:"/pages/user/user"
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
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
				})
			},
			getXnbInfo(){
				get("/coin/info",{"coinId": this.bid},(response)=>{
					if(response.data.code == 200){
						this.xnbName = response.data.data.name
						this.coin = response.data.data
					}
				},(error)=>{
					
				})
			},
			back(){
				uni.navigateBack()
			},
			inputChange(){
				this.xnbustd = this.count * this.coin.price
			}
		}
	}
</script>

<style>
.jiaoyi_body{
	flex-direction: column;
	background-color: #31313F;
}
.content{
	border: 0px solid black;
	margin-top: auto;
}
</style>
