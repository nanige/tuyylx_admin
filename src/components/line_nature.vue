<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>参团性质</Breadcrumb-item>
        </Breadcrumb>
        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="50">
                <Form-item label="名称:">
                    <Input v-model="search.deptDesc" style="width:200px"></Input>
                    <Button type="primary" class="margin-left">查询</Button>
                </Form-item>
            </Form>
        </div>
        <Button type="success" @click="clickAdd">添加</Button>
        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="lineNatureData" class="tableCenter"></Table>
            <Page :total="total" placement="top" show-total show-elevator class="departPage"></Page>
        </div>
      <!--添加参团-->
      <Modal v-model="addNature" title="添加参团性质" @on-ok="pageAddNatureList" >
        <Row>
          <Col span="20" class="margin-center">
          <Form ref="formValidate" :model="lineNatureForm" :rules="ruleLineNature" :label-width="50">
            <Form-item label="编号" prop="natureCode">
              <Input v-model="lineNatureForm.natureCode" @on-blur="pageCheckNatureCode" placeholder="请输入编号"></Input>
              <span v-text="checkMessage.natureCode" v-if="checkMessage.natureCodeStatus == 300" style="color:red"></span>
            </Form-item>
            <Form-item label="名称" prop="natureName">
              <Input v-model="lineNatureForm.natureName" @on-blur="pageCheckNatureName" placeholder="请输入名称"></Input>
              <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
            </Form-item>
            <Form-item label="排序" prop="sort">
              <Input v-model="lineNatureForm.sort" placeholder="请输入排序"></Input>
            </Form-item>
          </Form>
          </Col>
        </Row>
      </Modal>
      <!--编辑参团-->
      <Modal v-model="editNature" title="编辑参团性质" @on-ok="pageEditNatureList" >
        <Row>
          <Col span="20" class="margin-center">
          <Form ref="formValidate" :model="lineNatureForm" :rules="ruleLineNature" :label-width="50">
            <Form-item label="名称" prop="natureName">
              <Input v-model="lineNatureForm.natureName" @on-blur="pageCheckNatureName" placeholder="请输入名称"></Input>
              <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
            </Form-item>
            <Form-item label="排序" prop="sort">
              <Input v-model="lineNatureForm.sort" placeholder="请输入排序"></Input>
            </Form-item>
          </Form>
          </Col>
        </Row>
      </Modal>
    </div>
</template>
<script>
  import Action from '../actions/action'
  export default {
    name: 'department',
    data () {
        return {
            listData: {
              page: 1
            },
            lineNatureForm: {
              natureCode: '',
              natureName: '',
              sort: ''
            },
            checkMessage: {
              name: '',
              nameStatus: '',
              natureCode: '',
              natureCodeStatus: ''
            },
            ruleLineNature: {
              natureCode: [
                { required: true, message: '编号不能为空', trigger: 'blur' }
              ],
              natureName: [
                { required: true, message: '名称不能为空', trigger: 'blur' }
              ],
              sort: [
                { required: true, message: '排序不能为空', trigger: 'blur' }
              ]
            },
            editNature: false,
            addNature: false,
            self: '',
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
                    title: '名称',
                    key: 'natureName'
                },
                {
                    title: '排序',
                    key: 'sort'
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
                                      this.editNature = true
                                      this.lineNatureForm.natureCode = params.row.natureCode
                                      this.lineNatureForm.natureName = params.row.natureName
                                      this.lineNatureForm.sort = params.row.sort

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
                                      this.lineNatureForm.natureCode = params.row.natureCode
                                      this.pageDelNatureList()
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
          lineNatureData: []
        }
    },
    methods: {
      clickAdd () {
        this.addNature = true
        this.lineNatureForm.natureCode = ''
        this.lineNatureForm.natureName = ''
        this.lineNatureForm.sort = ''
        this.checkMessage.nameStatus = 200
        this.checkMessage.themeCodeStatus = 200
      },
      pageCheckNatureName () {
        if(!this.lineNatureForm.natureName == '' ){
            this.self.checkNatureName({natureName: this.lineNatureForm.natureName})
        }
      },
      pageCheckNatureCode () {
        if(!this.lineNatureForm.natureCode == '' ){
          this.self.checkNatureCode({natureCode: this.lineNatureForm.natureCode})
        }
      },
      pageAddNatureList () {
        this.self.addNatureList(this.lineNatureForm)
      },
      pageEditNatureList () {
        this.self.editNatureList(this.lineNatureForm)
      },
      pageDelNatureList () {
        this.self.delNatureList(this.lineNatureForm)
      }
    },
    mounted () {
        this.self = new Action(this)
        this.lineNatureData = this.self.getNatureList(this.listData)
    }
  }
</script>
<style lang="less">
    .ivu-modal-header-inner{
      color: #fff!important;
    }
    .departPage {
        float: right;
        margin-top:20px;
    }

</style>
