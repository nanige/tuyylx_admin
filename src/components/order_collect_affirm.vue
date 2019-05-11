<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>收款确认</Breadcrumb-item>
        </Breadcrumb>
        <div class="screenList" :style="'height:' + height">
            <Button type="text" class="chevron-down"><Icon :type="icon_arrow"></Icon></Button>

            <div v-if="!tableShow">
                <p>点击按钮展开条件查询</p>
            </div>
          <div class="searchPanel" v-if="tableShow">
            <Form ref="search" :model="search" class="zidingyi" style="margin: 25px 25px 0 0" :label-width="80">
              <Row>
                <Col span="8">
                <Form-item label="订单号:">
                  <Input v-model="search.docentry" size="small" placeholder="例：201707020002409" style="width: 200px"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="团号:">
                  <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="线路名称:">
                  <Input v-model="search.linename" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                <Form-item label="出发日期:">
                  <Date-picker
                    type="date" size="small"
                    placeholder="选择日期"
                    style="width: 200px"
                    @on-change="startDateChange"
                    format="yyyy-MM-dd"
                  />
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="回团日期:">
                  <Date-picker
                    type="date" size="small"
                    placeholder="选择日期"
                    style="width: 200px"
                    @on-change="endDateChange"
                    format="yyyy-MM-dd"
                  />
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="下单时间:">
                  <Date-picker
                    type="date" size="small"
                    placeholder="选择日期"
                    style="width: 200px"
                    @on-change="createDateChange"
                    format="yyyy-MM-dd"

                  />
                </Form-item>
                </Col>

              </Row>
              <Row>
                <Col span="8">
                <Form-item label="订单状态:">
                  <Select v-model="search.orderstatus" size="small" style="width:200px">
                    <Option value="1">未确认</Option>
                    <Option value="2">已确认</Option>
                    <Option value="3">取消</Option>
                  </Select>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="确认状态:">
                  <Select v-model="search.isacctpay" size="small" style="width:200px">
                    <Option value="1">未确认</Option>
                    <Option value="2">已确认</Option>
                    <Option value="3">取消</Option>
                  </Select>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="支付状态:">
                  <Select v-model="search.ispay" size="small" style="width:200px">
                    <Option value="1">未确认</Option>
                    <Option value="2">已确认</Option>
                    <Option value="3">取消</Option>
                  </Select>
                </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                <Form-item label="下单员:">
                  <Input v-model="search.createUser" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                </Form-item>
                </Col>

              </Row>
            </Form>

            <div v-if="tableShow" style="margin-left: 80px;margin-top: 20px">

              <Button type="success" size="small" style="margin-right: 5px" @click="searchSubmit()" >查询</Button>
              <Button type="warning" size="small" style="margin-right: 5px" @click="searchReset()">重置</Button>
              <Button type="primary" size="small" style="margin-right: 5px" @click="searchReset()" >导出数据</Button>
              <div style="clear:both"></div>
            </div>
          </div>



          <div style="clear:both"></div>
        </div>
        <div>
            <Table stripe border :columns="orderTitle" :data="orderList" @on-select="selectOrder"></Table>
        </div>
        <div style="margin-top: 30px;">
            <!--<Button type="success" @click="collect">确认收款</Button>-->
            <Modal v-model="collectShow" width="960">
                <p slot="header" style="color:#fff;">
                    <span>输入金额</span>
                </p>
                <div style="margin-left: 80px">
                    <Row style="margin-top: 10px">
                        <Col span="6">订单金额：{{orderOne.amount}}元</Col>
                        <Col span="6">确认收款金额：{{orderOne.collectMoney}}元</Col>
                        <Col span="6">实收金额：{{orderOne.received}}元</Col>
                        <Col span="6">未收金额：{{orderOne.unamount}}元</Col>
                    </Row>
                </div>
                <div class="text-align" style="margin-top: 30px">
                    输入金额(元)：  <Input-number :min="0" v-model="moneyCol"></Input-number>
                </div>
                <div slot="footer" class="text-align">
                    <Button type="success" size="large" @click="moneyEnd (orderOne)">提交</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import list from '../actions/list'
  export default {
    name: 'department',
    data() {
        return {
            current:1,
            tableShow:true,
            collectShow:false,
            height:'auto',
            icon_arrow:'chevron-up',
            search:{
                docentry: '',
                groupno:'',
                linename: '',
                startDate: '',
                endDate: '',
                createDate: '',
                createUser: ''
            },
            priceaaaa:'',
            orderList:[],
            orderOne:{},
            orderTitle: [
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                { title: '收款编号', key:'docentry',width: 150},
                { title: '团号', key:'groupno',width: 230},
                // { title: '团队名称', key:'groupno'}
                { title:'销售渠道',key:'vendor',width: 150},
                { title:'订单总人数', key:'quantity',width: 150},
                { title:'订单金额(元)', key:'amount',width: 150},
                { title:'收款金额(元)', key:'collectMoney',width: 150},
                { title:'未收金额(元)', key:'unamount' ,width: 150},
                { title:'实收金额(元)', key:'received',width: 150},
                { title:'操作',width:100,align:'center',fixed: 'right',
                    render: (h, params) => {
                        return h('Button',{
                            props: {
                                type:'primary',
                                size: 'small'
                            },
                            on: {
                                click:() => {
                                    this.affirms ( params.row )
                                }
                            }
                        }, '确认收款')
                    }
                }
            ],
            collectData:[],
            moneyCol:0
        }
    },
    methods: {
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

        removeOrder ( code ) {
            this.self.removeOrder ( code )
        },

        toEdit ( code,code2 ) {
            this.$router.push({ path:'order_edit',query:{ docentry:code , linecode: code2} })
        },

        selectOrder ( selection ) {
            this.collectData = selection
        },

        affirms (item) {
            this.collectShow = true

            this.orderOne = item
        },

        moneyEnd () {


            if ( this.moneyCol <= this.orderOne.collectMoney && this.moneyCol !== 0 ) {
                this.self.affirmShouQian (this.orderOne.docentry,this.moneyCol)
            } else {
                this.$Message.error('服务器不想说话，并且向你抛出了一个异常')
            }

        },
        startDateChange ( date ) {
            this.search.startdate = date
        },
        endDateChange ( date ) {
            this.search.enddate = date
        },
        createDateChange ( date ) {
            this.search.createDate = date
        }
    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )

        list.getUnAffirm ( this )
    }

  }

</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }
    .searchAndExport {
        border:1px solid #dddee1;

        margin:20px 0;
        padding:25px 10px 10px 10px;
    }

    .infoList {
        margin-top: 20px;
    }

    .screenList {
        border: 1px solid #dddee1;
        margin-top: 15px;
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


    .searchPanel {
        width: 70%;
        float:left;
    }

    .searchBtns {
        float:left;
    }
</style>
