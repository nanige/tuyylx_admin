<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>角色管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="部门名称:">
                    <Input v-model="search.deptDesc" style="width:200px"></Input>
                    <Button type="primary" class="margin-left">查询</Button>
                    <Button type="primary" class="margin-left">导出数据</Button>
                </Form-item>
            </Form>
        </div>

        <div>
            <Modal v-model="add" width="360" :mask-closable="false">
                <p slot="header" class="title">
                    <span>添加角色</span>
                </p>
                <div style="text-align:center">
                    <Form ref="addData" :model="addData" inline>

                        <Form-item label="部门编码:" prop="deptCode" :label-width="80">
                            <Input type="text" v-model="addData.deptCode" placeholder="部门编码"></Input>
                        </Form-item>
                        <Form-item label="部门名称:" :label-width="80">
                            <Input type="text" v-model="addData.deptDesc" placeholder="部门名称"></Input>
                        </Form-item>
                        <Form-item label="账户状态:" :label-width="65">
                            <Radio-group v-model="addData.status">
                                <Radio v-for="item in statusList" :key="item" :label="item.val">{{item.text}}</Radio>
                          </Radio-group>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" style="text-align:center;">
                    <Button type="primary" size="large">提交</Button>
                </div>
            </Modal>
        </div>
        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="roleData" class="tableCenter"></Table>
            <Page :total="total" placement="top" @on-change="clickPage" show-total show-elevator class="departPage"></Page>
        </div>
        <Modal v-model="edit" width="360" :mask-closable="false">
            <p slot="header" class="title">
                <span>修改部门</span>
            </p>
            <div class="text-align">
                <Form ref="addData" :model="editData" inline>

                    <Form-item label="部门编码:" prop="deptCode" :label-width="80">
                        <Input type="text" v-model="editData.deptCode" placeholder="部门编码" disabled></Input>
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
                <Button type="primary" size="large"  >提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import Action from '../actions/action'
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
            addData:{
                deptCode:'',
                deptDesc:'',
                status:'O'
            },
            editData:{
                deptCode:'',
                deptDesc:'',
                status:'O'
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
                    title: '编号',
                    key: 'orleCode'
                },
                {
                    title: '名称',
                    key: 'orleDesc'
                },
                {
                    title: '创建时间',
                    key: 'createDate'
                },
                {
                    title: '操作',
                    key: 'action',
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
                                            this.editRole(params.row.orleCode, params.row.orleDesc)
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
                                          this.remove(params.row.orleCode)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                }
            ],
            roleData: []
        }
    },
    methods: {
      addRole () {
          this.$router.push({ path:'/index/role_add'})
      },
      remove (id) {
        this.self.removeRole (id)
      },
      editRole (code, desc) {
        this.self.editClick(code, desc)
      },
      clickPage (a) {
        this.self.getRoleList ( a )
      }
    },
    mounted () {
        this.self = new Action(this)
        this.self.getRoleList ( this.current )
    }

  }
</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }

</style>
