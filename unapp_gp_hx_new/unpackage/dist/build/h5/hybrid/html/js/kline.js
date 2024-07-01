
var myChart;

// post请求封装
// function post(url,data) {
// 	let baseUrl='http://192.168.3.135:8080';
// 	return new Promise((resolve,reject)=>{
// 		axios({
// 			headers:{
// 				"Content-Type": "application/x-www-form-urlencoded",
// 			},
// 			method:'post',
// 			url:baseUrl+url,
// 			data:Qs.stringify( data || {})
// 		})
// 		.then(res=>{
// 			console.log(res)
// 			if(res.data.code==1){
// 				resolve(res.data)
// 			}else{
// 				reject()
// 				alertError('请求超时')
// 			}
// 		})
// 		.catch(err=>{
// 			alertError('请求超时')
// 		})
// 	})
// }

// const baseURL = 'http://127.0.0.1:8081'; 
// const baseURL = 'http://192.168.1.7:8081'; 
const baseURL = 'https://xnbmmtop.com/api';

const instance = axios.create({
  baseURL,
  timeout: 60000, // 设置请求超时时间
  // 在此添加其他公共配置项
});

// GET 方法
const get = (url, params = {}) => {
  return instance.get(url, {params, headers: {'X-Token': sessionStorage.getItem('userToken')}});
};

// POST 方法
const post = (url, data = {}) => {
  return instance.post(url, data,{
    headers: {
        'Content-Type': 'application/json',
        'X-Token': sessionStorage.getItem('userToken')
      }
  });
};


// 弹窗
function alertError(title) {
	document.addEventListener('plusready',function() {
		console.log('......')
	})
	try{
		plus.nativeUI.toast(title, {
			 icon:'/static/common/toast-error.png',
			 style:'inline',
			 verticalAlign:'top'
		});
	}catch(e){
		//TODO handle the exception
	}
}
var app = new Vue({
	el:'#app',
	data:{
		MA5:'',
		MA10:'',
		MA30:'',
		volMA5:'',
		volMA10:'',
		current:3,
		bid: 'aa0e69061cc64e8187f909fc5334c3fe',
		tabs:[
			{'label':'30min','value':1},
			{'label':'1h','value':2},
			{'label':'day','value':3},
			{'label':'week','value':4},
		],
		category:2,
		txData:{},//交易数据统计
		buyList:[],
		sellList:[],
		dealHis:[],
		tokenInfo:{},
		page:1,
		zhangdiefu:"漲跌幅",
		gao:"高",
		di:"低",
		dingdan:"訂單",
		jianjie:"簡介",
		shijian:"時間",
		fangxiang:"方向",
		jiage:"價格",
		shuliang:"數量",
		mairu:"買入",
		maichu:"賣出",
		faxingshijian:"發行时间",
		faxingzongliang:"發行总量",
		liutongzongliang:"流通數量",
		zhongchoujiage:"眾籌價格",
		qukuaichaxun:"區塊查詢",
		baipishu:"白皮書",
		guanwang:"官網",
		categoryList:[
			// {'label':'交易','value':1},
			{'label':'Order','value':2},
			{'label':'Introduction','value':3},
		],
	},
	created() {
		// let currentUrl = location.href;
		this.bid = this.getUrlCode("coinId")
		this.getTxData()
		this.getDepth()
		this.getDealHis()
		this.languageChange()
	},
	mounted() {
		myChart = echarts.init(document.getElementById('main'));
		get('/line/all',{'coinId':this.bid, 'flag': 'day'}).then(response => {
		  if(response.data.code == 200){
			rawData = response.data.data
			dates = rawData.map(function(item) {
				return item[0];
			});
			data = rawData.map(function(item) {
				return [+item[1], +item[2], +item[3], +item[4], +item[5]];
			});
			volumes = rawData.map(function(item, index) {
				return [index, item[5], item[1] > item[2] ? 1 : -1];
			});
			this.draw(80)
			this.getKline()
		  }
		})
		
		get("/coin/info",{"coinId": this.bid}).then(response => {
			if(response.data.code == 200){
				if (response.data.data.increase24Hours<0){
					txData.upRate = "-" + response.data.data.increase24Hours + "%"
					txData.upFlag = 2
				}else{
					txData.upRate = "+" + response.data.data.increase24Hours + "%"
					txData.upFlag = 1
				}
				txData.lastPrice = response.data.data.price
				txData.volume = response.data.data.price
				txData.high = response.data.data.high
				txData.low = response.data.data.low
				tokenInfo.tokenName = response.data.data.name
				tokenInfo.issueDate = response.data.data.issueDate
				tokenInfo.totalSupply = response.data.data.issueCount
				tokenInfo.nowSupply = response.data.data.circulateCount
				tokenInfo.price = response.data.data.defaultPrice
				tokenInfo.whitePaper = response.data.data.whitePaper
				tokenInfo.webSite = response.data.data.homeLink
				tokenInfo.exploereSite = response.data.data.blockchain
				tokenInfo.remark = response.data.data.info
			}
		})
	},
	methods:{
		languageChange(){
			if (localStorage.getItem("language")){
				let language = localStorage.getItem("language")
				switch (language){
					case "de":
						this.zhangdiefu="Rise and fall range"
						this.gao="high"
						this.di="low"
						this.dingdan="Bestellformular"
						this.jianjie="kurze Einführung"
						this.shijian="time"
						this.fangxiang="direction"
						this.jiage="Preis"
						this.shuliang="quantity"
						this.mairu="kaufen"
						this.maichu="Verkauf"
						this.faxingshijian="Ausgabedatum"
						this.faxingzongliang="Gesamtemission"
						this.liutongzongliang="Zirkulationsmenge"
						this.zhongchoujiage="Crowdfunding Pricing"
						this.qukuaichaxun="Speicherblockabfrage"
						this.baipishu="white paper"
						this.guanwang="Offizielle Website"
						break;
					case "dk":
						this.zhangdiefu="Rise and Fall Range"
						this.gao="high"
						this.di="low"
						this.dingdan="Bestillingsformular"
						this.jianjie="short introduction"
						this.shijian="time"
						this.fangxiang="direction"
						this.jiage="Price"
						this.shuliang="kvantitet"
						this.mairu="køb"
						this.maichu="Salg"
						this.faxingshijian="Output date"
						this.faxingzongliang="Total Mission"
						this.liutongzongliang="Circulation quantity"
						this.zhongchoujiage="Crowdfunding Pricing"
						this.qukuaichaxun="memory block forespørgsel"
						this.baipishu="white paper"
						this.guanwang="Officiel website"
						break;
					case "en":
						this.zhangdiefu="Rise and fall range"
						this.gao="high"
						this.di="low"
						this.dingdan="order form"
						this.jianjie="brief introduction"
						this.shijian="time"
						this.fangxiang="direction"
						this.jiage="price"
						this.shuliang="quantity"
						this.mairu="buying"
						this.maichu="sale"
						this.faxingshijian="issue date"
						this.faxingzongliang="Total issuance"
						this.liutongzongliang="Circulation quantity"
						this.zhongchoujiage="Crowdfunding pricing"
						this.qukuaichaxun="Memory block query"
						this.baipishu="white paper"
						this.guanwang="Official website"
						break;
					case "es":
						this.zhangdiefu="Subidasybajadas"
						this.gao="Alto"
						this.di="Bajo"
						this.dingdan="Pedido"
						this.jianjie="Introducción"
						this.shijian="Tiempo"
						this.fangxiang="Dirección"
						this.jiage="Precio"
						this.shuliang="Cantidad"
						this.mairu="Comprar"
						this.maichu="Vender"
						this.faxingshijian="Tiempodeemisión"
						this.faxingzongliang="Emisióntotal"
						this.liutongzongliang="Cantidadencirculación"
						this.zhongchoujiage="Preciodecrowdfunding"
						this.qukuaichaxun="Consultadebloques"
						this.baipishu="Libroblanco"
						this.guanwang="Sitioweboficial"
						break;
					case "fi":
						this.zhangdiefu="Hintavaihtelut"
						this.gao="Korkea"
						this.di="Matala"
						this.dingdan="Järjestys"
						this.jianjie="Johdanto"
						this.shijian="Aika"
						this.fangxiang="Suunta"
						this.jiage="Hinta"
						this.shuliang="Määrä"
						this.mairu="Osta"
						this.maichu="Myy"
						this.faxingshijian="Vapautusaika"
						this.faxingzongliang="Liikkeeseenlaskunkokonaismäärä"
						this.liutongzongliang="Kierrätysmäärä"
						this.zhongchoujiage="Joukkorahoituksenhinnat"
						this.qukuaichaxun="BlockQuery"
						this.baipishu="Valkoinenkirja"
						this.guanwang="Virallinenverkkosivusto"
						break;
					case "fr":
						this.zhangdiefu="hausseetbaisse"
						this.gao="High"
						this.di="Low"
						this.dingdan="ordre"
						this.jianjie="Introduction"
						this.shijian="letemps"
						this.fangxiang="direction"
						this.jiage="leprix"
						this.shuliang="quantité"
						this.mairu="acheter"
						this.maichu="vendre"
						this.faxingshijian="tempsdesortie"
						this.faxingzongliang="totalémis"
						this.liutongzongliang="quantitéencirculation"
						this.zhongchoujiage="crowdfundingPrice"
						this.qukuaichaxun="BlockQuery"
						this.baipishu="LeLivreblanc"
						this.guanwang="siteofficiel"
						break;
					case "it":
						this.zhangdiefu="Variazionideiprezzi"
						this.gao=Alto
						this.di=Basso
						this.dingdan="Ordine"
						this.jianjie="Introduzione"
						this.shijian="Tempo"
						this.fangxiang="Direzione"
						this.jiage="Prezzo"
						this.shuliang=Quantità
						this.mairu="Compra"
						this.maichu="Vendere"
						this.faxingshijian="Tempodirilascio"
						this.faxingzongliang="Importototaledell'emissione"
						this.liutongzongliang="Quantitàdicircolazione"
						this.zhongchoujiage="Prezzidelcrowdfunding"
						this.qukuaichaxun="Interrogazioneblocco"
						this.baipishu="Librobianco"
						this.guanwang="Sitoufficiale"
						break;
					case "pt":
						this.zhangdiefu="Flutuaçõesdepreços"
						this.gao="Alto"
						this.di="Baixo"
						this.dingdan="Ordem"
						this.jianjie="Introdução"
						this.shijian="Tempo"
						this.fangxiang="Direcção"
						this.jiage="Preço"
						this.shuliang="Quantidade"
						this.mairu="Comprar"
						this.maichu="Vender"
						this.faxingshijian="Tempodelibertação"
						this.faxingzongliang="Montantetotaldaemissão"
						this.liutongzongliang="Quantidadedecirculação"
						this.zhongchoujiage="Preçosdocrowdfunding"
						this.qukuaichaxun="BloquearConsulta"
						this.baipishu="LivroBranco"
						this.guanwang="SítioOficial"
						break;
					case "tr":
						this.zhangdiefu="Ödüldeğişiklikleri"
						this.gao="Yüksek"
						this.di="Düşük"
						this.dingdan="Emir"
						this.jianjie="İşler"
						this.shijian="Zaman"
						this.fangxiang="Doğru"
						this.jiage="Ödül"
						this.shuliang="Kıymet"
						this.mairu="Alın"
						this.maichu="Satın"
						this.faxingshijian="Bırakzamanı"
						this.faxingzongliang="Toplamemirmiktarı"
						this.liutongzongliang="Dönmemiktarı"
						this.zhongchoujiage="Çiftlikfiyatları."
						this.qukuaichaxun="BlockQuery"
						this.baipishu="BeyazKağıt"
						this.guanwang="Resmiwebsitesi"
						break;
					case "zh-Hant":
					  this.zhangdiefu="漲跌幅"
					  this.gao="高"
					  this.di="低"
					  this.dingdan="訂單"
					  this.jianjie="簡介"
					  this.shijian="時間"
					  this.fangxiang="方向"
					  this.jiage="價格"
					  this.shuliang="數量"
					  this.mairu="買入"
					  this.maichu="賣出"
					  this.faxingshijian="發行时间"
					  this.faxingzongliang="發行总量"
					  this.liutongzongliang="流通數量"
					  this.zhongchoujiage="眾籌價格"
					  this.qukuaichaxun="區塊查詢"
					  this.baipishu="白皮書"
					  this.guanwang="官網"
						break;
				}
			}
		},
		getUrlCode(name){
		    // 构造一个含有目标参数的正则表达式对象
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		    // 匹配目标参数
		    var r = window.location.search.substr(1).match(reg);
		    if(r != null){
		        return unescape(r[2]);
		    }else{
		        return null;
			}
		},
		// 返回上一页
		back(){
			uni.navigateTo({
				url: "/pages/maimai/jiaoyi?coinId=" + this.bid
			})
		},
		// 获取24小时交易数据统计
		getTxData(){
			this.txData=txData;
		},
		// 获取k线数据,生成k线
		getKline(){
			var dataMA5 = this.calculateMA(5, data);
			var dataMA10 = this.calculateMA(10, data);
			var dataMA30 = this.calculateMA(30, data);
			var volumeMA5 = this.calculateMA(5, volumes);
			var volumeMA10 = this.calculateMA(10, volumes);
			myChart.setOption({
				xAxis: [
					{
						data: dates
					},
					{
						data: dates
					},
				],
				series: [
					{
						name: '日K',
						data: data
					},
					{
						name: 'MA5',
						data: dataMA5
					},
					{
						name: 'MA10',
						data: dataMA10
					},
					{
						name: 'MA30',
						data: dataMA30
					},
					{
						name: 'Volume',
						data: volumes
					},
					{
						name: 'VolumeMA5',
						data: volumeMA5
					},
					{
						name: 'VolumeMA10',
						data: volumeMA10
					},
				]
			})
		},
		// 列表条数不足补全
		addItem(list,type){
			// type: 1开头加，2末尾加
			list=list || [];
			let len=20-list.length;
			if(len>0){
				for(let i=0;i<len;i++){
					if(type==1){
						list.unshift({})
					}else{
						list.push({})
					}
				}
			}
			return list;
		},
		// 获取深度数据
		getDepth(){
			this.buyList=this.addItem(depthList().buyList || []);
			this.sellList=this.addItem(depthList().sellList || []);
		},
		// 获取成交记录
		getDealHis(){
			get("/trading/info",{"coinId": this.bid}).then(response => {
				if(response.data.code == 200){
					let arr=[]
					for (let i in response.data.data) {
						console.log(response.data.data[i])
						arr.push({
							"date": response.data.data[i].time,
							// 1买入 2卖出
							"takerFlag": response.data.data[i].status,
							"price": response.data.data[i].price,
							"amount": response.data.data[i].count
						})
					}
					this.dealHis = arr
				}else{
					this.dealHis = []
				}
			})
		},
		// 获取项目简介信息
		getTokenInfo(){
			this.tokenInfo=tokenInfo;
		},
		
		// 切换tab
		switchTab(val){
			if(this.current==val) return;
			this.current=val;
			switch(this.current){
				case 1:
						get('/line/all',{'coinId':this.bid, 'flag': 'minutes'}).then(response => {
						  if(response.data.code == 200){
							rawData = response.data.data
							dates = rawData.map(function(item) {
								return item[0];
							});
							data = rawData.map(function(item) {
								return [+item[1], +item[2], +item[3], +item[4], +item[5]];
							});
							volumes = rawData.map(function(item, index) {
								return [index, item[5], item[1] > item[2] ? 1 : -1];
							});
							this.draw(98)
							this.getKline()
						  }
						})
					break;
				case 2:
						get('/line/all',{'coinId':this.bid, 'flag': 'hour'}).then(response => {
						  if(response.data.code == 200){
							rawData = response.data.data
							dates = rawData.map(function(item) {
								return item[0];
							});
							data = rawData.map(function(item) {
								return [+item[1], +item[2], +item[3], +item[4], +item[5]];
							});
							volumes = rawData.map(function(item, index) {
								return [index, item[5], item[1] > item[2] ? 1 : -1];
							});
							this.draw(95)
							this.getKline()
						  }
						})
					break;
				case 3:
						get('/line/all',{'coinId':this.bid, 'flag': 'day'}).then(response => {
						  if(response.data.code == 200){
							rawData = response.data.data
							dates = rawData.map(function(item) {
								return item[0];
							});
							data = rawData.map(function(item) {
								return [+item[1], +item[2], +item[3], +item[4], +item[5]];
							});
							volumes = rawData.map(function(item, index) {
								return [index, item[5], item[1] > item[2] ? 1 : -1];
							});
							this.draw(80)
							this.getKline()
						  }
						})
					break;
				case 4:
						get('/line/all',{'coinId':this.bid, 'flag': 'week'}).then(response => {
						  if(response.data.code == 200){
							rawData = response.data.data
							dates = rawData.map(function(item) {
								return item[0];
							});
							data = rawData.map(function(item) {
								return [+item[1], +item[2], +item[3], +item[4], +item[5]];
							});
							volumes = rawData.map(function(item, index) {
								return [index, item[5], item[1] > item[2] ? 1 : -1];
							});
							this.draw(40)
							this.getKline()
						  }
						})
					break;			
			}
		},
		// 切换类目
		switchCategory(val){
			if(this.category==val) return;
			this.category=val;
			if(this.category==1){
				this.getDepth()
			}else if(this.category==2){
				this.getDealHis()
			}else{
				this.getTokenInfo()
			}
		},
		// 截取数字字符串 保留precision小数
		formatterNum(value, precision) {
			// console.log(value)
			let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
			return value.toString().match(reg)
		},
		// 计算MA
		calculateMA(dayCount, data) {
			var result = [];
			for (var i = 0, len = data.length; i < len; i++) {
				if (i < dayCount) {
					result.push('-');
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += data[i - j][1];
				}
				// console.log(sum, dayCount)
				result.push((sum / dayCount).toFixed(2));
			}
			return result;
		},
		// 绘制(配置项)
		draw(start){
			let that=this;
			var upColor = '#03ad91';
			var downColor = '#dd345b';
			var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
				'#546570', '#c4ccd3'
			];
			var labelFont = 'bold 12px Sans-serif';
			var option = {
				backgroundColor: '#0d1723',
				title: {
					show: false
				},
				legend: {
					show: false
				},
				visualMap: {
				            show: false,
				            seriesIndex: 4,
				            dimension: 2,
				            pieces: [{
				                value: 1,
				                color: downColor
				            }, {
				                value: -1,
				                color: upColor
				            }]
				        },
				grid: [{
						top: '5%',
						left: 20,
						right: 20,
						height: '70%'
					},
					{
						top: '80%',
						left: 20,
						right: 20,
						height: '16%'
					},
				],
				axisPointer: { //坐标轴指示器配置项
					link: {
						xAxisIndex: 'all'
					},
					label: {
						backgroundColor: '#0d1723',
						color: '#fff',
						borderColor: 'rgb(99, 117, 139)',
						borderWidth: 1,
						borderRadius: 2,
						fontSize: 10
					}
				},
				xAxis: [{
					type: 'category', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
					data: [], //类目数据，在类目轴（type: 'category'）中有效。
					scale: true,
					boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
					axisLine: {
						show: false
					}, //坐标轴轴线相关设置
					axisTick: {
						show: false
					}, //坐标轴刻度相关设置。
					axisLabel: {
						show: false,
					}, //坐标轴刻度标签的相关设置。
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(255,255,255, 0.1)'
						}
					}, //坐标轴在 grid 区域中的分隔线。
					min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
					max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
					axisPointer: {
						label: {
							margin: 200
						}
					},
				}, {
					type: 'category',
					gridIndex: 1, //x 轴所在的 grid 的索引，默认位于第一个 grid。
					data: [], //类目数据，在类目轴（type: 'category'）中有效。
					scale: true,
					boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(255,255,255,1)',
							width: 1
						}
					}, //坐标轴轴线相关设置
					axisTick: {
						show: false
					}, //坐标轴刻度相关设置。
					axisLabel: { //坐标轴刻度标签的相关设置。
						show: true,
						margin: 6,
						fontSize: 10,
						color: 'rgba(99, 117, 139, 1.0)',
						formatter: function(value) {
							return echarts.format.formatTime('MM-dd', value);
						}
					},
					splitNumber: 20,
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(255,255,255, 0.1)'
						}
					}, //坐标轴在 grid 区域中的分隔线。
					min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
					max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
					// axisPointer: { show: true, type: 'none', label: { show: false }},
				}],
				yAxis: [{
					type: 'value', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
					position: 'right', //y 轴的位置。'left','right'
					scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。(在设置 min 和 max 之后该配置项无效。)
					axisLine: {
						show: true
					}, //坐标轴轴线相关设置。
					axisTick: {
						show: true,
						inside:true
					}, //坐标轴刻度相关设置。
					axisLabel: { //坐标轴刻度标签的相关设置。
						show: true,
						color: 'rgba(99, 117, 139, 1.0)',
						inside: true,
						fontSize: 10,
						formatter: function(value) {
							return Number(value).toFixed(2)
						}
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(255,255,255, 0.1)'
						}
					}, //坐标轴在 grid 区域中的分隔线。
				}, {
					type: 'value',
					position: 'right',
					scale: true,
					gridIndex: 1,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitLine: {
						show: false
					}
				}],
			
				animation: true, //是否开启动画。
				color: colorList,
				tooltip: {
					show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
					trigger: 'axis', //触发类型。item,axis,none
					formatter(params){
						let tooltip = '';
						let time = '', open = 0, high = 0, low = 0, close = 0, amount = 0;
						for (var i = 0; i < params.length; i++) {
							if (params[i].seriesName === '日K') {
								time = params[i].name;
								open = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[1], 2)) : 0;
								close = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[2], 2)) : 0;
								low = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[3], 2)) : 0;
								high = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[4], 2)) : 0;
								amount = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[5], 2)) : 0;
								// console.log(time,open,close,low,high,amount)
								tooltip = '<div class="charts-tooltip">' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + 'date' + '</div><div class="ctr-value">' + time + '</div></div>' + 
									'<div class="charts-tooltip-row"><div class="ctr-label">' + 'open' + '</div><div class="ctr-value">' + open + '</div></div>' + 
									'<div class="charts-tooltip-row"><div class="ctr-label">' + 'max' + '</div><div class="ctr-value">' + high + '</div></div>' + 
									'<div class="charts-tooltip-row"><div class="ctr-label">' + 'low' + '</div><div class="ctr-value">' + low + '</div></div>' +
									'<div class="charts-tooltip-row"><div class="ctr-label">' + 'stop' + '</div><div class="ctr-value">' + close + '</div></div>' ;
									// '<div class="charts-tooltip-row"><div class="ctr-label">' + '数量' + '</div><div class="ctr-value">' +amount + '</div></div></div>';
							}
							if (params[i].seriesName === 'MA5') {
								that.MA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
							}
							if (params[i].seriesName === 'MA10') {
								that.MA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
							}
							if (params[i].seriesName === 'MA30') {
								that.MA30 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
							}
							if (params[i].seriesName === 'VolumeMA5') {
								that.volMA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
							}
							if (params[i].seriesName === 'VolumeMA10') {
								that.volMA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
							}
						}
						return tooltip;
					},
					triggerOn: 'click', //提示框触发的条件 'mousemove','click','mousemove|click','none'
					textStyle: {
						fontSize: 10
					}, //提示框浮层的文本样式
					backgroundColor: 'rgba(30,42,66,0.8);', //提示框浮层的背景颜色。
					borderColor: '#2f3a56', //提示框浮层的边框颜色。
					borderWidth:2,
					position: function(pos, params, el, elRect, size) { //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
						var obj = {
							top: 20
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
						return obj;
					},
					axisPointer: { //坐标轴指示器配置项。
						label: {
							color: 'rgba(255,255,255,.87)',
							fontSize: 9,
							backgroundColor: '#020204',
							borderColor: "#9c9fa4",
							shadowBlur: 0,
							borderWidth: 0.5,
							padding: [4, 2, 3, 2],
						},
						animation: false,
						type: 'cross',
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(30, 42, 66, 0.1)' // 0% 处的颜色
								}, {
									offset: 0.7,
									color: 'rgba(30, 42, 66,0.9)' // 100% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(30, 42, 66,0.2)' // 100% 处的颜色
								}]
							},
							width: 10,
							shadowColor: 'rgba(30, 42, 66,0.7)',
							shadowBlur: 0,
							shadowOffsetY: 68,
						}
					}
				},
			
				dataZoom: [{ //用于区域缩放
					type: 'inside',
					xAxisIndex: [0, 1],
					realtime: true,
					start: start,
					end: 100,
				}
				],
				series: [
					{
						type: 'candlestick',
						name: '日K',
						data: [],
						itemStyle: {
							color: upColor,
							color0: downColor,
							borderColor: upColor,
							borderColor0: downColor
						},
						markPoint: {
							symbol: 'rect',
							symbolSize: [-10, 0.5],
							symbolOffset: [5, 0],
							itemStyle: {
								color: 'rgba(255,255,255,.87)'
							},
							label: {
								color: 'rgba(255,255,255,.87)',
								offset: [10, 0],
								fontSize: 10,
								align: 'left',
								formatter: function(params) {
									return Number(params.value).toFixed(2)
								}
							},
							data: [{
									name: 'max',
									type: 'max',
									valueDim: 'highest'
								},
								{
									name: 'min',
									type: 'min',
									valueDim: 'lowest'
								}
							]
						},
					}, 
					{
						name: 'MA5',
						type: 'line',
						data: [],
						symbol: 'none',//去除圆点
						smooth: true,
						lineStyle: { normal: { opacity: 1, width: 1, color: "#eef4ba" } },
						z: 5
					}, 
					{
						name: 'MA10',
						type: 'line',
						data: [],
						symbol: 'none',//去除圆点
						smooth: true,
						lineStyle: { normal: { opacity: 1, width: 1, color: '#83c1c5' } },
						z: 4
					},
					{
						name: 'MA30',
						type: 'line',
						data: [],
						symbol: 'none',//去除圆点
						smooth: true,
						lineStyle: { normal: { opacity: 1, width: 1, color: '#b39cd8' } },
						z: 3
					},
					{
							name: 'Volume',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: []
						},
						{
							name: 'VolumeMA5',
							type: 'line',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: [],
							symbol: 'none',//去除圆点
							smooth: true,
							lineStyle: { normal: { opacity: 1, width: 1, color: "#eef4ba" } },
							z: 5
						},
						{
							name: 'VolumeMA10',
							type: 'line',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: [],
							symbol: 'none',//去除圆点
							smooth: true,
							lineStyle: { normal: { opacity: 1, width: 1, color: '#83c1c5' } },
							z: 4
						},
				]
			};
			myChart.setOption(option);
			// 加载上一页数据
			myChart.on('datazoom',function(params){
				let num=params.batch[0]['start'];
				if(num==0){
					console.log('到最左边了')
				}
			})
			window.addEventListener('resize', () => { myChart.resize()})
		}
	}
})