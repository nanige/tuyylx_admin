
<template>
    <div>
        <div class="content-panel">
            <div class="header-panel">
                <h1>基本信息</h1>
                <Button type="text" class="right-btn" @click="togglePanel ('base')"><Icon :type="'chevron-' + baseDire"></Icon></Button>
            </div>

          <div class="table_panel" v-if="BaseIsShow">
            <ul>
              <li><span style="font-weight: 600">团名称：</span> {{orderData.groupname}}</li>
              <li><span style="font-weight: 600">线路名称：</span> {{orderData.linename}}</li>
              <li><span style="font-weight: 600">销售渠道：</span> {{orderData.venName}}</li>
              <li><span style="font-weight: 600">团号：</span> {{orderData.groupno}}</li>
              <li><span style="font-weight: 600">线路编号：</span> {{orderData.linecode}}</li>
              <li><span style="font-weight: 600">出发日期：</span> {{orderData.startdatestr}}</li>
              <li><span style="font-weight: 600">线路类型：</span> {{orderData.natureName}}</li>
            </ul>
          </div>
        </div>

        <!--<div class="content-panel">
            <div class="header-panel">
                <h1>应收账款</h1>

                <Button type="text" class="right-btn"><Icon type="chevron-up"></Icon></Button>
            </div>

            <div class="table_panel">
                <table>
                    <tr>
                        <td>应收款：58596.00 元</td>
                        <td>实收款：14097.00元</td>
                        <td>待收款：44499.00元</td>
                        <td>第三方补贴款：0.00 元</td>
                        <td>可兑换积分：0分( 0元)</td>
                    </tr>
                    <tr>
                        <td>应退款：0.00 元</td>
                        <td>已退款：0.00 元</td>
                        <td colspan="3">待退款：0.00元</td>
                    </tr>
                </table>
            </div>
        </div>-->
        <div class="content-panel">
            <div class="header-panel">
                <h1>价格清单</h1>

                <Button type="text" class="right-btn" @click="togglePanel ('price')"><Icon :type="'chevron-' + priceDire"></Icon></Button>
            </div>

            <div class="table_panel" v-if="PriceIsShow">
                <table border style="width:60%;margin:0 auto;text-align:center">
                    <tr>
                        <td class="tableHeader"></td>
                        <td class="tableHeader">成人</td>
                        <td class="tableHeader">婴儿</td>
                        <td class="tableHeader">儿童</td>
                    </tr>
                    <tr>
                        <td class="tableHeader">销售价</td>
                        <td>{{pricePanel.saleprice}}元</td>
                        <td>{{pricePanel.oldsaleprice}}元</td>
                        <td>{{pricePanel.childsaleprice}}元</td>
                    </tr>
                    <tr>
                        <td class="tableHeader">同行价</td>
                        <td>{{pricePanel.peerprice}}元</td>
                        <td>{{pricePanel.oldpeerprice}}元</td>
                        <td>{{pricePanel.childpeerprice}}元</td>
                    </tr>
                    <tr>
                        <td class="tableHeader">结算价</td>
                        <td>{{pricePanel.purprice}}元</td>
                        <td>{{pricePanel.oldpurprice}}元</td>
                        <td>{{pricePanel.childpurprice}}元</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content-panel">
            <div class="header-panel">
                <h1>游客信息</h1>

                <Button type="text" class="right-btn" @click="togglePanel ('tour')"><Icon :type="'chevron-' + tourDire"></Icon></Button>
            </div>

            <div class="info-panel" v-if="TourIsShow">
                <div class="info-header" style="text-align:right">
                    <p>人数：{{personNum}}</p>
                </div>
                <div>
                    <Table border :columns="touristCol" :data="touristData"></Table>
                </div>
                <div class="orderDetail">
                    <div style="margin-top: 10px">
                        <p>订单总额：<span class="price pSum">￥{{rentalSum}} </span>(套餐总价 <span class="price">¥{{comboSum}}</span>  ＋ 加房差 <span class="price">¥{{addroomamtSum}}</span> － 减房差 <span class="price">¥{{dowmroomamtSum}}</span> ＋
                            附加产品 <span class="price">¥{{subjoin}}</span>   － 销售优惠 <span class="price">¥{{sellPre}}</span>)</p>
                    </div>
                </div>
                <!-- ＋ 导游服务费 <span class="price">¥110</span> －
                            订单优惠 <span class="price">¥0</span>

                    ＋保险 <span class="price">¥{{insurancePrice}}</span>
                -->
            </div>
          <Modal v-model="subjoinShow" width="434">
            <p slot="header" style="color:#fff;">
              <span>附加产品</span>
            </p>
            <div style="text-align:center">
              <Table :columns="subjoinCol" :data="subjoinData"></Table>
            </div>
            <div slot="footer" class="text-align">
              <Button type="success" size="large" @click="subjoinShow = false">关闭</Button>
            </div>
          </Modal>
        </div>
    </div>
</template>

<script>
    import Action from '../actions/action'
    import Util from '../commons/util'
    import list from '../actions/list'
    import Config from '../config/config'
    export default {
        data () {
            return {
                file:'',
                self:'',
                util:'',
                personNum:1,
                occupied:0,
                occPersons:0,
                surplus:20,
                TourIsShow:true,
                BaseIsShow:true,
                PriceIsShow:true,
                liangxiren:true,
                subjoinShow: false,
                baseDire:'up',
                priceDire:'up',
                tourDire:'up',
                touristCol:[
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    { title: '姓名', key:'visitor' },
                    { title: '手机', key:'mobile' },
                    { title: '附加产品', key:'itemdesc',
                        render: (h, params) => {
                            return h('Button',{
                                props: {
                                    type: 'text',
                                },
                                on: {

                                  click : () => {
                                    this.subjoinShow = true

                                    this.subjoinData = params.row.rdr11ModelList
                                    console.log(params.row.rdr11ModelList)
                                  }
                                }
                            }, '查看附加产品')
                        }
                    }
                ],
                subjoinCol: [
                  { title: '编号', key: 'projectcode',width: 80},
                  { title: '名称', key: 'newproname', width: 240,
                    render: (h, params) => {
                       return h('span',{
                         style: {
                           width: '230px',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           whiteSpace: 'nowrap'
                         },
                       }, params.row.newproname)
                    }
                  },
                  { title: '价格(元)', key: 'price',width: 80}
                ],
                subjoinData:[],
                touristData:[],
                ksPerson:'',
                addTourist:false,
                celerity:false,
                occupiedShow:false,
                addTouristData:{
                    visitor:'',
                    sex:'1',
                    visitortype:'1',
                    visitorid:'',
                    mobile:'',
                    tel:'321',
                    rdr11ModelList:[]
                },
                orderData:{},
                additionalList:[],
                additional:[],
                Tcontent:{},
                personNum:0,
                rentalSum:0,         //总额
                serviceCharge:110,   //导游服务费单价
                serviceChargeSum:0,  //导游服务费总额
                salesPrice:0,        //销售价
                tradePrice:0,        //同行价
                purprice:0,          //结算价
                insurancePrice:0,    //保险
                addroomamt:0,        //加房差
                addroomamtSum:0,     //加房差总金额
                dowmroomamt:0,       //减房差
                dowmroomamtSum:0,    //减房差总金额
                subjoin:0,           //附加产品
                orderPre:0,          //订单优惠
                sellPre:0,           //销售优惠
                comboSum:0,          //套餐总价
                orderSubmit:{},
                pricePanel:{}
            }
        },
        methods: {

            downModel () {
                let api = new Config().getApi()
                location.href= api + '/biz/ordr/exportExcelTemplate.do'
            },


            togglePanel (auth) {
                switch(auth) {
                    case 'base':
                        this.BaseIsShow === false ? this.BaseIsShow = true : this.BaseIsShow = false
                        this.baseDire === 'up' ? this.baseDire = 'down' : this.baseDire = 'up'
                        break
                    case 'price':
                        this.PriceIsShow === false ? this.PriceIsShow = true : this.PriceIsShow = false
                        this.priceDire === 'up' ? this.priceDire = 'down' : this.priceDire = 'up'
                        break
                    case 'tour':
                        this.TourIsShow === false ? this.TourIsShow = true : this.TourIsShow = false
                        this.tourDire === 'up' ? this.tourDire = 'down' : this.tourDire = 'up'
                        break
                }
            },
            youhui () {
                this.rentalSum = this.comboSum + this.addroomamt - this.dowmroomamt + this.subjoin - this.sellPre
            }
        },
        mounted () {
            this.util = new Util()
            this.self = new Action( this )

            list.getOrderEdit (this, { docentry:  this.$route.query.docentry})
            list.getPriceSpread ( this, { linecode:  this.$route.query.linecode})
            list.getAdditional ( this )
        }
    }
</script>


<style lang="less">
   .a {
     overflow: hidden;
   }
</style>
