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
        <Button type="success" class="addBtn" @click="addFn">
        <Icon type="person-add"></Icon>
        添加</Button>
        <div>
            <Modal v-model="add" width="360" class="Modal" :mask-closable="false">
                <p slot="header" class="title">
                    <span>添加用户</span>
                </p>
                <div class="text-align">
                    <Form ref="addData" :model="addData"  :rules="addAuth" :label-width="80" inline>
                        <Form-item label="登入账号:" prop="userID" >
                            <Input type="text" v-model="addData.userID" @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>
                        <Form-item label="登入密码:" prop="userPwd">
                            <Input type="password" v-model="addData.userPwd" @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>
                        <Form-item label="人员姓名:" prop="userName">
                            <Input type="text" v-model="addData.userName" @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>

                        <Form-item label="选择部门:" prop="deptCode">
                            <Select v-model="addData.deptCode" style="width:162px;text-align:left;" placeholder="选择部门">
                                <Option v-for="item in deptList" :value="item.deptCode" :key="item">{{ item.deptDesc }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="选择职位:" prop="title">
                            <Select v-model="addData.title" style="width:162px;text-align:left;" placeholder="选择职位">
                                <Option v-for="item in titleList" :value="item.titleCode" :key="item">{{ item.titleDesc }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="选择角色:" prop="orleCode">
                            <Select v-model="addData.orleCode" style="width:162px;text-align:left;" placeholder="选择角色">
                                <Option v-for="item in orleList" :value="item.orleCode" :key="item">{{ item.orleDesc }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" class="text-align">
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="commit ('addData',addData)">提交</Button>
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="reset ('addData')">重置</Button>
                </div>
            </Modal>
            <Modal v-model="edit" width="360" class="Modal" :mask-closable="false">
                <p slot="header" class="title">
                    <span>修改用户</span>
                </p>
                <div class="text-align">
                    <Form ref="editData" :model="editData"  :rules="addAuth" inline>
                        <Form-item label="登入账号:" prop="userID" :label-width="80">
                            <Input type="text" v-model="editData.userID" disabled @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>
                        <Form-item label="登入密码:" prop="userPwd" :label-width="80">
                            <Input type="password" v-model="editData.userPwd" @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>
                        <Form-item label="人员姓名:" prop="userName" :label-width="80">
                            <Input type="text" v-model="editData.userName" @on-blur="check" placeholder="部门名称"></Input>
                        </Form-item>

                        <Form-item label="选择部门:" prop="deptCode" :label-width="80">
                            <Select v-model="editData.deptCode" style="width:162px;text-align:left;" placeholder="选择部门">
                                <Option v-for="item in deptList" :value="item.deptCode" :key="item">{{ item.deptDesc }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="选择职位:" prop="title" :label-width="80">
                            <Select v-model="editData.title" placeholder="选择职位" style="width:162px;text-align:left;">
                                <Option v-for="item in titleList" :value="item.titleCode" :key="item">{{ item.titleDesc }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="选择角色:" prop="orleCode" :label-width="80">
                            <Select v-model="editData.orleCode" placeholder="选择角色" style="width:162px;text-align:left;">
                                <Option v-for="item in orleList" :value="item.orleCode" :key="item">{{ item.orleDesc }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" class="text-align">
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="commit ('editData',editData)">提交</Button>
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="reset ('editData')">重置</Button>
                </div>
            </Modal>
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
            add:false,
            edit:false,
            total:0,
            current:1,
            dept:'',
            search:{
                deptDesc:''
            },
            addData:{
                // cmpcode:'',
                userID:'',
                userPwd:'',
                userName:'',
                deptCode:'',
                title:'',
                orleCode:''
            },
            editData:{},
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
                },
                {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    width: 80,
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
                                }, '编辑')
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.row.deptCode)
                                //         }
                                //     }
                                // }, '删除')
                            ]);
                        }
                }
            ],
            addAuth:{
                userID: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                userPwd:[
                    { required: true, message: '请填写用户密码', trigger: 'blur' }
                ],
                userName:[
                    { required: true, message: '请填写用户姓名', trigger: 'blur' }
                ]
            },
            userData: [],
            deptList:[],
            titleList:[],
            orleList:[]
        }
    },
    methods: {
        addFn () {
            this.add = true
        },
        commit (name,data) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                    switch (name) {
                        case 'addData':
                            this.self.addUser (data)
                            break
                        default :
                            this.self.editUser ( data )
                    }
                } else {
                    this.$Message.error('表单验证失败!')
                }
            })
        },
        reset (name) {
            this.$refs[name].resetFields()
        },
        commitEdit () {
            this.self.editBaseInfo (this.editData)
        },
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
