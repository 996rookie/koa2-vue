<template>
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <van-list>
        <van-row gutter="20">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <GoodsInfo :hotGoods="item"/>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
  import { getHomeMultidata } from 'network/home'

  import GoodsInfo from 'components/common/GoodsInfo'

  export default {
    name: 'HotGoods',
    components: {
      GoodsInfo
    },
    data() {
      return {
        hotGoods: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.hotGoods = res.hotGoods
      })
    }
  }
</script>

<style scoped>
  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
</style>