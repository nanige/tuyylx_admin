<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>订单审核列表</Breadcrumb-item>
        </Breadcrumb>
        <div class="screenList" :style="'height:' + height">
            <Button type="text" class="chevron-down" @click="changeHeightOne"><Icon :type="icon_arrow"></Icon></Button>

            <div v-if="!tableShow">
                <p>点击按钮展开条件查询</p>
            </div>
            <div class="searchPanel">
                <Form ref="search" v-if="tableShow" :model="searchObj" class="zidingyi" style="margin: 25px 25px 0 0" :label-width="80">
                    <Row>
                        <Col span="8">
                            <Form-item label="变更编号:">
                                <Input v-model="searchObj.changentry" size="small" placeholder="例：201707020002409" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="订单号:">
                                <Input v-model="searchObj.docentry" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="所属公司:">
                                <Input v-model="searchObj.cmpCode" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="团号:">
                                <Input v-model="searchObj.groupno" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="供应商:">
                                <Input v-model="searchObj.vendor" size="small" placeholder="例：GZLGZ0CT3SK1707170610BACD" style="width: 200px"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div  class="searchBtns" v-if="tableShow">
                <Button type="warning" @click="searchReset()" style="margin-top: 70px;">重置</Button>
                <Button type="success" @click="searchAction()" style="margin-left: 8px;margin-top: 70px;">
                <Icon type="search"></Icon>
                查询</Button>

                <Button type="primary" @click="searchReset()" style="margin-left: 8px;margin-top: 70px;">导出数据</Button>
            </div>
            <div style="clear:both"></div>
        </div>
        <div>
            <Table stripe border :columns="orderTitle" :data="orderList"></Table>
            <Page :total="total" show-total class="departPage"></Page>
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
            total:0,
            height:'auto',
            icon_arrow:'chevron-up',
            searchObj:{
                docentry: '',
                groupno:'',
                changentry:'',
                groupno:'',
                vendor:''
            },
            orderList:[],
            orderTitle: [
                { title: '变更编号', key:'changentry'},
                { title: '变更内容 ', key:'changedes'},
                { title: '订单号',key:'docentry'},
                { title: '所属公司类别',key:'cmptype',
                    render: (h, params) => {
                        let status = ''
                        switch (params.row.cmptype) {
                            case '1':
                                status = '产品中心'
                                break
                            case '2':
                                status = '运营商'
                                break
                            case '3':
                                status = '经销商'
                                break
                            case '4':
                                status = '供应商'
                                break
                        }
                        return h('span', status);
                    }
                },
                { title: '所属公司',key:'cmpcode'},
                { title: '供应商',key:'vendor'},
                { title: '线路',key:'linecode'},
                { title:'团号', key:'groupno'},
                { title:'变更状态', key:'status',

                    render: (h, params) => {
                        let status = ''
                        switch (params.row.status) {
                            case '1':
                                status = '未确定'
                                break
                            case '2':
                                status = '已同意'
                                break
                            case '3':
                                status = '已拒绝'
                                break
                        }
                        return h('span', status);
                    }
                },
                { title:'操作', key:'action',width:130,

                    render: (h, params) => {
                        let btn = []

                        if (params.row.status === '1') {
                            btn = [
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
                                            this.actionOrder ( params.row, '2')
                                        }
                                    }
                                }, '同意'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.actionOrder ( params.row, '3')
                                        }
                                    }
                                }, '拒绝')
                            ]
                        } else {
                            btn.length = 0
                        }
                        return h('div', btn)
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

        actionOrder (item,status) {

            let data = {
                changentry: item.changentry,
                type: item.type,
                docentry: item.docentry,
                status: status
            }

            this.self.changeOrder ( data )
        },

        searchAction () {

        }

    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )

        list.searchChangeOrder ( this,{ page: this.current } )
    }

  }

</script>
<style lang="less">

</style>
