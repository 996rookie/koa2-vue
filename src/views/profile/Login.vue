<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="用户登录"
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
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLogin } from "network/login"

  import { Toast } from 'vant'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        openLoading: false,  //是否开启用户登录的Loading状态,防止重复提交
        usernameErrorMsg: '',  //当用户名出现错误时的提示信息
        passwordErrorMsg: ''  //当密码出现错误时的提示信息
      }
    },
    created() {
      if(localStorage.userInfo) {
        Toast.success('您已经登录过了')
        this.$router.push({path: '/home'})
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      loginAction() {
        this.checkForm() && this.loginUser()
      },
      loginUser() {
        this.openLoading = true
        let data = {
          userName: this.username,
          password: this.password
        }
        getLogin(data).then(res => {
          if(res.data.code == 200 && res.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = {userName: this.userName}
              setTimeout(() => {
                resolve()
              }, 500)
            }).then(() => {
              Toast.success('登录成功')
              this.$router.push({path: '/home'})
            }).catch(err => {
              Toast.fail('登录状态保存失败')
            })
          }else{
            Toast.fail('登录失败')
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