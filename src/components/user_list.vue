<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>用户管理</Breadcrumb-item>
        </Breadcrumb>
        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="用户名称:">
                    <Input v-model="search.userName" style="width:200px"></Input>
                    <Button type="primary" @click="searchAction (search)"><Icon type="ios-search-strong"></Icon>
                    查询</Button>
                    <Button type="primary" @click="daochu" style="margin-left:12px">导出数据</Button>
                </Form-item>
            </Form>
        </div>

        <div class="infoList">
            <Table border :columns="userTitle" stripe :data="userData" class="tableCenter"></Table>
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
            dept:'',
            search:{
                deptDesc:''
            },

            userTitle: [
                {
                    title: '用户姓名',
                    key: 'userName'
                },
                {
                    title: '账户名称',
                    key: 'userID'
                },
                {
                    title: '所属部门',
                    key: 'deptDesc'
                },
                {
                    title: '用户职位',
                    key: 'titleDesc'
                },
                {
                    title: '用户角色',
                    key: 'orleDesc'
                },
                {
                    title: '创建时间',
                    key: 'createDate'
                }
            ],
            userData: [],
            deptList:[],
            titleList:[],
            orleList:[]
        }
    },
    methods: {
        changePage (currentItem) {
            getList.getUserList ( {page: currentItem},this )
        },
        editPanel (data) {
            this.edit = true
            this.editData = data
        },
        remove (deptCode) {
            this.self.removeBaseInfo (deptCode)
        },
        searchAction (data) {
            getList.getUserList ( {userName: data.userName},this )
        },
        check () {
            // this.self.checkDeptCode (this.addData)
        },
        daochu () {
            let api = new Config().getApi()
            location.href= api + '/biz/ousr/batchExport.do'
        }
    },
    mounted () {
        this.self = new Action(this)

        getList.getUserList ( {page: this.current},this )
        this.self.getSelectList ()
    }

  }
</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }

    .BtnColor {
        background-color:#441471!important;
        border-color:#441471!important;
    }

    .addAndSearch {
        margin-top: 20px;
    }

    .Breadcrumb {
        margin-top:10px;
        border-bottom:1px solid #e9eaec;
        padding-bottom:10px;
    }
</style>
