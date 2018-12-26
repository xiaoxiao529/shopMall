<template>
	<div id="main">
		<div class="store-content item">
			<div class="item-box">
				<div class="gallery-wrapper">
					<div class="gallery">
						<div class="thumbnail">
							<ul>
								<li @click="goodDetailChange(index)" :class="{on:index==goodDetailIndex}" :key="index" v-for="(item,index) in detailGoodInfo.ali_images">
									<img :src="item+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'">
								</li>
							</ul>
						</div>
						<div class="thumb">
							<ul>
								<li :class="{on:index==goodDetailIndex}" :key="index" v-for="(item,index) in detailGoodInfo.ali_images">
									<img :src="item+'?x-oss-process=image/resize,w_400/quality,Q_90/format,webp'">
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="banner">
					<div class="sku-custom-title">
						<div class="params-price">
							<span><em>¥</em><i>{{detailGoodInfo.price}}</i></span>
						</div>
						<div class="params-info">
							<h4>{{detailGoodInfo.title}}</h4>
							<h6>{{detailGoodInfo.sub_title}}</h6>
						</div>
					</div>
					<div class="sku-dynamic-params-panel">
						<div class="sku-dynamic-params clear">
							<span class="params-name">颜色</span>
							<ul class="params-colors">
								<li :class="{cur:item.id == $route.query.itemId}" v-for="(item,index) in detailGoodInfo.sku_list">
									<router-link :title="item.color" :to="{path:'/detail',query:{itemId:item.id}}">  <!--通过改变url后面的参数来改变一系列的内容-->
										<img :src="'http://img01.smartisanos.cn/'+item.image+'20X20.jpg'">
									</router-link>
								</li>
							</ul>
						</div>
						<div class="sku-dynamic-params clear">
							<div class="params-name">数量</div>
							<div class="params-detail clear">
								<div class="item-num js-select-quantity">
									<span class="down" :class="{'down-disabled':addGoodsNumber==1}" @click="reduceGoodDetailNum()">-</span>
									<span class="num">{{addGoodsNumber}}</span>
									<span class="up" :class="{'up-disabled':addGoodsNumber==detailGoodInfo.limit_num}" @click="addGoodDetailNum()">+</span>
								</div>
							</div>
						</div>
					</div>
					<div class="sku-status">
						<div class="cart-operation-wrapper clearfix">
							<span class="blue-title-btn js-add-cart" @click="addToCarHandle(detailGoodInfo)"><a>加入购物车</a></span>
							<span class="gray-title-btn"><a>现在购买</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<prompt></prompt>
		
	</div>
</template>

<script>
import newItemsData from '../lib/newItemsData'
import Prompt from '@/components/Prompt'
export default{
	data(){
		return {
			goodDetailData:newItemsData,
			goodDetailId:this.$route.query.itemId,  //this.$route.query.itemId只在刚刚进来时获取，后期改变这个不会再重新赋值给goodDetailId，所以需要watch
			goodDetailIndex:0,
			addGoodsNumber:1
		}
	},
	computed:{
		detailGoodInfo(){
			return this.goodDetailData.filter((item)=>{
				return Number(item.sku_id) === Number(this.goodDetailId)
			})[0]
		}
	},
	watch:{
		'$route.query.itemId'(){  //监控$route.query.itemId，url参数改变时重新赋值
			this.goodDetailId = this.$route.query.itemId
			this.goodDetailIndex = 0;
		}
	},
	methods:{
		goodDetailChange(index){
			this.goodDetailIndex = index;
		},
		addToCarHandle(detailGood){ 
			//现在点击增加几个商品，就往购物车添加几个商品，肯定还是通过commit处理vuex里面的数值来进行，因为之前都是每次添加数量为1，所以就直接传入商品信息，
			//现在要传商品信息+商品数量，就得需要一个对象来储存了。
			let carGoodData = {info:detailGood,addCount:this.addGoodsNumber}; 
			this.$store.commit('addToCar',carGoodData)  //既然这里面也是加入购物车，和ShopItem页面是一样的使用commit，同一个功能
		},
		addGoodDetailNum(){
			this.addGoodsNumber++;
			if(this.addGoodsNumber>=this.detailGoodInfo.limit_num){
				this.addGoodsNumber = this.detailGoodInfo.limit_num
			}
		},
		reduceGoodDetailNum(){
			this.addGoodsNumber--;
			if(this.addGoodsNumber<=1){
				this.addGoodsNumber = 1
			}
		}
	},
	components:{
		Prompt
	}
}
</script>

<style>

</style>