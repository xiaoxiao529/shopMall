<template>
	<li class="nav-cart" @mouseenter="showCarHandle()" @mouseleave="hideCarHandle()">  <!--移入移出加在li上面-->
		<a href="javascript:;" >购物车</a>
		<!--根据class改变颜色-->
		<span class="cart-empty-num" :class="{'cart-num':totalCount}" >
			<i>{{totalCount}}</i>
		</span>
		<div class="nav-cart-wrapper" v-if="ifShowCar" >
			<div class="nav-cart-list">
				<div class="empty" v-if="!totalCount">  <!--shopCarData里面有值的时候，这个隐藏-->
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div class="full" v-else>
					<div class="nav-cart-items">
						<ul>
							<li class="clear" :key="index" v-for="(item,index) in shopCarData">
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image">
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> 
													<a href="#/item/100027401">{{item.title}}</a>
												</h4>
												<p class="attrs">
													<span>{{item.spec_json.show_name}}</span>
												</p>
												<h6>
													<span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
												</h6>
											</div>
										</div>
										<div class="del-btn" @click="deleteGoods(item)">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{totalCount}}</strong> 件商品</p>
						<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totalMoney}}</span></h5>
						<h6>
							<router-link  class="nav-cart-btn" to="/paycart">去购物车</router-link>
						</h6>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
export default{
	data(){
		return {
			iTimer:null
		}
	},
	computed:{  //state里面的数据和getters里面的方法写在这里面
		shopCarData(){
			return this.$store.state.shopCarData
		},
		ifShowCar(){
			return this.$store.state.ifShowCar
		},
		totalCount(){
			return this.$store.getters.totalCount
		},
		totalMoney(){
			return this.$store.getters.totalMoney
		}
	},
	methods:{  //mutations里面的方法写在这里面
		deleteGoods(item){
			this.$store.commit('deleteFromCar',item);
		},
		showCarHandle(){
			clearTimeout(this.iTimer)
			this.$store.commit('showCar');
		},
		hideCarHandle(){
			//this.$store.commit('hideCar');
			this.iTimer = setTimeout(()=>{
	          this.$store.commit('hideCar')
	        },500)
		}
	}
}
</script>

<style>
</style>