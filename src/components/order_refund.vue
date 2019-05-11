<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>订单列表</Breadcrumb-item>
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
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
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
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
                                    <Option value="1">未确认</Option>
                                    <Option value="2">已确认</Option>
                                    <Option value="3">取消</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="支付状态:">
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
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
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="下单时间:">
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="联系人:">
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="下单员:">
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
                                    <Option value="1">未确认</Option>
                                    <Option value="2">已确认</Option>
                                    <Option value="3">取消</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="下单时间:">
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
                                    <Option value="1">未确认</Option>
                                    <Option value="2">已确认</Option>
                                    <Option value="3">取消</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="联系人:">
                                <Input v-model="search.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div  class="searchBtns" v-if="tableShow">
                <Button type="warning" style="margin-top:150px;" @click="searchReset()">重置</Button>
                <Button type="success" @click="searchSubmit()" style="margin-left: 8px;margin-top:150px;">
                <Icon type="search"></Icon>
                查询</Button>

                <Button type="primary" @click="searchReset()" style="margin-left: 8px;margin-top:150px;">导出数据</Button>
                 <div style="clear:both"></div>
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
                    <Row>
                        <Col span="6">订单编号：{{orderOne.docentry}}</Col>
                        <Col span="6">团号：{{orderOne.groupno}}</Col>
                        <Col span="6">销售渠道：{{orderOne.vendor}}</Col>
                        <Col span="6">订单总人数：{{orderOne.quantity}}人</Col>
                    </Row>
                    <Row style="margin-top: 10px">
                        <Col span="6">订单金额：{{orderOne.amount}}元</Col>
                        <Col span="6">实收金额：{{orderOne.received}}元</Col>
                        <Col span="6">未收金额：{{orderOne.unamount}}元</Col>
                        <Col span="6">退款金额：{{orderOne.refund}}元</Col>
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
            },
            priceaaaa:'',
            orderList:[],
            orderOne:{},
            orderTitle: [
                { title: '订单编号', key:'docentry', width: 150,
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'success',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.$router.push({ path: '/index/order_detail', query:{ groupno: params.row.groupno,docentry: params.row.docentry, linecode: params.row.linecode} })
                          }
                        }
                      }, params.row.docentry)

                    ]);
                  }
                },
                { title: '团号', key:'groupno', width: 230},
                { title:'销售渠道',key:'vendor', width: 150},
                { title:'订单总人数', key:'quantity', width: 150},
                { title:'订单金额(元)', key:'amount', width: 150},
                { title:'实退金额(元)', key:'refund', width: 150},
                { title:'退款状态', key:'returnStatus', width: 150,
                    render: (h, params) => {
                        let payStatus = ''

                        switch (params.row.returnStatus) {
                            case '1':
                                payStatus = '已退全款'
                                break
                            case '2':
                                payStatus = '已退定金(部分退款)'
                                break
                            default :
                                payStatus = '未退款'
                        }
                        return h('span', payStatus)
                    }
                },
                { title:'财务确定', key:'confirmReturn', width: 150,
                    render: (h, params) => {
                        let isacctpay = ''

                        switch (params.row.confirmReturn) {
                            case '2':
                                isacctpay = '全额退款已确认'
                                break
                            case '3':
                                isacctpay = '部分退款已确认'
                                break
                            default :
                                isacctpay = '未确定'
                        }
                        return h('span', isacctpay)
                    }
                },
                { title:'操作',width:100,align:'center',fixed: 'right',
                    render: (h, params) => {
                        return h('Button',{
                            props: {
                                type:'primary',
                                size: 'small'
                            },
                            on: {
                                click:() => {
                                    this.collect ( params.row )
                                }
                            }
                        }, '退款')
                    }
                }
            ],
            collectData:[],
            moneyCol:0,

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

        collect (item) {
            this.collectShow = true

            this.orderOne = item
        },

        moneyEnd (item) {
            let data = {
                codes: '',
                moneys:''
            }

            data.codes = item.docentry
            data.moneys = this.moneyCol

            if ( this.moneyCol <= this.orderOne.received && this.moneyCol !== 0 ) {
                this.self.huanqian (data)
            } else {
                this.$Message.error('对方不想说话，并且向你抛出了一个异常')
            }

        }
    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )

        list.getOrderAll ( this, { pageNum: this.current, type:'return' } )
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
