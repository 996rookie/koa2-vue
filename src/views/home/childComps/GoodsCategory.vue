<template>
  <div class="goods-category">
    <div v-for="(item, index) in GoodsCategory" :key="index">
      <img v-lazy="item.image" width="90%">
      <span>{{item.mallCategoryName}}</span>
    </div>
  </div>
</template>

<script>
  import { getHomeMultidata } from 'network/home'

  export default {
    name: 'GoodsCategory',
    data() {
      return {
        GoodsCategory: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.GoodsCategory = res.category
      })
    }
  }
</script>

<style scoped>
  .goods-category {
    display: flex;
    margin: 0 .3rem .3rem;
    background-color: #fff;
    border-radius: .3rem;
  }

  .goods-category div {
    padding: .3rem;
    font-size: 0.75rem;
  }

  .goods-category img {
    width: 50px;
    height: 50px;
  }
</style>