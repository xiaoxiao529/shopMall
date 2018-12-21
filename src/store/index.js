import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{  //购物车数据，默认是数组
		shopCarData:[],
		ifMaxBuyNumber:false,  //是否到达最大购买数量，从而显示弹框与否
		ifShowCar:false,  //默认不显示购物车
		carTimer:null
	},
	getters:{  //计算属性，涉及到计算的都在这里面
		totalCount(state){
			let totalCount = 0;
			state.shopCarData.forEach((item)=>{
				totalCount += item.count;
			})
			return totalCount;
		},
		totalMoney(state){
			let totalPrice = 0;
			state.shopCarData.forEach((item)=>{
				totalPrice += item.count*item.price
			})
			return totalPrice;
		}
	},
	mutations:{  //直接拿值取值的在这里面、操作效果的都放在这里面
		addToCar(state,payLoad){
			let onOff = true;
			
			state.shopCarData.forEach((goods)=>{  //已经存在的情况下，就不执行添加操作了，下面的代码就不执行了
				if(goods.sku_id===payLoad.sku_id){
					goods.count++;
					onOff = false;
					if(goods.count>payLoad.limit_num){
						goods.count = payLoad.limit_num;
						state.ifMaxBuyNumber = true;
					}
					state.ifShowCar = true
				}
			})
			if(onOff){  //第一次肯定不存在，所以第一次肯定走这里
				Vue.set(payLoad,'count',1);  //之前的数据没有count这个属性，这里动态追加这个属性，使用Vue.set()方法
				state.shopCarData.push(payLoad);
				state.ifShowCar = true
			}
			//console.log(state.shopCarData);
			
			state.shopCarData.forEach((goods)=>{  
				state.totalCount+=goods.count;
			})
			
		},
		deleteFromCar(state,payload){
			state.shopCarData.forEach((item,index)=>{
				if(item.sku_id === payload.sku_id){
					state.shopCarData.splice(index,1)
				}
			})
		},
		hidePrompt(state){
			state.ifMaxBuyNumber = false;
		},
		showCar(state){
			state.ifShowCar = true;
			clearTimeout(state.carTimer);
		},
		hideCar(state){
			state.carTimer = setTimeout(()=>{
				state.ifShowCar = false;
			},500)
		}
	}
})

export default store
