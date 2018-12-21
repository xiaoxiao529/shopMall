<template>
  	<div id="main">
		<div class="sku-box store-content">
			<div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active">综合排序</a></li>
					<li><a href="javascript:;" class="">销量排序</a></li>
					<li><a href="javascript:;" class="">价格低到高</a></li>
					<li><a href="javascript:;" class="">价格高到低</a></li>
				</ul>
			</div>
			<div class="gray-box">
				<div class="item-box">
					<shop-item :key="index" v-for="(item,index) in goodsData" :item="item"></shop-item>
				</div>
			</div>
		</div>
		<prompt></prompt>
	</div>
</template>

<script>
import goodsData from '@/lib/newGoodsData'
import ShopItem from '@/components/ShopItem'
import Prompt from '@/components/Prompt'
export default {
  data () {
    return {
      goodsData: goodsData
    }
  },
  components:{
  	ShopItem,
  	Prompt
  }
}
</script>


<style scoped>

</style>
