<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>签证设置</Breadcrumb-item>
        </Breadcrumb>

        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="部门名称:">
                    <Input v-model="search.deptDesc" style="width:200px"></Input>
                    <Button type="primary" @click="searchAction (search)"><Icon type="ios-search-strong"></Icon>
                    查询</Button>
                    <Button type="primary" @click="daochu" style="margin-left:12px">导出数据</Button>
                </Form-item>
            </Form>
        </div>

        <Button type="success" class="addBtn" @click="toAdd">
        <Icon type="person-add"></Icon>
        添加签证</Button>

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
                text:'锁定',
                val:'L'
            }],
            departTitle: [
                {

                    title: '签证编号',
                    key: 'visacode'
                },
                {
                    title: '签证描述',
                    key: 'visadesc'
                },
                {
                    title: '签证类别',
                    key: 'visatypecode'

                },
                {
                    title: '下载',
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
                                            this.editPanel (params.row)
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
                                            this.remove(params.row.deptCode)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
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
                                            this.editPanel (params.row)
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
                                            this.remove(params.row.deptCode)
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
        commit (enterData) {
            this.self.addDepart (enterData)
        },
        changePage (currentItem) {
            getList.getBaseInfo (currentItem)
        },
        remove (deptCode) {
            this.self.removeBaseInfo (deptCode)
        },
        searchAction (data) {
            getList.conditionalSearch ( data,this )
        },
        check () {
            // this.self.checkDeptCode (this.addData.deptDesc)
        },
        toAdd () {
            this.$router.push({ path: '/index/visa_add' })
        }
    },
    mounted () {
        this.self = new Action(this)
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
