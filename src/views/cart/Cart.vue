<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"/>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="row" v-for="(item, index) in cartInfo" :key="index">
        <div class="img"><img :src="item.image" width="100%"></div>
        <div class="text">
          <div class="goods-name">{{item.name}}</div>
          <div class="control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="goods-price">
          <div>¥{{item.price | MoneyFormat}}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">¥{{item.price * item.count | MoneyFormat}}</div>
        </div>
      </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoney">
      商品总价：¥{{totalMoney | MoneyFormat}}
    </div>
    <!-- 清除购物车 -->
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清除购物车</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cart',
    data() {
      return {
        cartInfo: [],  //购物车内的商品
        isEmpty: false,  //购物车是否为空,不为空则显示true,为空显示false
      }
    },
    created() {
      this.getCartInfo()
    },
    methods: {
      // 得到购物车的商品
      getCartInfo() {
        // 判断localStorage里是否有购物车数据
        if(localStorage.cartInfo) {
          // 如果有数据,我们去除并赋值给cartInfo
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        this.isEmpty = this.cartInfo.length > 0 ? true : false
      },
      // 清空购物车的商品
      clearCart() {
        localStorage.removeItem('cartInfo')
        this.cartInfo = []
      }
    },
    computed: {
      totalMoney() {
        let allMoney = 0
        this.cartInfo.forEach((item, index) => {
          allMoney += item.price * item.count
        })
        localStorage.cartInfo = JSON.stringify(this.cartInfo)
        return allMoney
      }
    }
  }
</script>

<style scoped>
  .cart-title {
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid #E4E7ED;
    padding: 0.3125rem;
    text-align: right;
  }
  .cart-list {
    background-color: #fff;
  }
  .row {
    display: flex;
    padding: .5rem;
    font-size: .85rem;
    border-bottom: 1px solid #E4E7ED;
  }
  .img {
    flex: 6;
  }
  .text {
    flex: 14;
    padding-left: 0.625rem;
  }
  .control {
    padding-top: 0.625rem;
  }
  .goods-price {
    flex: 4;
    text-align: right;
  }
  .allPrice {
    color: red;
  }
  .totalMoney {
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #E4E4ED;
    padding: 0.3125rem;
  }
</style>