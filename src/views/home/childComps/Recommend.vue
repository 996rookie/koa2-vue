<template>
  <div class="recommend">
    <div class="recommend-title">
      商品推荐
    </div>
    <div class="recommend-body">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in recommends" :key="index">
          <div class="recommend-item">
            <img :src="item.image" width="80%">
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price | MoneyFormat}} (￥{{item.mallPrice | MoneyFormat}})</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { getHomeMultidata } from 'network/home'

  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    name: 'Recommend',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOptions: {
          slidesPerView: 3
        },
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.recommends = res.recommend
      })
    }
  }
</script>

<style scoped>
  .recommend {
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 0.875rem;
    padding: .2rem;
    color: #e5017d;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 0.75rem;
    text-align: center;
  }
</style>