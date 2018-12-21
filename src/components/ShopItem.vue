<template>
	<div class="item">
		<div>
			<div class="item-img"><img :alt="item.name_title" :src="item.sku_info[itemIndex].ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'" style="opacity: 1;">
			</div>
			<h6>{{item.name}}</h6>
			<h3>{{item.name_title}}</h3>
			<div class="params-colors" >
				<ul class="colors-list">
					<li v-for="(sku,index) in item.sku_info" :title="sku.spec_json.show_name" @click="changeColor(index)">
						<a href="javascript:;" :class="{active:itemIndex===index}">
							<img :src="'http://img01.smartisanos.cn/'+sku.spec_json.image+'20X20.jpg'">
						</a>
					</li>
				</ul>
			</div>
			<div class="item-btns clearfix">
				<span class="item-gray-btn"><a href="javascript:;" target="_blank">查看详情</a></span>
				<span class="item-blue-btn" @click="addToCarHandle(item.sku_info[itemIndex])">加入购物车 </span>
			</div>
			<div class="item-price clearfix">
				<i>¥</i><span>{{item.price}}</span>
			</div>
			<div class="discount-icon">false</div>
			<div class="item-cover">
				<a href="javascript:;" target="_blank"></a>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props:['item'],
	data(){
		return {
			itemIndex:0
		}
	},
	computed:{
		
	},
	methods:{
		changeColor(index){
			this.itemIndex = index;
		},
		addToCarHandle(sku_info){
			this.$store.commit('addToCar',sku_info)
		}
	}
	
}
</script>