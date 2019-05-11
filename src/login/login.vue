<template>
  <div>
    <header class="login-header">
      <Row>
        <Col span="24">
          <div class="logo"><img src="../assets/images/logo2.png"></div>
        </Col>
      </Row>
    </header>
    <section class="login-banner bg-color">
        <Row type="flex" align="middle" class="banner-center">
          <Col span="16"><img src="../assets/images/tra.jpg" alt=""></Col>
          <Col span="8" class="login-from">
            <div class="login-input-title" >登录</div>
            <div class="tab-user text-align">
              <span :class="{'active': tabActive}" @click="loginTab ( 'user' )">用户登录</span>
              <span :class="{'active': !tabActive} "@click="loginTab ( 'plat' )">平台管理</span>
            </div>
            <div v-show="tabActive">
              <div class="user-input">
                <Input placeholder="运营商/供应商/分销商编号" v-model="userLogin.cmpcode">
                  <span slot="prepend"><span class="icon iconfont icon-gs"></span></span>
                </Input>
              </div>
                <div class="user-input">
                  <Input placeholder="邮箱/手机/用户名" v-model="userLogin.userID">
                    <span slot="prepend"><span class="icon iconfont icon-yonghuming"></span></span>
                  </Input>
                </div>
                <div class="user-input" v-on:keyup.enter="commitLogin">
                  <Input type="password" placeholder="请输入密码" v-model="userLogin.userPwd">
                    <span slot="prepend"><span class="icon iconfont icon-mima"></span></span>
                  </Input>
                </div>
                <div class="user-input" style="text-align: center;">
                  <Radio-group v-model="userLogin.cmpType">
                      <Radio label="1">运营商</Radio>
                      <Radio label="2">供应商</Radio>
                      <Radio label="3">分销商</Radio>
                  </Radio-group>
                </div>
            </div>
            <div v-show="!tabActive">
              <div class="user-input">
                <Input v-model="login.UserID" placeholder="邮箱/手机/用户名">
                <span slot="prepend"><span class="icon iconfont icon-yonghuming"></span></span>
                </Input>
              </div>
              <div class="user-input" @keyup.enter="commitLogin">
                <Input type="password" v-model="login.UserPwd" placeholder="请输入密码" >
                <span slot="prepend"><span class="icon iconfont icon-mima"></span></span>
                </Input>
              </div>
            </div>
            <div class="user-input">
              <Checkbox v-model="status" @on-change="statusChange">记住密码</Checkbox>
            </div>
            <div class="user-input"><Button type="primary" long @click="commitLogin">登录</Button></div>
          </Col>
        </Row>
    </section>
  <footer class="text-align">
    <div>途优游 | 后台首页</div>
    <div>关于途优游 合作伙伴 联系我们 © 2016-2017 tuyylx.com 版权所有</div>
  </footer>
  </div>
</template>

<script>
import Login from '../actions/login'
import Util from '../commons/util'
export default {
  name: 'index',
  data () {
    return {
      login: {
        UserID: '',
        UserPwd: ''
      },
      userLogin:{
        cmpcode: '',
        userID: '',
        userPwd: '',
        cmpType: 1
      },
      tabActive: true,
      loginWay: 'user',
      self: '',
      util:'',
      status:false
    }
  },
  methods: {
    loginTab ( statuss ) {
      this.tabActive = !this.tabActive
      this.loginWay = statuss
    },
    commitLogin () {
        if ( this.loginWay === 'user' ) {
          this.self.login ( this.userLogin,'/bizLogin.do' ) 
        } else if ( this.loginWay === 'plat' ) {
          this.self.login (this.login,'/sysLogin.do')
        }    
    },
    statusChange () {
      
    }
  },
  mounted () {
    this.self = new Login (this)
    this.util = new Util()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  .login-header,.banner-center{
    width: 1200px;
    margin: 0 auto;
  }
  .logo{
    width: 120px;
    margin: 10px 0;
  }
  .logo img{
    width: 100%;
  }

  .login-banner{
    height:470px;
  }
  .banner-center{

    height:100%;
  }
  .bg-color{
    background: #fd7a72;
  }

  .login-from{
    border-radius: 5px;
    height: 90%;
    background: #ffffff;
  }
  .login-input-title{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin: 40px 0 20px 0;
    letter-spacing:10px;
  }
  .tab-user span{
    font-size: 14px;
    background: #e6e6e6;
    padding: 5px 15px;
    border-radius: 5px;
    margin: 0 5px;
    cursor: pointer;
  }
  .tab-user .active{
    background: #39f;
    color: #ffffff;
  }
  .user-input{
    padding: 20px 40px 0 40px;
  }
  footer{
    padding-top: 50px!important;
  }
</style>
