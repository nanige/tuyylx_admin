<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>分销商列表</Breadcrumb-item>
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
  import getList from '../actions/list'
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
                    title: '经销商编号',
                    key: 'cusCode',
                    width: 150
                },
                {
                    title: '经销商名称',
                    key: 'cusName',
                    width: 230
                },
                {
                    title: '登陆账号',
                    key: 'sysNo',
                    width: 150

                },
                {
                    title: '法人',
                    key: 'legalPerson',
                    width: 150

                },
                {
                    title: '移动电话',
                    key: 'mobile',
                    width: 150

                },
                {
                    title: '联系人姓名',
                    key: 'ctName',
                    width: 150

                },
                {
                    title: '开始日期',
                    key: 'startTime',
                    width: 230
                },
                {
                    title: '截止日期',
                    key: 'endTime',
                    width: 230

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
                    width: 80,
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
                                            this.detail (params.row.cusCode)
                                        }
                                    }
                                }, '详情')
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

        toAdd () {
            this.$router.push({ path:'/index/distributor_add'})
        },
        remove ( id ) {
            this.self.removeDistributor(id)
        },
        editPanel ( id ) {
            this.$router.push({ path:'/index/distributor_edit',query:{cusCode:id}})
        },
        detail ( id ) {
            this.$router.push({ path:'/index/distributor_detail',query:{cusCode:id}})
        },
        changePage ( current ) {
            getList.getSupplier ( current,this,'ocust' )
        }
    },
    mounted () {
        this.self = new Action(this)

        getList.getSupplier ( this.current,this,'ocust' )
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
