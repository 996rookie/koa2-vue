<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="用户注册"
      left-arrow
      @click-left='goBack'
    />
    <div class="register-panel">
      <van-field
        required
        autofocus
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        :error-message="usernameErrorMsg"
      />
      <van-field
        required
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRegister } from "network/register"

  import { Toast } from 'vant'

  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        openLoading: false,  //是否开启用户注册的Loading状态,防止重复提交
        usernameErrorMsg: '',  //当用户名出现错误时的提示信息
        passwordErrorMsg: ''  //当密码出现错误时的提示信息
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)   
      },
      registerAction() {
        this.checkForm() && this.RegisterUser()
      },
      RegisterUser() {
        this.openLoading = true
        let data = {
          userName: this.username,
          password: this.password
        }
        getRegister(data).then(res => {
          // 如果返回code为200，代表注册成功，我们给用户作Toast提示
          if(res.data.code == 200) {
            Toast.success(res.data.message)
            this.$router.push({path: '/home'})
          }else{
            Toast.fail('注册失败')
            this.openLoading = false
          }
        }).catch(error => {
          Toast.fail('登录失败')
          this.openLoading = false
        })
      },
      // 表单验证方法
      checkForm() {
        let isOk = true
        if(this.username.length < 6) {
          this.usernameErrorMsg = '用户名不能少于6位'
          isOk = false
        }else{
          this.usernameErrorMsg = ''
        }
        if(this.password.length < 6) {
          this.passwordErrorMsg = '密码不能少于6位'
          isOk = false
        }else{
          this.passwordErrorMsg = ''
        }
        return isOk
      }
    }
  }
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 0.3125rem;
    margin: 1.25rem auto;
    padding-bottom: 5rem;
  }
  .register-button {
    padding-top: 1.25rem;
  }
</style>