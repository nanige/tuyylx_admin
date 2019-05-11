<template>
  <div>
    <Breadcrumb class="Breadcrumb">
      <Breadcrumb-item>主题管理</Breadcrumb-item>
    </Breadcrumb>
    <div class="searchAndExport">
      <Form :model="search" label-position="left" :label-width="50">
        <Form-item label="名称:">
          <Input v-model="search.deptDesc" style="width:200px"></Input>
          <Button type="primary" class="margin-left">查询</Button>
        </Form-item>
      </Form>
    </div>
    <Button type="success" @click="clickAdd">添加线路主题</Button>
    <div class="infoList">
      <Table border :columns="departTitle" stripe :data="lineThemeData" class="tableCenter"></Table>
      <Page :total="total" placement="top" show-total show-elevator class="departPage"></Page>
    </div>
    <!--添加线路主题-->
    <Modal v-model="addTheme" title="添加线路主题" @on-ok="pageAddThemeList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineThemeForm" :rules="ruleLineTheme" :label-width="50">
          <Form-item label="编号" prop="themeCode">
            <Input v-model="lineThemeForm.themeCode" @on-blur="pageCheckThemeCode" placeholder="请输入编号"></Input>
            <span v-text="checkMessage.themeCode" v-if="checkMessage.themeCodeStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="名称" prop="themeName">
            <Input v-model="lineThemeForm.themeName" @on-blur="pageCheckThemeName" placeholder="请输入名称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="排序" prop="sort">
            <Input v-model="lineThemeForm.sort" placeholder="请输入排序"></Input>
          </Form-item>
          <Form-item label="状态" prop="gender">
            <Radio-group v-model="lineThemeForm.hide">
              <Radio label="0">显示</Radio>
              <Radio label="1">不显示</Radio>
            </Radio-group>
          </Form-item>
        </Form>
        </Col>
      </Row>
    </Modal>
    <!--编辑线路主题-->
    <Modal v-model="editTheme" title="编辑线路主题" @on-ok="pageEditThemeList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineThemeForm" :rules="ruleLineTheme" :label-width="50">
          <Form-item label="名称" prop="themeName">
            <Input v-model="lineThemeForm.themeName" @on-blur="pageCheckThemeName" placeholder="请输入名称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="排序" prop="sort">
            <Input v-model="lineThemeForm.sort" placeholder="请输入排序"></Input>
          </Form-item>
          <Form-item label="状态" prop="gender">
            <Radio-group v-model="lineThemeForm.hide">
              <Radio label="0">显示</Radio>
              <Radio label="1">不显示</Radio>
            </Radio-group>
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
        lineThemeForm: {
          themeCode: '',
          themeName: '',
          sort: '',
          hide: ''
        },
        checkMessage: {
          name: '',
          nameStatus: '',
          themeCode: '',
          themeCodeStatus: ''
        },
        ruleLineTheme: {
          themeCode: [
            { required: true, message: '主题不能为空', trigger: 'blur' }
          ],
          themeName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ]
        },
        editTheme: false,
        addTheme: false,
        self: '',
        total: 0,
        current: 1,
        search: {
          deptDesc: ''
        },
        addData: {
          deptCode: '',
          deptDesc: '',
          status: 'O'
        },
        editData: {
          deptCode: '',
          deptDesc: '',
          status: 'O'
        },
        statusList: [{
          text: '正常',
          val: 'O'
        },
        {
          text: '删除',
          val: 'D'
        },
        {
          text: '锁定',
          val: 'L'
        }],
        departTitle: [
          {
            title: '名称',
            key: 'themeName'
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
                      this.editTheme = true
                      this.lineThemeForm.themeCode = params.row.themeCode
                      this.lineThemeForm.themeName = params.row.themeName
                      this.lineThemeForm.sort = params.row.sort
                      this.lineThemeForm.hide = params.row.hide
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
                      this.lineThemeForm.themeCode = params.row.themeCode
                      this.pageDelThemeList()
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        lineThemeData: []
      }
    },
    methods: {
      clickAdd () {
        this.addTheme = true
        this.lineThemeForm.themeCode = ''
        this.lineThemeForm.themeName = ''
        this.lineThemeForm.sort = ''
        this.lineThemeForm.hide = ''
        this.checkMessage.nameStatus = 200
        this.checkMessage.themeCodeStatus = 200
      },
      pageCheckThemeName () {
        if(!this.lineThemeForm.themeName == '' ){
          this.self.checkThemeName({themeName: this.lineThemeForm.themeName})
        }
      },
      pageCheckThemeCode () {
        if(!this.lineThemeForm.themeCode == '' ){
          this.self.checkThemeCode({themeCode: this.lineThemeForm.themeCode})
        }
      },
      pageAddThemeList () {
        this.self.addThemeList(this.lineThemeForm)
      },
      pageEditThemeList () {
        this.self.editThemeList(this.lineThemeForm)
      },
      pageDelThemeList () {
        this.self.delThemeList(this.lineThemeForm)
      }
    },
    mounted () {
      this.self = new Action(this)
      this.lineThemeData = this.self.getThemeList(this.listData)
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
