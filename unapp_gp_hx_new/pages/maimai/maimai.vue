<template>
	<view>
		<view class="bibi_body">
			<uni-nav-bar fixed="true" color="#ffffff" backgroundColor="#31313F"
									:left-text="xnbName" leftWidth="150px" :rightIcon="isCollect"
									:shadow="false" :border="false" @clickRight="collect()">
			</uni-nav-bar>
			
			<view class="content">
				<!--价格框-->
				<!-- <view style="display: flex;justify-content: center;">
					<view style="margin-top: 20px; width: 100%; border-radius: 15px; height: 100px; background-color: #434356;display: flex; flex-direction: row;">
						<view style="margin-top: 5%;margin-left: 5%;font-size: 30px;font-weight:600; color: aliceblue;">
							<text style="color: green;">25641.52</text>
							<view style="font-size: 10px; margin-top: 15px;">
								+15.12%
							</view>
						</view>
						<view style="margin-top: 2%;margin-left: 15%; font-size: 10px; color: #9fa6b5;">
							<view>
								<table>
									<tr>
										<td style="width: 80px;">
											<text>24小时最高</text>
										</td>
										<td>
											<text style="color: white;">28621.52</text>
										</td>
									</tr>
								</table>
							</view>
							<view>
								<table>
									<tr>
										<td style="width: 80px;">
											<text>24小时最低</text>
										</td>
										<td>
											<text style="color: white;">21621.52</text>
										</td>
									</tr>
								</table>
							</view>
							<view>
								<table>
									<tr>
										<td style="width: 80px;">
											<text>当前价格</text>
										</td>
										<td>
											<text style="color: white;">25621.52</text>
										</td>
									</tr>
								</table>
							</view>
						</view>
					</view>
				</view> -->
				
				<!--分时选项卡-->
				<!-- <view style="display: flex;justify-content: center;">
					<view class="datexxk-view" >
						<view>
							<text @click="datexxkChange(1)" v-if="datexxk==1" style="color: white; font-size: 8px;text-decoration:underline;cursor: pointer;">30min</text>
							<text @click="datexxkChange(1)" v-else style="color: #9fa6b5; font-size: 8px;cursor: pointer;">30min</text>
						</view>
						<view style="margin-left: 7%;" >
							<text @click="datexxkChange(2)" v-if="datexxk==2" style="color: white; font-size: 8px;text-decoration:underline;cursor: pointer;">1h</text>
							<text @click="datexxkChange(2)" v-else style="color: #9fa6b5; font-size: 8px;cursor: pointer;">1h</text>
						</view>
						<view style="margin-left: 7%;" >
							<text @click="datexxkChange(3)" v-if="datexxk==3" style="color: white; font-size: 8px;text-decoration:underline;cursor: pointer;">24h</text>
							<text @click="datexxkChange(3)" v-else style="color: #9fa6b5; font-size: 8px;cursor: pointer;">24h</text>
						</view>
						<view style="margin-left: 7%;" >
							<text @click="datexxkChange(4)" v-if="datexxk==4" style="color: white; font-size: 8px;text-decoration:underline;cursor: pointer;">week</text>
							<text @click="datexxkChange(4)" v-else style="color: #9fa6b5; font-size: 8px;cursor: pointer;">week</text>
						</view>
						<view style="margin-left: 7%;" >
							<text @click="datexxkChange(5)" v-if="datexxk==5" style="color: white; font-size: 8px;text-decoration:underline;cursor: pointer;">month</text>
							<text @click="datexxkChange(5)" v-else style="color: #9fa6b5; font-size: 8px;cursor: pointer;">month</text>
						</view>
					</view>
				</view> -->
				
				<!--k线图-->
				<view style="display: flex;justify-content: center;">
					<web-view :src="url"></web-view>
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
				xnbName: '',
				isCollect: "star-filled",
				datexxk: 1,
				bid: "",
				url: "/hybrid/html/local.html"
			}
		},
		onLoad(query) {
			this.bid = query.coinId
			if(isEmpty(this.bid)){
				this.getRandomBid()
			}else{
				this.url = this.url + "?coinId=" + this.bid
				this.getXnbInfo()
			}
		},
		methods: {
			getXnbInfo(){
				get("/coin/info",{"coinId": this.bid},(response)=>{
					if(response.data.code == 200){
						this.xnbName = response.data.data.name
						if(response.data.data.isCollect == 0){
							this.isCollect = "star"
						}else{
							this.isCollect = "star-filled"
						}
					}
				},(error)=>{
					
				})
			},
			collect(){
				if (isEmpty(sessionStorage.getItem("userToken"))){
					uni.showToast({
						title: "Please login.",
						duration: 1500,
						icon: 'error'
					});
					return
				}
				if(this.isCollect == "star"){
					get("/collect/add",{"coinId": this.bid},(response)=>{
						if(response.data.code == 200){
							this.isCollect = "star-filled"
							uni.showToast({
								title: 'success',
								duration: 1500,
								icon: 'success'
							})
						}
					},(error)=>{
						
					})
				}else{
					get("/collect/del",{"coinId": this.bid},(response)=>{
						if(response.data.code == 200){
							this.isCollect = "star"
							uni.showToast({
								title: 'success',
								duration: 1500,
								icon: 'success'
							})
						}
					},(error)=>{
						
					})
				}
			},
			datexxkChange(flag){
				this.datexxk = flag
			},
			getRandomBid(){
				get("/coin/list", {'collect': 0}, (response)=>{
					if(response.data.code == 200){
						this.bid = response.data.data[0][0]
						this.url = this.url + "?coinId=" + this.bid
						this.getXnbInfo()
					}
				}, (error)=>{
					uni.showToast({
						title: error.data.message,
						duration: 1500,
						icon: 'error'
					});
				})
			},
		}
	}
</script>

<style>
.home_body{
	flex-direction: column;
	background-color: #31313F;
}
.content{
	border: 0px solid black;
	margin-top: auto;
}
.datexxk-view{
	width: 95%;
	display: flex;
	height: 50px; /* 高度自行调整 */
	margin-top: 15px;
}
</style>
