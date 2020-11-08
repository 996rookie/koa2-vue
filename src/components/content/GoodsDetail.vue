<template>
  <div>
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="商品详情"
      @click-left="onClickLeft"
    />
    <div>
      <img :src="goodsDetail.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsDetail.NAME}}</div>
    <div class="goods-price">价格：¥{{goodsDetail.PRESENT_PRICE | MoneyFormat}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsDetail.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">
          评价
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDetail } from 'network/goods'

  import { Toast } from 'vant'

  export default {
    name: 'GoodsDetail',
    data() {
      return {
        goodsId: '',
        goodsDetail: {}
      }
    },
    created() {
      this.goodsId = this.$route.query.goodsId
      let data = {
        goodsId: this.goodsId
      }
      getDetail(data).then(res => {
        if(res.data.code = 200 && res.data.message) {
          this.goodsDetail = res.data.message
        }else{
          Toast('服务器错误,数据取得失败')
        }
      })
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      // 向购物车中添加商品
      addGoodsToCart() {
        // 取出购物车内的商品数据
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
        // 判断购物车内是否已经有这个商品
        // 如果没有返回undefined,如果有返回第一个查找的数据
        let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)
        if(!isHaveGoods) {
          // 没有商品直接添加到数组中
          // 重新组成添加购物车的信息
          let newGoodsInfo = {
            goodsId: this.goodsDetail.ID,
            name: this.goodsDetail.NAME,
            price: this.goodsDetail.PRESENT_PRICE,
            image: this.goodsDetail.IMAGE1,
            count: 1
          }
          // 添加到购物车
          cartInfo.push(newGoodsInfo)
          // 操作本地数据
          localStorage.cartInfo = JSON.stringify(cartInfo)
          Toast.success('添加成功')
        }else{
          Toast.success('已有此商品')
        }
        this.$router.push({path: '/cart'})
      }
    }
  }
</script>

<style scoped>
  .detail {
    font-size: 0px;
  }
  .goods-name .goods-price {
    background-color: #fff;
  }
  .goods-bottom {
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    width: 100%;
  }
  .goods-bottom > div {
    flex: 1;
    padding: 0.3125rem;
  }
</style>