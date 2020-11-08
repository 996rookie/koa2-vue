<template>
  <div @click="goGoodsPage">
    <div>
      <img v-lazy="hotGoods.image" width="90%">
    </div>
    <div class="goods-name">{{hotGoods.name}}</div>
    <div>¥{{hotGoods.price | MoneyFormat}}</div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsInfo',
    props: {
      hotGoods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      goGoodsPage() {
        this.$router.push({path: 'detail', query: {goodsId: this.hotGoods.goodsId}})
      }
    }
  }
</script>

<style scoped>
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>