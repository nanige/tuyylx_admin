<template>
  <div>
    <Breadcrumb class="Breadcrumb">
        <Breadcrumb-item>线路列表</Breadcrumb-item>
    </Breadcrumb>
    <div class="query-form">
      <Form :model="queryForm" :rules="queryRuleInline" :label-width="80">
        <Row>
          <Col span="6">
            <Form-item label="线路名称"  prop="linename">
              <Input type="text" v-model="queryForm.linename" placeholder="线路名称"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="线路编号" prop="linecode">
              <Input type="text" v-model="queryForm.linecode" placeholder="线路编号"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="供应商编码"  prop="vencode">
              <Input type="text" v-model="queryForm.vencode" placeholder="供应商编码"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="出发地">
              <Select v-model="queryForm.cityCode" placeholder="请选择出发地">
                <Option value="item.cityCode" v-for="item in goCityList" :key="123">{{item.cityName}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="状态">
              <Select v-model="queryForm.isapp" placeholder="请选择出发地">
                <Option value="0" >未审核</Option>
                <Option value="1" >审核不通过</Option>
                <Option value="2" >审核通过</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="多选框">
              <Checkbox v-model="zhua">推荐</Checkbox>
              <Checkbox v-model="zhub">新品</Checkbox>
              <Checkbox v-model="zhuc">热销</Checkbox>
              <Checkbox v-model="zhud">特价</Checkbox>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item>
              <Button type="primary" @click="searchSubmit">查询</Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </div>
    <div>
      <Button type="success" :disabled="buttonOff == ''" @click="linelistAuditButton(1,2)">审核通过</Button>
      <Button type="error" :disabled="buttonOff == ''" @click="linelistAuditButton(0,1)">拒绝审核</Button>
    </div>
    <div class="infoList">
        <Table @on-selection-change="selectLineList" border :columns="lineListTitle" stripe :data="lineListData" class="tableCenter"></Table>
        <!--<Page :total="total" placement="top" show-total show-elevator class="departPage"></Page>-->
    </div>
  </div>
</template>
<script>
  import Action from '../actions/action'
  export default {
    name: 'department',
    data () {
      return {
        goCityList: '', // 出发地列表
        zhua: false,
        zhub: false,
        zhuc: false,
        zhud: false,
        buttonOff: [], // 判断审核按钮，空不可点
        selectLineListArr: {
          lineCodeList: [],
          sellStatus: '',
          isapp: ''
        },
        queryForm: {
          linename: '',
          linecode: '',
          vencode: '',
          isapp: '',
          isNew: '',
          isHot: '',
          isPromote: '',
          isRecommend: ''
        },
        queryRuleInline: {

        },
        lineListTitle: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '线路名称',
            key: 'linename'
          },
          {
            title: '线路编号',
            key: 'linecode'
          },
          {
            title: '供应商编码',
            key: 'vencode'
          },
          {
            title: '审核状态',
            key: 'isapp'
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
                      this.$router.push({
                        path: '/index/line_release_edit',
                        query: {
                          vencode: params.row.vencode,
                          linecode: params.row.linecode,
                          natureCode: params.row.natureCode,
                          lineTypecode: params.row.lineTypecode
                        }
                      })
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
                      this.clickDelLineList(params.row.linecode)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        lineListData: []
      }
    },
    methods: {
      searchSubmit () {
        if (this.zhua) {
          this.queryForm.isRecommend = 0
        } else {
          this.queryForm.isRecommend = 1
        }
        if (this.zhub) {
          this.queryForm.isNew = 0
        } else {
          this.queryForm.isNew = 1
        }
        if (this.zhuc) {
          this.queryForm.isHot = 0
        } else {
          this.queryForm.isHot = 1
        }
        if (this.zhud) {
          this.queryForm.isPromote = 0
        } else {
          this.queryForm.isPromote = 1
        }
        this.self.searchSubmit(this.queryForm)
      },
      selectLineList (data) {
        this.buttonOff = data
        for (let value of data) {
          this.selectLineListArr.lineCodeList.push(value.linecode)
        }
      },
      linelistAuditButton (sellStatus, isapp) { // 线路列表审核
        this.selectLineListArr.sellStatus = sellStatus
        this.selectLineListArr.isapp = isapp
        this.self.linelistAudit({model:JSON.stringify(this.selectLineListArr)})
      },
      clickDelLineList (data) { // 线路列表删除
        this.self.delLineList({linecode: data})
      }
    },
    mounted () {
      this.self = new Action(this)
      this.self.searchSubmit()
      this.self.getGoCityList()
    }
  }
</script>
<style lang="less">
  .query-form{
    padding: 20px 0;
    .ivu-input-wrapper{
      width: 70%;
    }
    .ivu-select{
      width: 70%;
    }
  }
  .ivu-modal-header-inner{
    color: #fff!important;
  }
  .departPage {
      float: right;
      margin-top:20px;
  }

</style>
