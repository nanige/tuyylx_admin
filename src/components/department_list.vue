<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>部门管理</Breadcrumb-item>
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
            total:0,
            current:1,
            search:{
                deptDesc:''
            },
            enterData:{
                deptCode:'',
                deptDesc:''
            },
            editData:{
                deptCode:'',
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

                    title: '部门编号',
                    key: 'deptCode'
                },
                {
                    title: '部门名称',
                    key: 'deptDesc'
                },
                {
                    title: '创建时间',
                    key: 'createDate'

                },
              {
                title: '创建人',
                key: 'createUser'

              }
            ],
            departData: []
        }
    },
    methods: {
        commit (enterData) {
            this.self.addDepart (enterData)
        },
        cancel () {
            this.add = false
            this.enterData = {
                deptCode:'',
                deptDesc:''
            }
        },
        commitEdit () {
            this.self.editBaseInfo ( this.editData )
        },
        changePage (currentItem) {
            getList.getBaseInfo (currentItem)
        },
        editPanel (data) {
            this.edit = true
            this.editData = data
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

        daochu () {
            let api = new Config().getApi()
            location.href= api + '/biz/ousr/batchExport.do'
        }
    },
    mounted () {
        this.self = new Action(this)

        getList.getBaseInfo ( this.current,this )

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
