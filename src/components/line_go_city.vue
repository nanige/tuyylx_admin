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
      <Table border :columns="departTitle" stripe :data="lineCityData" class="tableCenter"></Table>
      <Page :total="total" placement="top" show-total show-elevator class="departPage"></Page>
    </div>
    <!--添加城市-->
    <Modal v-model="addCity" title="添加城市" @on-ok="pageAddCityList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineCityForm" :rules="ruleLineCity" :label-width="80">
          <Form-item label="城市编号" prop="cityCode">
            <Input v-model="lineCityForm.cityCode" @on-blur="pageCheckCityCode" placeholder="请输入城市编号"></Input>
            <span v-text="checkMessage.cityCode" v-if="checkMessage.cityCodeStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="城市名称" prop="cityName">
            <Input v-model="lineCityForm.cityName" @on-blur="pageCheckCityCode" placeholder="请输入城市名称"></Input>
          </Form-item>
          <Form-item label="简称" prop="cityShortName">
            <Input v-model="lineCityForm.cityShortName"  placeholder="请输入简称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="拼音" prop="abbreviation">
            <Input v-model="lineCityForm.abbreviation"  placeholder="请输入拼音"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="是否国内" prop="gender">
            <Radio-group v-model="lineCityForm.isdomestic">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="省份编号" prop="provinceCode">
            <Select v-model="lineCityForm.provinceCode" placeholder="请选择省份编号">
              <Option :value="item.provinceCode" v-for="item in provinceList" :key="item">{{item.provinceCode}}</Option>
            </Select>
          </Form-item>
          <Form-item label="区域" prop="areaCode">
            <Select v-model="lineCityForm.areaCode" placeholder="请选择区域">
              <Option :value="item.areaCode" v-for="item in areaList" :key="item">{{item.areaCode}}</Option>
            </Select>
          </Form-item>
        </Form>
        </Col>
      </Row>
    </Modal>
    <!--编辑城市-->
    <Modal v-model="editCity" title="编辑城市" @on-ok="pageEditCityList" >
      <Row>
        <Col span="20" class="margin-center">
        <Form :model="lineCityForm" :rules="ruleLineCity" :label-width="80">
          <Form-item label="城市名称" prop="cityName">
            <Input v-model="lineCityForm.cityName" @on-blur="pageCheckCityCode" placeholder="请输入城市名称"></Input>
          </Form-item>
          <Form-item label="简称" prop="cityShortName">
            <Input v-model="lineCityForm.cityShortName"  placeholder="请输入简称"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="拼音" prop="abbreviation">
            <Input v-model="lineCityForm.abbreviation"  placeholder="请输入拼音"></Input>
            <span v-text="checkMessage.name" v-if="checkMessage.nameStatus == 300" style="color:red"></span>
          </Form-item>
          <Form-item label="是否国内" prop="gender">
            <Radio-group v-model="lineCityForm.isdomestic">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="省份编号" prop="provinceCode">
            <Select v-model="lineCityForm.provinceCode" placeholder="请选择省份编号">
              <Option :value="item.provinceCode" v-for="item in provinceList" :key="item">{{item.provinceCode}}</Option>
            </Select>
          </Form-item>
          <Form-item label="区域" prop="areaCode">
            <Select v-model="lineCityForm.areaCode" placeholder="请选择区域">
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
        lineCityForm: {
          cityCode: '',
          cityName: '',
          cityShortName: '',
          abbreviation: '',
          isdomestic: '0',
          provinceCode: '',
          areaCode: ''
        },
        provinceList: '',
        areaList: '',
        checkMessage: {
          cityCode: '',
          cityCodeStatus: ''
        },
        ruleLineCity: {
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
        editCity: false,
        addCity: false,
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
            key: 'cityCode'
          },
          {
            title: '名称',
            key: 'cityName'
          },
          {
            title: '简称',
            key: 'cityShortName'
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
                      this.editCity = true
                      this.lineCityForm.cityCode = params.row.cityCode
                      this.lineCityForm.cityName = params.row.cityName
                      this.lineCityForm.cityShortName = params.row.cityShortName
                      this.lineCityForm.abbreviation = params.row.abbreviation
                      this.lineCityForm.isdomestic = params.row.isdomestic
                      this.lineCityForm.provinceCode = params.row.provinceCode
                      this.lineCityForm.areaCode = params.row.areaCode
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
                      this.lineCityForm.cityCode = params.row.cityCode
                      this.pageDelCityList()
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        lineCityData: []
      }
    },
    methods: {
      clickAdd () {
        this.addCity = true
        this.lineCityForm.cityCode = ''
        this.lineCityForm.cityName = ''
        this.lineCityForm.cityCode = ''
        this.lineCityForm.cityName = ''
        this.lineCityForm.cityShortName = ''
        this.lineCityForm.abbreviation = ''
        this.checkMessage.nameStatus = 200
        this.checkMessage.cityCodeStatus = 200
      },
      pageCheckCityCode () {
        if(!this.lineCityForm.cityCode == '' ){
          this.self.checkCityCode({cityCode: this.lineCityForm.cityCode})
        }
      },
      pageAddCityList () {
        this.self.addCityList(this.lineCityForm)
      },
      pageEditCityList () {
        this.self.editCityList(this.lineCityForm)
      },
      pageDelCityList () {
        this.self.delCityList(this.lineCityForm)
      }
    },
    mounted () {
      this.self = new Action(this)
      this.lineCityData = this.self.getCityList(this.listData)
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
