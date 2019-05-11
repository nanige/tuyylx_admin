<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>退款确认</Breadcrumb-item>
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
                                <Date-picker type="date" size="small" placeholder="选择日期" style="width: 200px"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="回团日期:">
                                <Date-picker type="date" size="small" placeholder="选择日期" style="width: 200px"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="线路名称:">
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
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
                                <Input v-model="search.createUser " size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="下单时间:">
                                <Input v-model="search.createDate" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>

              <div v-if="tableShow" style="margin-left: 80px;margin-top: 20px">

                <Button type="success" size="small" style="margin-right: 5px" @click="searchSubmit(search)" >查询</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="searchReset()">重置</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="searchReset()" >导出数据</Button>
              </div>
            </div>



             <div style="clear:both"></div>
        </div>
        <div>
            <Table stripe border :columns="orderTitle" :data="orderList" @on-select="selectOrder"></Table>
        </div>
        <div style="margin-top: 30px;">
            <!--<Button type="success" @click="collect">确认收款</Button>-->
            <Modal v-model="collectShow" width="560">
                <p slot="header" style="color:#fff;">
                    <span>输入金额</span>
                </p>
                <div style="margin-left: 80px">
                    <Row style="margin-top: 10px">
                        <Col span="11">订单金额：{{orderOne.amount}}元</Col>
                        <Col span="11">待退金额: {{orderOne.returnMoney}}元</Col>
                    </Row>
                </div>
                <div style="margin-top: 30px;margin-left: 80px;">
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
            },
            priceaaaa:'',
            orderList:[],
            orderOne:{},
            orderTitle: [
                { title: '退款编号', key:'docentry'},
                { title: '团号', key:'groupno'},
                { title:'销售渠道',key:'vendor'},
                { title:'订单金额(元)', key:'amount'},
                { title:'退款金额(元)', key:'returnMoney'},
                { title:'实退金额(元)', key:'refund'},
                { title:'操作',width:100,align:'center',
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
                        }, '确认退款')
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

            if ( this.moneyCol <= this.orderOne.returnMoney && this.moneyCol !== 0 ) {
                this.self.affirmRefund (this.orderOne.docentry,this.moneyCol)
            } else {
                this.$Message.error('对方不想说话，并且向你抛出了一个异常')
            }

        },

        searchSubmit ( item ) {
            console.log(item)
        }
    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )

        list.getUnAffirmRefund ( this )
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
