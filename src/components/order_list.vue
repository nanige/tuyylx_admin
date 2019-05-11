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
                            <Form-item label="成团状态:">
                                <Select v-model="search.groupstatus" size="small" style="width:200px">
                                    <Option value="1">未成团</Option>
                                    <Option value="2">待出团</Option>
                                    <Option value="3">已出团</Option>
                                    <Option value="4">已回团</Option>
                                </Select>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="出发日期:">
                                <Date-picker format="yyyy-MM-dd" type="date"
                                size="small" placeholder="选择日期" style="width: 200px" @on-change="timeChange">
                                </Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="回团日期:">
                                <Date-picker format="yyyy-MM-dd" type="date" size="small"
                                placeholder="选择日期" style="width: 200px" @on-change="timeChange2"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="8">
                          <Form-item label="下单日期:">
                            <Date-picker format="yyyy-MM-dd" type="date"
                                         size="small" placeholder="选择日期" style="width: 200px" @on-change="timeChange3">
                            </Date-picker>
                          </Form-item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="订单状态:">
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
                                    <Option value="1">已付全款</Option>
                                    <Option value="2">部分付款</Option>
                                    <Option value="3">未付款</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="8">
                          <Form-item label="支付状态:">
                            <Select v-model="search.orderstatus" size="small" style="width:200px">
                              <Option value="1">已付全款</Option>
                              <Option value="2">部分付款</Option>
                              <Option value="3">未付款</Option>
                            </Select>
                          </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="确认状态:">
                                <Select v-model="search.orderstatus" size="small" style="width:200px">
                                    <Option value="1">未确认</Option>
                                    <Option value="2">全款已确定</Option>
                                    <Option value="3">部分付款已确认</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <!--<Col span="8">
                            <Form-item label="计调人员:">
                                <Input v-model="search.opid" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>-->
                    </Row>
                    <!--<Row>
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
                    </Row>-->
                </Form>
            </div>

            <div  class="searchBtns" v-if="tableShow">
                <Button type="warning" style="margin-top:100px;" @click="searchReset()">重置</Button>
                <Button type="success" @click="searchSubmit(search)" style="margin-left: 8px;margin-top:100px;">
                <Icon type="search"></Icon>
                查询</Button>

                <Button type="primary" @click="searchReset()" style="margin-left: 8px;margin-top:100px;">导出数据</Button>
                 <div style="clear:both"></div>
            </div>

             <div style="clear:both"></div>
        </div>
        <div>
            <Table stripe border :columns="orderTitle" :data="orderList"></Table>
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
            height:'auto',
            icon_arrow:'chevron-up',
            search:{
                docentry: '',
                groupno:'',
                isgroup:'',
                ispay:'',
                orderstatus:'',
                venuedate:'',
                enddate:'',
                status:'O,L',
                createDate: ''
            },
            venuedate:'',
            orderList:[],
            orderTitle: [
                { title: '订单编号', key:'docentry',width:150,
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
                { title: '团号', key:'groupno',width:350},
                { title:'销售渠道',key:'vendor',width:150},
                { title:'出发日期',key:'startdate',width:150},
                { title:'下单时间',key:'createDate',width:150},
                { title:'下单人',key:'createUser',width:150},
                { title:'联系人',key:'createUser',width:150},
                { title:'成团状态',key:'groupstatus',width:150,
                    render: (h, params) => {
                        let status = ''
                        switch (params.row.groupstatus) {
                            case '1':
                                status = '未成团'
                                break
                            case '2':
                                status = '待出团'
                                break
                            case '3':
                                status = '已出团'
                                break
                            case '4':
                                status = '已回团'
                                break
                        }
                        return h('span', status);
                    }
                },
                { title:'订单状态',key:'status',width:150,
                    render: (h, params) => {
                        let status = ''
                        switch (params.row.status) {
                            case 'D':
                                status = '删除'
                                break
                            case 'O':
                                status = '正式'
                                break
                            case 'C':
                                status = '取消'
                                break
                            case 'L':
                                status = '锁定'
                                break
                            case 'G':
                                status = '变更'
                                break
                            case 'R':
                                status ='草稿'
                                break
                            case 'OUT':
                                status ='转出团'
                                break
                            case 'IN':
                                status ='转入团'
                                break
                        }
                        return h('span', status);
                    }
                },
                { title:'确认状态',key:'orderstatus',width:150,
                    render: (h, params) => {
                        let status = ''
                        switch (params.row.orderstatus) {
                            case '1':
                                status = '未确认'
                                break
                            case '2':
                                status = '已确认'
                                break
                            case '3':
                                status = '拒绝'
                                break
                        }
                        return h('span', status);
                    }

                },
                { title:'支付状态',key:'ispay',width:150,
                    render: (h, params) => {
                        let status = ''
                        switch (params.row.ispay) {
                            case '1':
                                status = '已付全款'
                                break
                            case '2':
                                status = '部分付款'
                                break
                            case '3':
                                status = '未付款'
                                break
                        }
                        return h('span', status);
                    }
                },
                { title:'订单总人数', key:'quantity',width:150},
                { title:'操作', key:'action',width:150,align:'center',fixed: 'right',
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
                                        this.$router.push({ path: '/index/order_return_team', query:{ groupno: params.row.groupno,docentry: params.row.docentry} })
                                    }
                                }
                            }, '转团'),
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
                                        this.toEdit ( params.row.docentry, params.row.linecode )
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
                                        this.removeOrder ( params.row.docentry )
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ]
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

        searchSubmit ( data ) {
            for (var key in data) {

                if ( data[key] === '' ) {
                    delete data[key]
                }
            }

            list.getOrderAll ( this,{ page: this.current, paramStr: data } )
        },

        timeChange (date) {
            this.search.startdate = date
        },

        timeChange2 (date) {
            this.search.enddate = date
        },

        timeChange3 (date) {
          this.search.createDate = date
        }
    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )

        list.getOrderAll ( this,{ page: this.current,status:'O,L' } )
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
