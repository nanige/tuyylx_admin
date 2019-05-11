<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>导游管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="导游姓名:">
                    <Input v-model="search.guidename" style="width:200px"></Input>
                    <Button type="primary" @click="searchAction(search)"><Icon type="ios-search-strong"></Icon>查询</Button>
                    <Button type="primary" class="margin-left" @click="guideExport()">导出数据</Button>
                </Form-item>
            </Form>
        </div>
        <Button type="success" @click="addGuide">添加</Button>
        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="guideData" class="tableCenter"></Table>
            <Page :total="total" placement="top" @on-change="clickPage" show-total show-elevator class="departPage"></Page>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import getList from '../actions/list'
  export default {
    name: 'guide',
    data() {
        return {
            abcTime: '',
            self: '',
            add:false,
            edit:false,
            total:0,
            current:1,
            search:{
                guidename:''
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
                    title: '导游编号',
                    key: 'guidecode'
                },
                {
                    title: '导游姓名',
                    key: 'guidename'
                },
                {
                    title: '导游级别',
                    key: 'level'
                },
                {
                    title: '导游资格证号',
                    key: 'certificate'
                },
                {
                    title: '价格',
                    key: 'price'
                },
                {
                    title: '备注',
                    key: 'memo'
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
                                            this.viewGuideEdit(params.row.guidecode)
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
                                          this.remove(params.row.guidecode)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                }
            ],
            guideData: []
        }
    },
    methods: {
      addGuide () {
          this.$router.push({ path:'/index/guide_add'})
      },
      remove (guidecode) {
        this.self.removeGuide(guidecode)
      },
      viewGuideEdit (guidecode) {
        this.self.viewGuideEdit(guidecode)
      },
      clickPage (a) {
        this.self.getRoleList ( a )
      },
      abcObj () {
        console.log(this.abcTime)
      },
      searchAction (data) {
        getList.searchGuide ( data,this )
      },
      guideExport () {
        let api = new Config().getApi()
        location.href= api + '/sys/ogde/batchExport.do'
      }
    },
    mounted () {
        this.self = new Action(this)
        getList.getGuideList(this.current, this)
    }

  }
</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }

</style>
