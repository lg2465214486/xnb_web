<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" title="" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content" style="width: 100%;">
			<view style="display: flex;justify-content: center;">
				<view style="display: flex;flex-direction: column;">
					<text style="font-size: 20px; font-weight: 600; color: #a1a7af;">{{title}}</text>
				</view>
			</view>
			<view style="display: flex;justify-content: center; margin-top: 15px;">
				<view style="display: flex;justify-content: center;width: 80%;">
					<text style="white-space:pre-wrap;font-size: 12px; font-weight: 500; color: #6b6f74;">{{content}}</text>
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
				title: "",
				content: ""
			}
		},
		onLoad() {
			getSys("introTitle", (response)=>{
				this.title = response.data.data
			})
			getSys("intro", (response)=>{
				this.content = response.data.data
			})
		},
		methods: {
			back(){
				uni.navigateBack()
			}

		}
	}
</script>

<style>

</style>
