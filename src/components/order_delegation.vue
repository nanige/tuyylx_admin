<template>
    <div>
        <Row>
            <Col :span="spanLeft" class="left-menu-box">
                <div class="left-menu-madel" v-if="treePanel">
                    <div class="madel-top">
                        <h1><Icon type="android-funnel" style="margin-right:5px;"></Icon>选择产品树</h1>

                        <Button type="text" style="float:right;color:#fff;" @click="treePanel = false"><Icon type="close-round"></Icon></Button>
                    </div>
                    <div class="content" style="background:#fff">
                        <ul>
                            <li v-for="item in menuForLeft" class="lv1" @click="item.isOpen === true ? item.isOpen = false : item.isOpen = true">

                                <span class="plv1" v-on:mouseenter="item.isShow = true" v-on:mouseleave="item.isShow = false">
                                    <Icon type="folder" class="folderlv1"></Icon>
                                    {{item.menuName}}
                                    <Button type="text" class="enterlv1" @click.stop="lv1 (item.menuCode,'dton')" v-show="item.isShow">进入</Button>
                                </span>
                                <ul v-if="item.isOpen">
                                    <li v-for="(item2,index) in item.childList" class="lv2">
                                        <span class="plv1" @click.stop="item2.isOpen === true ? item2.isOpen = false : item2.isOpen = true" v-on:mouseenter.stop="item2.isShow = true" v-on:mouseleave.stop="item2.isShow = false">
                                            <Icon type="folder" class="folderlv1"></Icon>
                                            {{item2.menuName}}
                                            <Button type="text" class="enterlv1" @click.stop="lv2 (item2.menuCode,'lArea')" v-show="item2.isShow">进入</Button>
                                        </span>
                                        <ul v-if="item2.isOpen">
                                            <li v-for="(item3,index) in item2.childList" class="lv3">
                                                <span class="plv1"  @click.stop="item3.isOpen === true ? item3.isOpen = false : item3.isOpen = true" v-on:mouseenter.stop="item3.isShow = true" v-on:mouseleave.stop="item3.isShow = false">
                                                    <Icon type="folder" class="folderlv1"></Icon>
                                                    {{item3.menuName}}
                                                    <Button type="text" class="enterlv1" @click.stop="lv3 (item3.menuCode,'province')" v-show="item3.isShow">进入</Button>
                                                </span>

                                                <ul v-if="item3.isOpen">
                                                    <li v-for="(item4,index) in item3.childList" class="lv4">
                                                        <span class="plv1" @click.stop="item4.isOpen === true ? item4.isOpen = false : item4.isOpen = true" v-on:mouseenter.stop="item4.isShow = true" v-on:mouseleave.stop="item4.isShow = false">
                                                            <Icon type="folder" class="folderlv1"></Icon>
                                                            {{item4.menuName}}
                                                            <Button type="text" class="enterlv1" @click.stop="lv4 (item4.menuCode,'sArea')" v-show="item4.isShow">进入</Button>
                                                        </span>

                                                        <ul v-if="item4.isOpen">
                                                            <li v-for="(item5,index) in item4.childList" class="lv5">

                                                                <span class="plv1" @click.stop="item5.isOpen === true ? item5.isOpen = false : item5.isOpen = true"  v-on:mouseenter.stop="item5.isShow = true" v-on:mouseleave.stop="item5.isShow = false">
                                                                    <Icon type="folder" class="folderlv1"></Icon>
                                                                    {{item5.menuName}}
                                                                    <Button type="text" class="enterlv1" @click.stop="lv5 (item5.menuCode,'city')" v-show="item5.isShow">进入</Button>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="titleLeft">
                    <h1 v-if="titleLeft">产品列表</h1>
                    <Button type="text" class="arrow" @click="changeMenuLeft"><Icon type="arrow-swap"></Icon></Button>
                </div>
                <div class="navLeftChooise" v-if="titleLeft">
                    <Button type="text" @click="openTree">全部</Button>

                    <Button type="text">华南地区</Button>

                    <Button type="text">华北地区</Button>
                </div>
                <div class="circuitList" :style="'overflow-y : '+ scroll">

                    <ul v-if="pruList">
                        <li v-for="item in lineList">
                            <Icon type="social-instagram" class="item-icon"></Icon>
                            <p @click="lineAction (item)">{{item.linename}}</p>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col :span="spanRight">
                <div class="screen" :style="'height:' + height">
                    <Button type="text" class="chevron-down" @click="changeHeightOne"><Icon :type="icon_arrow"></Icon></Button>

                    <div v-if="!tableShow">
                        <p>点击按钮展开条件查询</p>
                    </div>
                    <Form ref="search" v-if="tableShow" :model="search" class="zidingyi" style="margin: 25px 25px 0 0" :label-width="80">
                        <Row>

                            <Col span="7">
                                <Form-item label="目的地:">
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="产品名称:">
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="产品编号:">
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="7">
                                <Form-item label="团号:">
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="开始日期:">
                                    <Date-picker size="small" v-model="search.startDate"  type="date" format="yyyy-MM-dd" @on-change="dateChange" placeholder="选择日期" ></Date-picker>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="结束日期:">
                                    <Date-picker size="small" type="date" placeholder="选择日期" v-model="search.date"></Date-picker>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="7">
                                <Form-item label="关键字:">
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="行程天数:"  >
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="合同类型:"  >
                                    <Select v-model="search.passwd" size="small">
                                        <Option v-for="item in searchs" :key="item"></Option>
                                    </Select>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="7">
                                <Form-item label="关键字:"  >
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="行程天数:"  >
                                    <Input size="small" type="password" v-model="search.passwd"></Input>
                                </Form-item>
                            </Col>
                            <Col span="7" offset="1">
                                <Form-item label="合同类型:"  >
                                    <Select v-model="search.passwd" size="small">
                                        <Option v-for="item in orderData" :key="item"></Option>
                                    </Select>
                                </Form-item>
                            </Col>
                        </Row>
                        <Form-item>
                            <Button size="small" type="primary" @click="searchSubmit()">查询</Button>
                            <Button size="small" type="ghost" @click="searchReset()" style="margin-left: 8px">重置</Button>
                        </Form-item>
                    </Form>
                </div>
                <div class="screen" :style="'height:' + height2">
                    <Button type="text" class="chevron-down" @click="changeHeightTwo"><Icon :type="icon_arrow2"></Icon></Button>
                    <div v-if="!tableShow2">
                        <p>点击按钮展开筛选面板</p>
                    </div>
                    <table v-if="tableShow2">
                        <tr>
                            <td style="width:50px;">价格</td>
                            <td>不限</td>
                            <td>低于500</td>
                            <td>500-1000</td>
                            <td>1000-1500</td>
                            <td>1500-2000</td>
                            <td>2000以上</td>
                        </tr>
                        <tr>
                            <td style="width:50px;">主题</td>
                            <td>不限</td>
                            <td>高铁旅游</td>
                            <td>高铁旅游</td>
                            <td>高铁旅游</td>
                            <td>高铁旅游</td>
                            <td>高铁旅游</td>
                        </tr>
                        <tr>
                            <td style="width:50px;">推广</td>
                            <td>不限</td>
                            <td>非常1+1</td>
                            <td>非常1+1</td>
                            <td>非常1+1</td>
                            <td>非常1+1</td>
                            <td>非常1+1</td>
                            <td>非常1+1</td>
                        </tr>
                        <tr>
                            <td style="width:50px;">销售</td>
                            <td>不限</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                            <td>急推</td>
                        </tr>
                        <tr>
                            <td style="width:50px;">其它</td>
                            <td>不限</td>
                            <td>仅显示可收客户</td>
                        </tr>
                        <tr>
                            <td style="width:50px;">WIFI</td>
                            <td>不限</td>
                        </tr>
                    </table>
                </div>

                <div class="dataContent">
                  <Table stripe  border class="orderList" :columns="orderCol" :data="orderData"></Table>
                  <Page class="orderPage"  :total="total" show-elevator show-total></Page>
                </div>
            </Col>
        </Row>
    </div>

</template>

<script>
    import Util  from '../commons/util'
    import list from '../actions/list'

    export default {
        data () {
            return {
                spanLeft:4,
                spanRight:20,
                titleLeft:true,
                tableShow:true,
                tableShow2:true,
                detailShow:false,
                treePanel:false,
                enter:false,
                pruList:false,
                scroll:'scroll',
                height:'auto',
                total: 0,
                icon_arrow:'chevron-up',
                height2:'auto',
                icon_arrow2:'chevron-up',
                type:'personal',
                type_add:'personal_add',
                orderCol:[{
                    title:'团号',
                    key:'groupno',
                    width:200
                },{
                    title:'团队名称',
                    key:'groupname',
                    width:200
                },{
                    title:'出发日期/星期',
                    key:'startdatestr',
                    width:150
                },{
                    title:'截止日期',
                    key:'enddatestr',
                    width:150
                },{
                    title:'天数',
                    key:'schedulingDay',
                    width:70
                },
                {
                    title:'余位',
                    key:'remainnum',
                    width:70
                },{
                    title:'已售',
                    key:'soldNum',
                    width:70
                },{
                    title:'状态',
                    key:'status',
                    width:80,
                    render: (h,params) => {
                      let rowState = ''

                      switch ( params.row.status ) {
                        case 'O':
                          rowState = '未成团'
                          break
                        case 'T':
                          rowState = '已成团'
                          break
                        case 'H':
                          rowState = '已回团'
                          break
                        case 'P':
                          rowState = '已派团'
                          break
                        default :
                          rowState = ''

                      }

                      return h('span',{

                      },rowState)
                    }
                  },{
                    title:'操作',
                    width:80,
                    align:'center',
                    fixed:'right',
                    render: (h, params) => {
                        let btn = null

                        if ( params.row.status === '') {
                          return
                        }

                        if ( params.row.status === 'O' ) {
                          btn = h('Button', {
                            props: {
                              type: 'success',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            },
                            on: {
                              click: () => {
                                console.log(params.row.status)
                              }
                            }
                          }, '派团')
                        } else {
                          btn = h('Button', {
                            on: {
                              click: () => {
                                this.$router.push({ path: '/index/order_detail', query:{ groupno: params.row.groupno,docentry: params.row.docentry, linecode: params.row.linecode} })
                              }
                            }
                          }, '详情')
                        }



                        return btn;
                    }
                }],
                search:{
                    startDate:'',
                    passwd:'',
                    date:''
                },
                searchs:[],
                orderData:[],
                searchData1:'',
                searchData2:'',
                value:'',
                checkList:[
                    { text:'客户名称' },
                    { text:'客户名称' },
                    { text:'客户名称' },
                    { text:'客户名称' }
                ],
                personalCol:[
                    { title:'客户编号 '},
                    { title:'客户名称 '},
                    { title:'客户类型 '},
                    { title:'客户等级 '},
                    { title:'客户特征 '},
                    { title:'证件类型 '},
                    { title:'证件号码 '},
                    { title:'手机号码 '}
                ],
                enterpriseCol:[
                    { title:'客户编号 '},
                    { title:'客户名称 '},
                    { title:'公司电话 '},
                    { title:'公司传真 '}
                ],
                customer:false,
                pAddData:[],
                eAddData:[],
                areaNumList:[
                    { val:'0086',text:'0086' },
                    { val:'00852',text:'00852' },
                    { val:'00886',text:'00886' },
                    { val:'0091',text:'0091' },
                    { val:'0081',text:'0081' },
                    { val:'0082',text:'0082' },
                    { val:'0065',text:'0065' },
                    { val:'0066',text:'0066' }
                ],
                menuForLeft:[],
                lineList:[]
            }
        },
        methods: {
            changeMenuLeft () {
                if ( this.spanLeft === 4) {
                    this.spanLeft = 1
                    this.spanRight = 22
                    this.titleLeft = false
                    this.scroll = ''
                } else {
                    this.spanLeft = 4
                    this.spanRight = 20
                    this.titleLeft = true
                    this.scroll = 'scroll'
                }
            },
            changeHeightOne () {

                if ( this.height === 'auto') {
                    this.height = '40px'
                    this.tableShow = false

                    this.icon_arrow = 'chevron-down'
                } else {
                    this.height = 'auto'
                    this.tableShow = true
                    this.icon_arrow = 'chevron-up'
                }

            },
            changeHeightTwo ( ) {
                if ( this.height2 === 'auto') {
                    this.height2 = '40px'
                    this.tableShow2 = false

                    this.icon_arrow2 = 'chevron-down'
                } else {
                    this.height2 = 'auto'
                    this.tableShow2 = true
                    this.icon_arrow2 = 'chevron-up'
                }
            },
            dateChange (date) {
               this.search.startDate = date
            },
            searchSubmit () {

            },
            searchReset() {

            },
            toDetail () {
                this.$router.push({ path: '/index/order_detail'})
            },
            openList () {
                this.detailShow = true
            },
            add () {
                this.customer = true
            },
            toReservation ( code , no , db ) {
                this.$router.push({ path: '/index/order_reservation', query: { lineDBname:code,groupno:no,dbName: db} })
            },
            openTree () {
                this.treePanel === false ? this.treePanel = true : this.treePanel = false
                list.allLeftMenu (this)
            },
            lv1 ( code,type ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv2 ( code,type ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv3 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv4 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv5 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lineAction ( data ) {
                list.searchOrder( this, { linecode:data.linecode, dbName: data.dbName })
            }
        }
    }
</script>


<style lang="less">

    .left-menu-box {
        border: 1px solid #dddee1;
        height: 700px;
        position:relative;

        .titleLeft {

            h1 { float:left; font-weight:400; font-size: 14px;margin: 5px 0 0 10px; color:#fff; }
            .arrow {
                float:right;
                color:#fff;
            }
            width:100%;
            height:30px;
            background:#19be6b;
        }

        background:#fff;
    }

    .ivu-col{
        transition: width .2s ease-in-out;
    }

    .navLeftChooise {
        display:flex;
        border-bottom:1px solid #dddee1;
        width:100%;

    }
    .circuitList {
        li {
            padding: 5px 0 5px 20px;
            position:relative;
            border-bottom: 1px solid #e9eaec;
        }
        height:630px;
        padding: 0 5px;

        .item-icon {
            position:absolute;
            color:#19be6b;
            top:10px;
            left:5px;
        }
    }

    .screen {
        border: 1px solid #dddee1;
        margin-left: 15px;
        padding: 10px 20px;
        position:relative;
        margin-bottom:20px;
        background:#fff;

        td {
            padding: 2px 10px;
        }

        .chevron-down {
            position:absolute;
            right:15px;
            top:5px;
        }
    }
    .contentTable {
        table { width: 100%!important; }
    }
    .dataContent {
        padding-left: 15px;
    }

    .tableMadal {
        .ivu-modal-header {
            padding: 5px 16px!important;
        }

        .ivu-icon-ios-close-empty {
            top:-6px!important;
        }

    }

    .listSearch {
        border:1px solid #dddee1;
        padding: 5px 13px;
        margin: 15px 0;
        h1 {
            font-weight:400;
            font-size:14px;
        }
    }
    .tiaoJian {
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .zidingyi {
        .ivu-form-item {
            margin-bottom:10px!important;
        }
    }

    .ivu-modal-content {
        border-radius: 0!important
    }

    .left-menu-madel {
        width:300px;
        height:635px;
        background:#fff;
        position:absolute;
        bottom:0;
        border:1px solid #dddee1;
        z-index:2;


        .madel-top {
            background:#19be6b;
            overflow:hidden;

            h1 {
                font-weight:400;
                font-size:14px;
                color:#fff;
                float: left;
                margin:6px 0 0 15px;
            }
        }
    }

    .lv1 {
        padding-left:25px;
        font-size: 13px;

        .plv1 {
            position: relative;
            cursor: pointer;
        }

        .enterlv1 {
            position: absolute;
            top:-8px;
            right: -45px;
        }

        .folderlv1 {
            position: absolute;
            top:1px;
            left: -15px;
            color:#19be6b;
        }

        .lv2 {
            padding-left:20px;

            .lv3 {
                padding-left:20px;

                .lv4 {
                    padding-left:20px;

                    .lv5 {
                        padding-left:20px;

                    }
                }

            }
        }
    }
    .orderList {
      .ivu-table-cell {
        white-space: nowrap;
      }


    }
    .orderPage {
      float: right;
      margin: 10px 0;
    }

    .clearPadding {}
</style>
