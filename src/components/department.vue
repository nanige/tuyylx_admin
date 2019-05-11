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

        <Button type="success" class="addBtn" @click="add = true">
        <Icon type="person-add"></Icon>
        添加</Button>

        <div >
            <Modal v-model="add" width="360" :mask-closable="false">
                <p slot="header" class="title">
                    <span>添加部门</span>
                </p>
                <div style="text-align:center">
                    <Form ref="enterData" v-model="enterData" inline>

                        <Form-item label="部门编号:" prop="deptCode" :label-width="80">
                            <Input type="text" v-model="enterData.deptCode" placeholder="部门编号"></Input>
                        </Form-item>
                        <Form-item label="部门名称:" prop="deptDesc" :label-width="80">
                            <Input type="text" v-model="enterData.deptDesc" placeholder="部门名称"></Input>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" style="text-align:center;">
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="commit(enterData)">提交</Button>
                    <Button size="large"  @click="cancel()">取消</Button>
                </div>
            </Modal>
        </div>
        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="departData" class="tableCenter"></Table>
            <Page :total="total" show-total show-elevator class="departPage" @on-change="changePage"></Page>
        </div>
        <Modal v-model="edit" width="360" :mask-closable="false">
            <p slot="header" class="title">
                <span>修改部门</span>
            </p>
            <div style="text-align:center">
                <Form ref="addData" :model="editData" inline>

                    <Form-item label="部门编号:" prop="deptCode" :label-width="80">
                        <Input type="text" v-model="editData.deptCode" placeholder="部门编号" disabled></Input>
                    </Form-item>
                    <Form-item label="部门名称:" :label-width="80">
                        <Input type="text" v-model="editData.deptDesc" placeholder="部门名称"></Input>
                    </Form-item>
                    <Form-item label="账户状态:" :label-width="65">
                        <Radio-group v-model="editData.status">
                            <Radio v-for="item in statusList" :key="item" :label="item.val">{{item.text}}</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer" style="text-align:center;">
                <Button type="success" size="large"  @click="commitEdit">提交</Button>
            </div>
        </Modal>
        <Modal v-model="delAffirm" width="360">
          <p slot="header" style="color:#fff;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <p>是否继续删除？</p>
          </div>
          <div slot="footer" style="text-align:center">
            <Button type="error" size="large" @click="remove (deptDelCode)">确定删除</Button>
          </div>
        </Modal>
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
            delAffirm: false,
            deptDelCode:'',
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

                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 150,
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
                                            this.delAffirm = true
                                            this.deptDelCode = params.row.deptCode
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
