<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>运营商列表</Breadcrumb-item>
        </Breadcrumb>
        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="部门名称:">
                    <Input v-model="search.deptDesc" style="width:200px"></Input>
                    <Button type="primary">查询</Button>
                    <Button type="primary" @click="daochu" style="margin-left:12px">导出数据</Button>
                </Form-item>
            </Form>
        </div>

        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="departData" class="tableCenter"></Table>
            <Page :total="total" show-total show-elevator class="departPage" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  export default {
    name: 'department',
    data() {
        return {
            self: '',
            add:false,
            edit:false,
            total:0,
            current:1,
            search:{
                deptDesc:''
            },
            statusList:[{
                text:'正常',
                val:'O'
            },{
                text:'删除',
                val:'D'
            },{
                text:'锁定',
                val:'L'
            }],
            departTitle: [
                {

                    title: '运营商编号',
                    key: 'cmpID',
                    width: 150
                },
                {
                    title: '公司名称',
                    key: 'cmpName',
                    width: 230
                },
                {
                    title: '登陆账号',
                    key: 'systNo',
                    width: 150
                },
                {
                    title: '法人',
                    key: 'legalPerson',
                    width: 130
                },
                {
                    title: '移动电话',
                    key: 'mobile',
                    width: 150

                },
                {
                    title: '联系人姓名',
                    key: 'shoperName',
                    width: 150
                },
                {
                    title: '开始日期',
                    key: 'startTime',
                    width: 200,
                },
                {
                    title: '截止日期',
                    key: 'endTime',
                    width: 200

                },
                {
                    title: '状态',
                    key: 'status',
                    width: 80,
                    render: (h, params) => {
                        let thatStatus = ''
                        if ( params.row.status === 'O') {
                            thatStatus = '正常'
                        }

                        return h('div', [
                            h('span',  thatStatus)
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:170,
                    fixed: 'right',
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
                                            this.detail (params.row.cmpID)
                                        }
                                    }
                                }, '详情'),
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
                                            this.editPanel (params.row.cmpID)
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
                                            this.remove(params.row.cmpID)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            departData: []
        }
    },
    methods: {

        daochu () {
            let api = new Config().getApi()
            location.href= api + '/biz/ousr/batchExport.do'
        },

        remove ( id ) {
            this.self.deleteCmpy(id)
        },
        editPanel ( id ) {
            this.$router.push({ path:'/index/edit_operator',query:{cmpID:id}})
        },
        detail ( id ) {
            this.$router.push({ path:'/index/detail_operator',query:{cmpID:id}})
        },

      departPage ( page ) {
        this.self.getOperator ( page )
      }
    },
    mounted () {
        this.self = new Action(this)

        this.self.getOperator ( this.current )
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
</style>
