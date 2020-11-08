<template>
  <div>
    <div>
      <van-nav-bar title="会员中心" />
    </div>
    <div class="top">
      <img src="https://wwc.alicdn.com/avatar/getAvatar.do?userNick=&width=50&height=50&type=sns&_input_charset=UTF-8" />
    </div>
    <div class="login">
      <div><van-button type="warning" @click="login">我要登录</van-button></div>
      <div><van-button type="primary" @click="register">我要注册</van-button></div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link  />
        <van-cell title="我的订单" is-link  />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link  />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    methods: {
      register() {
        this.$router.push({path: '/register'})
      },
      login() {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  .top {
    height: 5rem;
    text-align: center;
    padding-top: 2rem;
    background-color: #EEA2AD;
  }
  .top img {
    width: 4.375rem;
    height: 4.375rem;
    border-radius: 3.125rem;
  }
  .login {
    display: flex;
    background-color: #fff;
    padding: 0.625rem;
  }
  .login div{
    flex:1;
    text-align: center;
  }
</style>