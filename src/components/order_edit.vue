
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
                        <td >{{pricePanel.saleprice}}元</td>
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


                    <Button type="success" @click="addTourist = true"><Icon type="person-add"></Icon>  添加游客</Button>
                    <Button type="success" >导入游客</Button>
                    <Button type="success" @click="celerity = true">快速导入</Button>
                    <Button type="success" @click="occupiedShow = true">占位</Button>
                    <Button type="success" @click="downModel">点击下载模板</Button>

                    <Modal v-model="addTourist" width="360">
                        <p slot="header" style="color:#fff;">
                            <span>添加一位游客</span>
                        </p>
                        <div style="width:300px">
                            <Form ref="addTouristData" :model="addTouristData" :label-width="80">
                                <Form-item label="姓名：" prop="visitor">
                                    <Input type="text" v-model="addTouristData.visitor"></Input>
                                </Form-item>
                                <Form-item label="性别：" prop="sex">
                                    <Radio-group v-model="addTouristData.sex">
                                        <Radio label="1">男</Radio>
                                        <Radio label="0">女</Radio>
                                    </Radio-group>
                                </Form-item>
                                <Form-item label="证件：" prop="visitortype">
                                    <Select v-model="addTouristData.visitortype" placeholder="">
                                        <Option value="1">身份证</Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="证件号：" prop="visitorid">
                                    <Input v-model="addTouristData.visitorid" placeholder=""></Input>
                                </Form-item>
                                <Form-item label="手机号：" prop="mobile">
                                    <Input v-model="addTouristData.mobile" placeholder=""></Input>
                                </Form-item>
                                <!--
                                <Form-item label="购买保险：" prop="tName">
                                    <Radio-group v-model="addTouristData.insurance">
                                        <Radio label="1">是</Radio>
                                        <Radio label="0">否</Radio>
                                    </Radio-group>
                                </Form-item>-->

                                <Form-item label="附加产品：" prop="phone">
                                    <Select v-model="additional" multiple @on-change="chooseProduct">
                                        <Option v-for="item in additionalList" :value="item.itemcode +'-'+ item.price + '-' + item.intemdesc" :key="item">
                                            ￥{{item.price}}-{{ item.intemdesc }}
                                        </Option>
                                    </Select>
                                </Form-item>

                                <Form-item label="房差：" prop="phone">
                                    <Row>
                                        <Col span="11">
                                            加：<Input-number :min="0" v-model="addroomamt" style="width:50px;"></Input-number>
                                            元
                                        </Col>
                                        <Col span="11" offset="2">
                                            减：<Input-number :min="0" v-model="dowmroomamt" style="width:50px;"></Input-number>元
                                        </Col>
                                    </Row>
                                </Form-item>
                            </Form>
                        </div>
                        <div slot="footer" class="text-align">
                            <Button type="success" size="large" @click="addTouristOk ('addTouristData')">保存</Button>
                        </div>
                    </Modal>

                    <Modal v-model="celerity" width="560">
                        <p slot="header" style="color:#fff;">
                            <span>快速录入游客</span>
                        </p>
                        <div>
                            <p style="margin: 15px 0; text-align:center;color:#ed3f14">(导入格式：一人一行，身份(成人A、儿童C、老人O)+姓名+证件号码+手机号码) <br>
                                例如：A+小宇+42011248465474156584+13200548811
                            </p>
                            <Input type="textarea" :rows="5" v-model="ksPerson" placeholder=""></Input>
                        </div>
                        <div slot="footer" class="text-align">
                            <Button type="success" size="large" @click="celerityVt (ksPerson)">保存</Button>
                        </div>
                    </Modal>
                    <Modal v-model="occupiedShow" width="260">
                        <p slot="header" style="color:#fff;">
                            <span>输入占位</span>
                        </p>
                        <div style="text-align:center">
                           <Input-number v-model="occPersons" :max="surplus" :min="0"></Input-number>
                        </div>
                        <div slot="footer" class="text-align">
                            <Button type="success" size="large" @click="occSubmit(occPersons)">保存</Button>
                        </div>
                    </Modal>
                </div>
                <div>
                    <Table border :columns="touristCol" :data="touristData"></Table>
                </div>
                <div class="orderDetail">
                    <div>
                        <p>销售优惠：<Input-number :max="1400" :min="0" v-model="sellPre" size="small" @on-change="youhui"></Input-number><br> (最高优惠：￥1400)</p>
                        <p>订单总额：<span class="price pSum">￥{{rentalSum}} </span>(套餐总价 <span class="price">¥{{comboSum}}</span>  ＋ 加房差 <span class="price">¥{{addroomamtSum}}</span> － 减房差 <span class="price">¥{{dowmroomamtSum}}</span> ＋
                            附加产品 <span class="price">¥{{subjoin}}</span>   － 销售优惠 <span class="price">¥{{sellPre}}</span>)</p>
                    </div>
                </div>
                <!-- ＋ 导游服务费 <span class="price">¥110</span> －
                            订单优惠 <span class="price">¥0</span>

                    ＋保险 <span class="price">¥{{insurancePrice}}</span>
                -->
            </div>

            <div class="text-align" style="margin-top:30px;">
                <Button type="success" @click="orderCommit">提交订单</Button>
            </div>
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
                    { title: '附加产品', key:'subjoin',
                        render: (h, params) => {
                            return h('Button',{
                                props: {
                                    type: 'text',
                                },
                            }, '查看附加产品')
                        }
                    },
                    {
                        title: '操作',
                        key:'Action',
                        width:220,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.setContacts (params.index)
                                        }
                                    }
                                }, '设为联系人'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeTourist (params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeTourist (params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
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
            addTouristOk (name) {
                this.addTourist = false
                let str = JSON.stringify(this.addTouristData)
                this.touristData.push(JSON.parse(str))

                this.personNum = this.touristData.length

                this.comboSum = this.pricePanel.saleprice * this.personNum

                this.addroomamtSum = this.touristData.length * this.orderData.addroomamt

                this.dowmroomamtSum = this.touristData.length * this.orderData.dowmroomamt

                this.rentalSum = this.comboSum + this.addroomamt - this.dowmroomamt + this.subjoin - this.sellPre

                this.touristData.forEach( el => {

                    el.rdr11ModelList.forEach( el2 => {
                        this.subjoin = this.subjoin + parseFloat(el2.price)
                        this.rentalSum = this.rentalSum + this.subjoin
                    })
                })

                this.$refs[name].resetFields()
            },
            celerityVt( str ) {
                let arr = new Array()
                arr = str.split("\n")

                arr.forEach( el => {
                    let elArr = el.split("+")

                    this.touristData.push({
                        visitor:elArr[1],
                        visitorid:elArr[2],
                        mobile:elArr[3],
                        visitortype:'1'
                    })
                })

                this.$Notice.success( { title: '导入成功' } )
                this.celerity = false

                this.personNum = this.touristData.length


                this.comboSum = this.pricePanel.saleprice * this.personNum

                this.addroomamtSum = this.touristData.length * this.orderData.addroomamt

                this.dowmroomamtSum = this.touristData.length * this.orderData.dowmroomamt

                this.rentalSum = this.comboSum + this.addroomamtSum - this.dowmroomamtSum + this.subjoin - this.sellPre
            },
            occSubmit (num) {
                for(let i = 0; i < num; i++) {
                    this.touristData.push({
                        tName:'占位',
                        authType:'1',
                        insurance:'0',
                        spread:'无',
                        subjoin:'无',
                    })
                }
                this.$Notice.success( { title: '占位成功' } )
                this.occupiedShow = false

                this.personNum = this.touristData.length

                this.addroomamtSum = this.touristData.length * this.orderData.addroomamt

                this.dowmroomamtSum = this.touristData.length * this.orderData.dowmroomamt

                this.comboSum = this.pricePanel.saleprice * this.personNum

                this.rentalSum = this.comboSum + this.addroomamtSum - this.dowmroomamtSum + this.subjoin - this.sellPre
            },
            downModel () {
                let api = new Config().getApi()
                location.href= api + '/biz/ordr/exportExcelTemplate.do'
            },
            removeTourist ( index ) {
                this.touristData.splice(index, 1)

                this.personNum = this.touristData.length

                this.comboSum = this.pricePanel.saleprice * this.personNum

                this.rentalSum = this.comboSum + this.addroomamt - this.dowmroomamt + this.subjoin - this.sellPre
            },
            orderCommit () {
                this.orderSubmit = this.orderData

                this.orderSubmit.rdr1ModelList = this.touristData
                this.orderSubmit.updateMemo = '修改订单信息'



                this.self.editOrder ( {ordrModel:JSON.stringify(this.orderSubmit)} )
                console.log(this.orderSubmit)
            },
            chooseProduct ( data ) {
                let arr = []
                let arr2 = []

                if ( data.length !== 0 ) {

                    data.forEach( el => {
                        arr = el.split("-")
                        arr2.push({
                            projectcode:arr[0],
                            price:parseFloat(arr[1]).toFixed(2)
                        })
                    })

                    this.addTouristData.rdr11ModelList = arr2
                }

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

</style>
