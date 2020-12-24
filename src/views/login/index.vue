<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title" style="color: #006ab7; font-size: 34px;">结 算 工 具</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text" tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码"
          name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
          <div class="tips">注：输入任意账号密码登录</div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px; font-size: 20px; font-weight: bold;" @click.native.prevent="handleLogin">登  录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
  // 引入正则
  // import { validUsername } from '@/utils/validate'
  import {
    getcode,
  } from '@/api/user'
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      }
      return {
        codeSrc: 'http://110.87.189.181:8000/account/captcha',
        loginForm: {
          username: '',
          password: '',
          verificCode: '',
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          verificCode: [{
            required: true,
            trigger: 'blur',
            validator: validateCode
          }],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      recapture() {
        this.codeSrc = `http://110.87.189.181:8000/account/captcha?t=${new Date().getTime()}`;
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            // var loginForm = {
            //   username: this.loginForm.username,
            //   password: this.$getRsaCode(this.loginForm.password),
            //   verificCode: this.loginForm.verificCode,
            // }
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({
                path: this.redirect || '/'
              })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {}
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#fff;
  $light_gray:#006ab7;
  $cursor: #006ab7;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 0.5px solid #889aa4;
      background: #fff;
      border-radius: 5px;
      color: #fff;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#fff;
  $dark_gray:#889aa4;
  $light_gray:#fff;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background-image: url(../../assets/login_bg.png);

    .login-form {
      position: absolute;
      width: 520px;
      max-width: 100%;
      top: 25%;
      left: 60%;
      padding: 45px 35px 35px;
      overflow: hidden;
      background-color: whitesmoke;
      border-radius:5px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .show-Vcode {
      cursor: pointer;
      position: absolute;
      height: 100%;
      width: 40%;
      top: 0;
      right: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .el-button--primary {
      color: #fff;
      background-color: #006ab7;
      border-color: #006ab7;
    }
    .el-button--primary:hover {
      color: #fff;
      background-color: #025d9f;
      border-color: #025d9f;
    }
    .tips{
      color: rgb(0, 106, 183);
    font-size: 14px;
    }
  }
</style>
