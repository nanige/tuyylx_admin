<template>
  <div>
    <Breadcrumb class="Breadcrumb">
      <Breadcrumb-item>出发城市</Breadcrumb-item>
    </Breadcrumb>
    <div class="searchAndExport">
      <Form :model="search" label-position="left" :label-width="50">
        <Form-item label="名称:">
          <Input v-model="search.deptDesc" style="width:200px"></Input>
          <Button type="primary" class="margin-left">查询</Button>
        </Form-item>
      </Form>
    </div>
    <Button type="success" @click="clickAdd">添加城市</Button>
    <div class="infoList">
      <Table border :columns="departTitle" stripe :data="lineDestinationData" class="tableCenter"></Table>
      <Page :total="total" placement="top" show-total show-elevator class="departPage"></Page>
    </div>
    <!--添加城市-->
    <Modal v-model="addDestination" title="添加城市" @on-ok="pageAddDestinationList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineDestinationForm" :rules="ruleLineDestination" :label-width="80">
          <Form-item label="城市编号" prop="destinationCode">
            <Input v-model="lineDestinationForm.destinationCode" @on-blur="pageCheckDestinationCode" placeholder="请输入城市编号"></Input>
            <span v-text="checkMessage.destinationCode" v-if="checkMessage.destinationCodeStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="城市名称" prop="destinationName">
            <Input v-model="lineDestinationForm.destinationName" @on-blur="pageCheckDestinationCode" placeholder="请输入城市名称"></Input>
          </Form-item>
          <Form-item label="简称" prop="destinationShortName">
            <Input v-model="lineDestinationForm.destinationShortName"  placeholder="请输入简称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="拼音" prop="abbreviation">
            <Input v-model="lineDestinationForm.abbreviation"  placeholder="请输入拼音"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="是否国内" prop="gender">
            <Radio-group v-model="lineDestinationForm.isdomestic">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="省份编号" prop="provinceCode">
            <Select v-model="lineDestinationForm.provinceCode" placeholder="请选择省份编号">
              <Option :value="item.provinceCode" v-for="item in provinceList" :key="item">{{item.provinceCode}}</Option>
            </Select>
          </Form-item>
          <Form-item label="区域" prop="areaCode">
            <Select v-model="lineDestinationForm.areaCode" placeholder="请选择区域">
              <Option :value="item.areaCode" v-for="item in areaList" :key="item">{{item.areaCode}}</Option>
            </Select>
          </Form-item>
        </Form>
        </Col>
      </Row>
    </Modal>
    <!--编辑城市-->
    <Modal v-model="editDestination" title="编辑城市" @on-ok="pageEditDestinationList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineDestinationForm" :rules="ruleLineDestination" :label-width="80">
          <Form-item label="城市名称" prop="destinationName">
            <Input v-model="lineDestinationForm.destinationName" @on-blur="pageCheckDestinationCode" placeholder="请输入城市名称"></Input>
          </Form-item>
          <Form-item label="简称" prop="destinationShortName">
            <Input v-model="lineDestinationForm.destinationShortName"  placeholder="请输入简称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="拼音" prop="abbreviation">
            <Input v-model="lineDestinationForm.abbreviation"  placeholder="请输入拼音"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="是否国内" prop="gender">
            <Radio-group v-model="lineDestinationForm.isdomestic">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="省份编号" prop="provinceCode">
            <Select v-model="lineDestinationForm.provinceCode" placeholder="请选择省份编号">
              <Option :value="item.provinceCode" v-for="item in provinceList" :key="item">{{item.provinceCode}}</Option>
            </Select>
          </Form-item>
          <Form-item label="区域" prop="areaCode">
            <Select v-model="lineDestinationForm.areaCode" placeholder="请选择区域">
              <Option :value="item.areaCode" v-for="item in areaList" :key="item">{{item.areaCode}}</Option>
            </Select>
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
        lineDestinationForm: {
          destinationCode: '',
          destinationName: '',
          destinationShortName: '',
          abbreviation: '',
          isdomestic: '0',
          provinceCode: '',
          areaCode: ''
        },
        provinceList: '',
        areaList: '',
        checkMessage: {
          destinationCode: '',
          destinationCodeStatus: ''
        },
        ruleLinedestination: {
          cityCode: [
            { required: true, message: '城市编号不能为空', trigger: 'blur' }
          ],
          cityName: [
            { required: true, message: '城市名称', trigger: 'blur' }
          ],
          cityShortName: [
            { required: true, message: '简称不能为空', trigger: 'blur' }
          ],
          abbreviation: [
            { required: true, message: '拼音不能为空', trigger: 'blur' }
          ],
          provinceCode: [
            { required: true, message: '省份编号不能为空', trigger: 'blur' }
          ],
          areaCode: [
            { required: true, message: '区域不能为空', trigger: 'blur' }
          ]
        },
        editDestination: false,
        addDestination: false,
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
            title: '城市编号',
            key: 'destinationCode'
          },
          {
            title: '名称',
            key: 'destinationName'
          },
          {
            title: '简称',
            key: 'destinationShortName'
          },
          {
            title: '拼音',
            key: 'abbreviation'
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
                      this.editDestination = true
                      this.lineDestinationForm.destinationCode = params.row.destinationCode
                      this.lineDestinationForm.destinationName = params.row.destinationName
                      this.lineDestinationForm.destinationShortName = params.row.destinationShortName
                      this.lineDestinationForm.abbreviation = params.row.abbreviation
                      this.lineDestinationForm.isdomestic = params.row.isdomestic
                      this.lineDestinationForm.provinceCode = params.row.provinceCode
                      this.lineDestinationForm.areaCode = params.row.areaCode
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
                      this.lineDestinationForm.destinationCode = params.row.destinationCode
                      this.pageDelDestinationList()
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        lineDestinationData: []
      }
    },
    methods: {
      clickAdd () {
        this.addDestination = true
        this.lineDestinationForm.destinationCode = ''
        this.lineDestinationForm.destinationName = ''
        this.lineDestinationForm.destinationCode = ''
        this.lineDestinationForm.destinationName = ''
        this.lineDestinationForm.destinationShortName = ''
        this.lineDestinationForm.abbreviation = ''
        this.checkMessage.nameStatus = 200
        this.checkMessage.destinationCodeStatus = 200
      },
      pageCheckDestinationCode () {
        if(!this.lineDestinationForm.destinationCode == '' ){
          this.self.checkDestinationCode({destinationCode: this.lineDestinationForm.destinationCode})
        }
      },
      pageAddDestinationList () {
        this.self.addDestinationList(this.lineDestinationForm)
      },
      pageEditDestinationList () {
        this.self.editDestinationList(this.lineDestinationForm)
      },
      pageDelDestinationList () {
        this.self.delDestinationList(this.lineDestinationForm)
      }
    },
    mounted () {
      this.self = new Action(this)
      this.lineDestinationData = this.self.getDestinationList(this.listData)
      this.self.getProvincetList()
      this.self.getAreaList()
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
