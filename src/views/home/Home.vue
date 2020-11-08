<template>
    <div class="home">
      <!-- 导航栏 -->
      <NavBar class="nav-bar">
        <div slot="left">
          <van-icon name="location" size="30" color="#fff" />
        </div>
        <div slot="title">
          <van-search placeholder="请输入搜索关键词" background="#e5017d" shape="round" />
        </div>
        <div slot="right">
          <van-button size="small">查找</van-button>
        </div>
      </NavBar>
      <!-- 轮播图 -->
      <Swipe/>
      <!-- 商品分类 -->
      <GoodsCategory/>
      <!-- 广告 -->
      <Banner/>
      <!-- 商品推荐 -->
      <Recommend/>
      <!-- 楼层商品 -->
      <Floor/>
      <!-- 热卖商品 -->
      <HotGoods/>
    </div>
</template>

<script>
  import NavBar from 'components/common/NavBar'

  import Swipe from 'views/home/childComps/Swipe'
  import GoodsCategory from 'views/home/childComps/GoodsCategory'
  import Banner from 'views/home/childComps/Banner'
  import Recommend from 'views/home/childComps/Recommend'
  import Floor from 'views/home/childComps/Floor'
  import HotGoods from 'views/home/childComps/HotGoods'

  export default {
    name: 'Home',
    components: {
      NavBar,
      Swipe,
      GoodsCategory,
      Banner,
      Recommend,
      Floor,
      HotGoods
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #e5017d;
    overflow: hidden;
  }
</style>