<template>
	<view class="bibi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" :title="$t('home.home')"
			:shadow="false" :border="false">
		</uni-nav-bar>

		<view class="content">
			<!--选项卡-->
			<view style="display: flex;justify-content: center;">
				<view class="xxk-view">
					<view>
						<text @click="xxkChange(0)" v-if="xxk==1"
							style="color: white; font-size: 18px;text-decoration:underline;cursor: pointer;">{{$t('home.zixuan')}}</text>
						<text @click="xxkChange(1)" v-else
							style="color: #9fa6b5; font-size: 18px;cursor: pointer;">{{$t('home.zixuan')}}</text>
					</view>
					<view style="margin-left: 7%;">
						<text @click="xxkChange(1)" v-if="xxk==0"
							style="color: white; font-size: 18px;text-decoration:underline;cursor: pointer;">{{$t('home.quanbu')}}</text>
						<text @click="xxkChange(0)" v-else
							style="color: #9fa6b5; font-size: 18px;cursor: pointer;">{{$t('home.quanbu')}}</text>
					</view>
				</view>
			</view>

			<!--虚拟币内容-->
			<view style="display: flex;justify-content: center;">
				<view class="xnb-list">
					<view v-for="item in xnbList" :key="item.xnbName"
						@click="openPage('/pages/maimai/maimai','lch',item[0])" class="xnb-list-item"
						style="margin-top: 20px; width: 100%; border-radius: 15px; height: 60px; background-color: #434356;display: flex; flex-direction: row;">
						<view style="border: 0px solid #434356; width: 40%;display: flex;align-items: center;">
							<image style="width: 30px; height: 30px;margin-left: 20px;" :src="item[2]"></image>
							<text style="font-size: 15px;margin-left: 2%; color: white;">{{item[1]}}</text>
						</view>
						<view style="font-size: 15px; width: 30%;display: flex;align-items: center;">
							<text style="font-size: 15px;margin-left: 8%;color: white;">{{item[3]}}</text>
						</view>
						<view
							style="border: 0px solid #434356; font-size: 15px; width: 30%;display: flex;align-items: center;">
							<text v-if="item[4]>=0"
								style="font-size: 15px;margin-left: 8%; color: green;">+{{item[4]}}%</text>
							<text v-if="item[4]<0"
								style="font-size: 15px;margin-left: 8%; color: red;">{{item[4]}}%</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		get,
		post
	} from "@/js/axiosConfig.js";
	import {
		getUserInfo,
		getSys
	} from "@/js/Api.js"
	import {
		isEmpty
	} from "@/js/common.js"
	export default {
		data() {
			return {
				title: 'bibi',
				xxk: 0,
				xnbList: [{
						id: "29be923785e346a4b78f7fe9982322ad",
						url: "../../static/xnbimg/BTC.png",
						xnbName: "BTC/USDT",
						xnbPrice: 25634.52,
						xnbRiseAndFall: 155.52
					},
					{
						url: "../../static/xnbimg/EOS.png",
						xnbName: "EOS/USDT",
						xnbPrice: 2634.52,
						xnbRiseAndFall: 15.52
					},
					{
						url: "../../static/xnbimg/ETH.png",
						xnbName: "ETH/USDT",
						xnbPrice: 251.52,
						xnbRiseAndFall: -1.52
					}
				]
			}
		},
		onLoad() {
			getUserInfo((user) => {

			})
			this.getList()
		},
		methods: {
			getList() {
				if (this.xxk == 1 && isEmpty(sessionStorage.getItem("userToken"))) {
					this.xnbList = []
					return
				}
				get("/coin/list", {
					'collect': this.xxk
				}, (response) => {
					console.log(response.data.data)
					if (response.data.code == 200) {
						this.xnbList = response.data.data
					}
				}, (error) => {
					uni.showToast({
						title: error.data.message,
						duration: 1500,
						icon: 'error'
					});
				})
			},
			xxkChange(flag) {
				this.xxk = flag
				this.getList()
			},
			openPage(url, type, id) {
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
	.home_body {
		flex-direction: column;
		background-color: #31313F;
	}

	.content {
		border: 0px solid black;
		margin-top: auto;
	}

	.xxk-view {
		width: 95%;
		display: flex;
		height: 50px;
		/* 高度自行调整 */
		margin-top: 20px;
	}

	.xnb-list {
		width: 90%;
		display: flex;
		align-items: center;
		/* 垂直居中 */
		height: auto;
		/* 高度自行调整 */
		flex-direction: column;
	}

	.xnb-list .xnb-list-item {
		border: 1px solid #434356;
		/* 设置边框 */
		box-shadow: 5px 5px 5px rgba(0.3, 0.3, 0.2, 0.2);
		/* 设置阴影 */
	}
</style>