<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.tixianjilu')" :shadow="false" :border="true">
		</uni-nav-bar>
		<view class="content" style="width: 100%;">
			<view style="display: flex;justify-content: center;margin-top: 10px; width: 100%;">
				<view style="display: flex;flex-direction: row; width: 100%;">
					<text style="width: 35%; font-size: 10px; font-weight: 600; color: #a1a7af;">{{$t('home.czjilu.faqishijian')}}</text>
					<text style="width: 20%; font-size: 10px; font-weight: 600; color: #a1a7af;">{{$t('home.czjilu.chongzhijinge')}}</text>
					<text style="width: 20%; font-size: 10px; font-weight: 600; color: #a1a7af;">{{$t('home.czjilu.zhuangtai')}}</text>
					<text style="width: 25%; font-size: 10px; font-weight: 600; color: #a1a7af;">{{$t('home.czjilu.tibidizhi')}}</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: column; margin-top: 5px;">
				<view v-for="item in list" :key="item.index" style="display: flex;flex-direction: row;">
					<text style="width: 35%; font-size: 10px; font-weight: 400; color: #858a90;">{{item.time}}</text>
					<text style="width: 20%; font-size: 10px; font-weight: 400; color: #858a90;">{{item.amount}}</text>
					<text style="width: 20%; font-size: 10px; font-weight: 400; color: #858a90;">
						<text v-if="item.status == 1" style="color: #9b9d09; ">{{$t('home.czjilu.daishenghe')}}</text>
						<text v-if="item.status == 2" style="color: #40903c; ">{{$t('home.czjilu.tongguo')}}</text>
						<text v-if="item.status == 3" style="color: #903939; ">{{$t('home.czjilu.weitongguo')}}</text>
					</text>
					<text style="width: 25%; font-size: 10px; font-weight: 400; color: #858a90;white-space: pre-line;word-break: break-all;">{{item.trc20}}</text>
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
				list:[
				]
			}
		},
		onLoad() {
			this.orderList()
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			orderList(){
				get("/user/deal/detail",{},(response)=>{
					if(response.data.code == 200){
						for (let i in response.data.data) {
							if (response.data.data[i].type == 2){
								this.list.push(response.data.data[i])
							}
						}
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
			}
		}
	}
</script>

<style>

</style>
