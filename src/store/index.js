import Vue from 'vue'
import Vuex from 'vuex'

import local from '../lib/utils.js'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{  
		shopCarData:[],  //购物车数据，默认是数组
		ifMaxBuyNumber:false,  //是否到达最大购买数量，从而显示弹框与否
		ifShowCar:false,  //默认不显示购物车
		carTimer:null,
		addressData:[{
		  "name": "王某某",
		  "phone": "13811111111",
		  "areaCode": "010",
		  "landLine": "64627856",
		  "provinceId": 110000,
		  "province": "北京市",
		  "cityId": 110100,
		  "city": "市辖区",
		  "countyId": 110106,
		  "county": "海淀区",
		  "add": "上地十街辉煌国际西6号楼319室",
		  "default": true
		}, {
		  "name": "李某某",
		  "phone": "13811111111",
		  "areaCode": "010",
		  "landLine": "64627856",
		  "provinceId": 110000,
		  "province": "北京市",
		  "cityId": 110100,
		  "city": "市辖区",
		  "countyId": 110106,
		  "county": "海淀区",
		  "add": "上地十街辉煌国际东6号楼350室",
		  "default": false
		}],
		orderData:[]  //最终的商品，即购物车里面选中的提交成功的商品
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
		},
		totalChecked(state){
			/*let totalChecked = 0;  //不能通过数量判断，直接通过true false来
			state.shopCarData.forEach((item)=>{
				if(item.checked){
					totalChecked++;
				}
			})
			return totalChecked;*/
			let totalChecked = true;
			state.shopCarData.forEach((item)=>{
				if(!item.checked){  //有一个未选中，那么全选就不能选中
					totalChecked=false;
				}
			})
			return totalChecked;
		},
		totalCheckedCount(state){
			let totalCheckedCount = 0;
			state.shopCarData.forEach((item,index)=>{
				if(item.checked){
					totalCheckedCount+=item.count
				}
			})
			return totalCheckedCount
		},
		totalCheckedPrice(state){
			let totalCheckedPrice = 0;
			state.shopCarData.forEach((item,index)=>{
				if(item.checked){
					totalCheckedPrice+=item.count*item.price
				}
			})
			return totalCheckedPrice
		},
		checkedGoods(state){
			let checkedGoodsArray = []
			state.shopCarData.forEach((item,index)=>{
				if(item.checked){
					checkedGoodsArray.push(item)
				}
			})
			return checkedGoodsArray
		}
	},
	mutations:{  //直接拿值取值的在这里面、操作效果的都放在这里面
		addToCar(state,payLoad){
			let onOff = true;
			state.shopCarData.forEach((goods)=>{  //已经存在的情况下，就不执行添加操作了，下面的代码就不执行了
				if(goods.sku_id===payLoad.info.sku_id){
					goods.count++;
					onOff = false;
					if(goods.count>payLoad.info.limit_num){
						goods.count = payLoad.info.limit_num;
						state.ifMaxBuyNumber = true;
					}
					state.ifShowCar = true
				}
			})
			if(onOff){  //第一次肯定不存在，所以第一次肯定走这里
				Vue.set(payLoad.info,'count',payLoad.addCount);  //之前的数据没有count这个属性，这里动态追加这个属性，使用Vue.set()方法
				Vue.set(payLoad.info,'checked',true);  //给商品添加是否选中状态，默认为true，选中
				state.shopCarData.push(payLoad.info);
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
					return  //作用是结束循环，提高性能
				}
			})
		},
		hidePrompt(state){
			state.ifMaxBuyNumber = false;
		},
		showCar(state){
			state.ifShowCar = true;
		},
		hideCar(state){
			state.ifShowCar = false;
		},
		addCartNum(state,payload){
			state.shopCarData.forEach((item,index)=>{
				if(item.sku_id === payload.sku_id){
					if(item.count>=item.limit_num){
						return		
					}
					item.count++
					return
				}
			})
		},
		reduceCartNum(state,payload){
			state.shopCarData.forEach((item,index)=>{
				if(item.sku_id === payload.sku_id){
					if(item.count<=1){
						return		
					}
					item.count--
					return
				}
			})
		},
		changeGoodCheck(state,payload){
			state.shopCarData.forEach((item,index)=>{
				if(item.sku_id === payload.sku_id){
					item.checked = !item.checked
				}
			})
		},
		checkAllGoods(state,totalChecked){
			/*state.shopCarData.forEach((item,index)=>{
				item.checked = !item.checked
			})*/
			state.shopCarData.forEach((item,index)=>{
				item.checked = !totalChecked  //需要有一个值供所有的单选框来用，因为全选是统一操作，不需要单独操作
			})
		},
		deleteCheckedGood(state){
			let i = state.shopCarData.length;
			while(i--){  //小技巧，从后开始删除选中的每一项，如果从前面开始删除，那么后面的会往前 进一
				if(state.shopCarData[i].checked){
					state.shopCarData.splice(i,1)
				}
			}
			/*state.shopCarData.forEach((item,index)=>{
				if(item.checked){
					state.shopCarData.splice(index,1)
				}
			})*/
		},
		addCustomInfo(state,payload){
			if(payload.default){
				state.addressData.forEach((item)=>{
					item.default = false;
				})
			}
			state.addressData.push(payload)
		},
		submitOrder(state,payload){
			state.orderData.unshift(payload)  //将数据插入到最前面，最后插入的是最新的
			//然后从购物车删除已经提交成功的商品，即选中的商品
			let i = state.shopCarData.length;
			while(i--){
				if(state.shopCarData[i].checked){  //选中的商品移除，从后往前筛选
					state.shopCarData.splice(i,1)	
				}
			}
		}
	}
})

export default store

//除了开始的增加购物车，后续操作的所有数据都是购物车里面的数据，即shopCarData
//state里面的属性是页面上所有的元素共用的,改变了可能导致页面上只要用到这个属性的地方都会改变
//如果要想每个元素单独的改变,那么就把该属性加到每个元素的身上,作为对象的一个属性,而不是写到state里面，
//如把checked属性加到选中上，那么每个元素都可以自己控制选中