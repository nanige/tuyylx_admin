<template>
    <div>
      <div class="header">
        <div class="logo fl">
          <img src="../assets/images/logo.png" style="width:100px;height:29px" alt="">
        </div>
        <div class="header-menu fl header-menu-bg" style="position: relative">
          <ul class="header-ul">
            <li v-for="item in menu" @click="clickHeadMenu(item.menuCode)" >
              <a href="javascript:;" >
                {{item.menuDesc}}
              </a>
              <div class="line"></div>
            </li>
          </ul>
        </div>
        <div class="header-menu fr">
          <ul>
            <li class="cmpList">
              <a href="javascript:;" v-on:mouseenter="cmpNameShow = true" v-on:mouseleave="cmpNameShow = false">{{cmpName}}</a>
            </li>

            <li>
              <a href="javascript:;">
                <Icon type="ios-bell-outline" size="20" class="msgIcon"></Icon>
                <span class="msgNum">{{megData.length}}</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="logout">
                退出
              </a>
            </li>
          </ul>
        </div>
        <div class="cmpName" v-if="cmpNameShow">{{cmpName}}</div>
      </div>
      <div class="content">
        <div class="menu fl">
          <div class="menu-icon text-align">
            <Input placeholder="站内搜索">
              <Button slot="append" icon="ios-search"></Button>
            </Input>
          </div>
          <!--<Menu class="menu-bg"  id="menu-ul" @on-open-change="test">
            <Submenu :name="item.menuDesc" v-for="item in menuTwo" :key="item">
              <template slot="title">

                {{item.menuDesc}}
              </template>
              <Menu-item :name="item.menuDesc" v-for="item in item.childMenuList" :key="item" class="menu-four" >
                <a :href="url + item.urlcode">{{item.menuDesc}}</a>
                <div v-if="item.menuDesc == ''">
                  <a href="#">abc</a>
                </div>
              </Menu-item>
            </Submenu>
          </Menu>-->
          <ul class="menu-bg" id="menu-ul">
            <li v-for="(item,index) in menuTwo" :key="item" class="menu_lv2">
              <p class="menu_desc1" @click="menuTwoToggle (item,index)">
                <Icon :type="item.icon" style="width: 10px;margin-right:10px"></Icon>
                <!--<span class="iconfont">{{item.icon}}</span>-->
                 {{item.menuDesc}}
                <Icon v-if="item.isLogo === 0" class="menu_chevron" :type="item.arrow"></Icon>
              </p>
              <ul v-if="item.islast">
                <li v-for="item2 in item.childMenuList" :key="item2" class="menu_lv3" @click.stop="menuTree (item2)">
                  <p class="menu_desc2">
                    {{item2.menuDesc}}
                    <Icon v-if="item2.isLogo === 0" class="menu_chevron2" :type="item2.arrow"></Icon>
                  </p>

                  <ul v-if="item2.islast">
                    <li v-for="item3 in item2.childMenuList" class="menu_lv4" @click.stop="menuFour (item3)">
                      <p class="menu_desc3">
                        {{item3.menuDesc}}
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
          <!--<div class="headerMenu">
            <ul>
              <li v-for="(item,index) in topMenu">{{item.text}} <Button type="text" class="close-empty" @click="closeTab (index)">
              <Icon type="ios-close-empty"></Icon></Button></li>
            </ul>
          </div>-->
          <div class="content-main">
            <router-view></router-view>
            <!--<Tabs type="card" closable @on-tab-remove="handleTabRemove" :animated="false">
              <Tab-pane v-for="item in tab" :key="item" :label="item.label">
                <department v-if="item.html === 'department'"></department>
                <operator v-if="item.html === 'operator'"></operator>
                <order v-if="item.html === 'order'"></order>
              </Tab-pane>
          </Tabs>-->
          </div>
      </div>
      <div class="loading-bg">
        <img src="../assets/images/loading.gif">
      </div>
    </div>
</template>
<script>
  import $ from 'jquery'
  import Action from '../actions/action'
  import Login from '../actions/login'
  import Config from '../config/config'

  import department from '../components/department.vue'
  import operator from '../components/operator.vue'
  import order from '../components/order.vue'
  export default {
    components: {
      department,
      operator,
      order
    },
    data () {
      return {
        url: 'http://localhost:8081/#',
        apiStr: '',
        self: '',
        cmpName: '',
        userType: '',
        userID: '',
        menu: [],
        menuTwo: [],
        userName: '',
        lv3: false,
        cmpNameShow: false,
        tab: [],
        tabLocation: 0,
        menuCodeArr: [],
        topMenu: [],
        megData:[]
      }
    },
    mounted () {
      const that = this
      this.self = new Action (this)
      this.apiStr = new Config().getApi().replace('http','ws')

      this.self.getMenu ()
      this.userName = this.$route.query.name
      let bodyHeight = document.documentElement.clientHeight

      this.$http({
        method: 'post',
        url: new Config().getApi() + '/biz/Oinf/list.do'
      }).then( res => {
        this.megData = res.data.rows
      })



      document.getElementById('menu-ul').style.minHeight = bodyHeight - 84 + 'px'
      setTimeout(function () {
        $(document).ready(function () {
          //顶部菜单
          let headerLis = $('.header-ul li')
          headerLis.click(function () {
            $(this).siblings().removeClass('active')
            $(this).addClass('active')
          })
          $('.loading-bg').hide()
        })
      }, 500)

      this.$Message.config({
        top: 50,
        duration: 3
      })

      var websocket = new WebSocket(this.apiStr + "/tuyy.do?cmpID=" + this.$cookie.get('cmpID') +
      "&orleCode=" + this.$cookie.get('orleCode') + "&userID=" + this.$cookie.get('userID'));

         websocket.onerror = (event) => {
           console.log("WebSocket:发生错误 ")
         }

          websocket.onopen = (event) => {
           console.log("WebSocket:已连接")
         }

          websocket.onclose = (event) => {
           console.log("WebSocket:已关闭")
         }

          websocket.onmessage = (event) => {
              let datas = JSON.parse(event.data)
              that.$Message.info(datas.infomemo)

              this.$http({
                method: 'post',
                url: new Config().getApi() + '/biz/Oinf/list.do'
              }).then( res => {
                this.megData = res.data.rows
              })
          }

      this.userID = this.$cookie.get('userID')
      this.cmpName = this.$cookie.get('cmpName')
    },
    methods: {
      logout () {
        this.self = new Login(this)
        this.self.userExt ()
      },
      clickHeadMenu (code) {
        for (let value of this.menu.entries()) {
          if (value[1].menuCode == code) {
            this.menuHeaderClass = true
            this.menuTwo = value[1].childMenuList
          }
        }
      },
      menuTwoToggle (item, index) {
        item.islast === 0 || item.islast === false ? item.islast = true : item.islast = false
        item.arrow === 'chevron-down' ? item.arrow = 'chevron-up' : item.arrow = 'chevron-down'
        if (item.urlcode !== '') {
          this.$router.push({ path: item.urlcode, query: { menuCode: item.menuCode } })
        }
      },
      menuTree (item) {
        /* if (!item.checked) {
           this.topMenu.push({
             label: item.menuCode,
             text: item.menuDesc
           })

           item.checked = true
         }*/

        item.islast === 0 || item.islast === false ? item.islast = true : item.islast = false
        item.arrow === 'chevron-down' ? item.arrow = 'chevron-up' : item.arrow = 'chevron-down'
        if (item.urlcode !== '') {
          this.$router.push({ path: item.urlcode, query: { menuCode: item.menuCode }})
        }
      },
      menuFour (item) {
        if (item.urlcode !== '') {
          this.$router.push({ path: item.urlcode, query: { menuCode: item.menuCode } })
        }
      },
      handleTabRemove (index) {
        this.tab.splice(index, 1)
        this.menuCodeArr.splice(index, 1)
      },
      closeTab (index) {
        this.topMenu.splice(index, 1)
        this.menuTwo[index].checked = false
      }
    }
  }
</script>
<style lang="less">

    .header {
      width: 100%;
      position: fixed;
      top:0;
      left:0;
      background:#441471;
      height: 50px;
      z-index: 100;
      .logo {
        width:240px;
        padding: 8px 20px;
        margin:0;
      }
      .header-ul{
        font-size: 15px;
      }
      .header-menu {
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 50px;
        ul{
          li{
            position: relative;
            padding: 0 15px;
            float:left;
            a{
              color:#ffffff;
              display: inline-block;
            }
            .line{
              height: 20px;
              width: 1px;
              background: #ffffff;
              position: absolute;
              right: 0px;
              top: 15px;
            }
            &:last-child {
              .line{
                display: none;
              }
             }
          }
        }
      }
      .header-menu-bg{
        background: #955ccb;
        li{
          width: 100px;
          padding: 0px!important;
          transition: all .3s;
        }
        li:hover{
          background: #fcc929;
          a{
            color: #fff!important;
          }
        }
        .active{
          border-top:2px solid #955ccb;
          background:#fcc929;
          color:#fff;
          height: 50px;
          font-weight:16px;
          a{
            color:#fff;
          }
        }
      }
    }
    .content{
      width: 100%;
      position: absolute;
      top: 50px;
      left:0;
      background:#f8f8f9;
      overflow: hidden;
      .menu-bg{
        padding-bottom: 100px;
        background: #2E1F3E!important;
        li{
          .ivu-menu-submenu-title{
            color: #fff!important;
            &:hover{
               background: #00c1de!important;
             }
          }
          ul{
            .ivu-menu-item-active{
              color: #fff!important;
              background: #00c1de;
              border-right: none!important;
            }
          }
          ul > li{
            padding: 0!important;
            a{
              color: #fff!important;
              display: block;
              padding: 14px 0px 14px 50px;
            }
            /*&:hover{
               background: #00c1de!important;
            }*/
          }
        }
      }
      .menu{
        position: fixed;
        left: 0;
        top: 50px;
        z-index: 99;
        max-width: 240px;
        width: 240px;
        height: 100%;
        overflow: auto;
        .menu-icon{
          padding: 6px 10px;
          background: #955ccb;
          overflow: hidden;
        }
        .menu-four{
          position: relative;
          div{
            width: 240px;
            height: 100%;
            position: absolute;
            top:0;
            right:-240px;
            z-index: 9999;
            display: none;
            background: #5ed1e0;
            &:hover{
              background: #5ed1e0;
              color: #fff!important;
            }
            a{
              color: #fff;
            }
          }
          &:hover > div {
            display: block;
          }
        }
      }
      .content-main{
        width: 84.85%;
        height: 100%;
        overflow: hidden;
        margin-left: 240px;
        padding:10px;
        .tab-main{
          position: relative;
          ul{
            width: 100%;
            position: absolute;
            top:0;
            left:0;
            height: 30px;
            z-index:9;
            li{
              cursor:pointer;
              /*border-radius:3px;*/
              line-height:30px;
              height: 100%;
              padding:0 30px;
              margin:1px 0px;
              float:left;
              border-top:1px solid #ccc;
              border-left: 1px solid #ccc;
              border-right: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              background: #f5f7f9;
              position: relative;
              .iconfont{
                width: 15px;
                height: 15px;
                line-height: 18px;
                text-align: center;
                border-radius: 50%;
                position: absolute;
                right: 5px;
                top: 3px;
                font-size: 18px;
                &:hover{
                   background: #f17c77;
                   color:#fff;
                }
              }
            }
            .active{
              border-top: 2px solid #955ccb;
              border-bottom: 1px solid #fff;
              background: #fff;
            }
          }
          .tab-content > div{
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            background: #fff;
            display: none;
          }
        }



      }

      .headerMenu {
          margin: 0 0 20px 240px;
          overflow:hidden;
          ul {
            background: #5cadff;
            width: 100%;
            height: 30px;

            li {
              position: relative;
              width: 80px;
              padding-top: 6px;
              padding-left: 10px;
              background: #3091f2;
              height:100%;
              color: #fff;
              display:inline-block;
              margin-right: 1px;

              .close-empty {
                position: absolute;
                top:0px;
                right:-6px;
                color: #fff;
              }
            }
          }
        }
      .loading-bg{
        position: fixed;
        left:0px;
        top:0px;
        background: rgba(0,0,0,.7);
        width: 100%;
        height: 100%;
        z-index: 999;
        img{
          position: absolute;
          left:50%;
          top:40%;
          margin: auto;
        }
      }
    }
    .ivu-modal-header {
      background: rgb(149, 92, 203);
      text-align:center;
    }
    .title {
      font-size: 16px;
      color: #fff!important;
      letter-spacing: 3px;
      font-style: normal;
      text-align:center;
    }
    .Modal .ivu-icon-ios-close-empty {
      color: #fff!important;
      font-weight: 900!important;
      border-color:none!important;
    }
    .ivu-btn-primary-ken {
      background-color:#955ccb!important;
      border-color:#955ccb!important;
    }
    .tableCenter {
      text-align:center!important;
    }
    .ivu-table th {
      background:#dddee1!important;
    }
    .ivu-radio-checked .ivu-radio-inner {
      border-color:#955ccb!important;
    }
    .ivu-radio-inner:after {
      border-color:#955ccb!important;
      background-color:#955ccb!important;
    }
    .router-link-active{
       background: #00c1de!important;
       color: #fff!important;
     }


    .menu_lv2 {
      .menu_desc1 {
        color:#fff;
        padding: 10px 0 10px 20px;
        position: relative;
        .menu_chevron {
          position: absolute;
          right: 20px;
          top: 15px;
        }

      }
      .menu_desc1:hover {
        cursor: pointer;
        background: #fcc929
      }
      /*.menu_desc1:hover {
        background: #00c1de;
      }*/
      .menu_desc2:hover {
        cursor: pointer;
        background: #fcc929
      }
      .menu_desc2 {
        color:#fff;
        padding: 10px 0 10px 50px;
        position: relative;


        .menu_chevron2 {
          position: absolute;
          right: 20px;
          top: 15px;
        }
      }

      .menu_lv4 {
        .menu_desc3 {
          color:#fff;
          padding: 10px 0 10px 65px;
          position: relative;
        }
        .menu_desc3:hover {
          cursor: pointer;
          background: #fcc929
        }
      }
    }
    .msgIcon {
      position: relative;
      top: 2px;
    }
    .msgNum {
      background: #fcc929;
      padding: 2px 10px;
      border-radius: 5px;
      text-align: center;
    }

  .cmpList {
    width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .cmpName {
    position: absolute;
    right: 144px;
    bottom: -28px;
    background: #955ccb;
    color: #fff;
    padding: 5px 10px;
  }
</style>
