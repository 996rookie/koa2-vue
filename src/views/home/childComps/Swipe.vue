<template>
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item.image" width="100%" height="143px">
      </van-swipe-item>
    </van-swipe>
</template>

<script>
  import { getHomeMultidata } from 'network/home'

  export default {
    name: 'Swipe',
    data() {
      return {
         banners: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.slides
      })
    }
  }
</script>

<style scoped>

</style>