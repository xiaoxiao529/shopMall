<template>
  <div id="app">
  	<header-nav></header-nav>
    <router-view/>
  </div>
</template>

<script>
	import headerNav from '@/components/HeaderNav'
	export default {
	  name: 'App',
	  components:{
	  	headerNav
	  },
	  created(){
	  	console.log(this.$store)
	  }
	}
</script>

<style>

</style>
