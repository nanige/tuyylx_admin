<template>
    <div>
        <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>语种管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="searchAndExport">
            <Form :model="search" label-position="left" :label-width="80">
                <Form-item label="语种名称:">
                    <Input v-model="search.languagename" style="width:200px"></Input>
                    <Button type="primary" @click="searchAction (search)" class="margin-left"><Icon type="ios-search-strong"></Icon>
                    查询</Button>
                    <Button type="primary"  class="margin-left">导出数据</Button>
                </Form-item>
            </Form>
        </div>
        <!--<Button type="success" @click="addLanguage">添加</Button>-->
        <!--<Button type="success" class="addBtn" @click="addLanguage = true">-->
               <Button type="success" class="addBtn" @click="add = true">
                 <Icon type="person-add"></Icon> 添加
               </Button>

        <div>
            <Modal v-model="add" width="360" :mask-closable="false">
                <p slot="header" class="title">
                    <span>添加语种</span>
                </p>
                <div style="text-align:center">
                    <Form ref="addData" :model="addData" inline>

                        <Form-item label="语种编码:" prop="languagecode" :label-width="80">
                            <Input type="text" v-model="addData.languagecode" placeholder="语种编码"></Input>
                        </Form-item>
                        <Form-item label="语种简称:" :label-width="80">
                            <Input type="text" v-model="addData.languagedesc" placeholder="语种简称"></Input>
                        </Form-item>
                        <Form-item label="语言名称:" :label-width="80">
                            <Input type="text" v-model="addData.languagename" placeholder="语言名称"></Input>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer" style="text-align:center;">
                    <Button type="primary" class="ivu-btn-primary-ken" size="large"  @click="addLanguage(addData)">提交</Button>
                    <Button size="large"  @click="cancel()">取消</Button>
                </div>
            </Modal>
        </div>
        <div class="infoList">
            <Table border :columns="departTitle" stripe :data="languageData" class="tableCenter"></Table>
            <Page :total="total" placement="top" @on-change="clickPage" show-total show-elevator class="departPage"></Page>
        </div>
        <Modal v-model="edit" width="360" :mask-closable="false">
            <p slot="header" class="title">
                <span>修改语种</span>
            </p>
            <div class="text-align">
                <Form ref="addData" :model="editData" inline>

                    <Form-item label="语种编码:" prop="languagecode" :label-width="80">
                        <Input type="text" v-model="editData.languagecode" placeholder="语种编码" disabled></Input>
                    </Form-item>
                    <Form-item label="语种简称:" :label-width="80">
                        <Input type="text" v-model="editData.languagedesc" placeholder="语种简称"></Input>
                    </Form-item>
                    <Form-item label="语言名称:" :label-width="80">
                        <Input type="text" v-model="editData.languagename" placeholder="语言名称"></Input>
                    </Form-item>

                </Form>
            </div>
            <div slot="footer" style="text-align:center;">
                <Button type="primary" size="large" @click="commitEdit" >提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import getList from '../actions/list'
  export default {
    name: 'language',
    data () {
      return {
        self: '',
        add: false,
        edit: false,
        total: 0,
        current: 1,
        search: {
          languagename: ''
        },
        addData: {
          languagecode: '',
          languagedesc: '',
          languagename: ''
        },
        editData: {
          languagedesc: '',
          languagename: ''
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
            title: '语种编码',
            key: 'languagecode'
          },
          {
            title: '语种简称',
            key: 'languagedesc'
          },
          {
            title: '语言名称',
            key: 'languagename'
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
                      this.editLanguage(params.index)
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
                      this.remove(params.row.languagecode)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        languageData: []
      }
    },
    methods: {
      addLanguage (addData) {
        this.add = true
        this.self.addLanguagePerm(addData)
      },
      remove (id) {
        this.self.removeLanguage(id)
      },
      editLanguage (index) {
        this.edit = true
        this.editData = this.languageData[index]
      },
      commitEdit () {
        this.self.editLanguageInfo(this.editData)
      },
      clickPage (a) {
        this.self.getLanguageList(a)
      },
      checkCode (languagecode) {
        this.self.checkLanguageCode(this.addData.languagecode)
      },
      checkName (languagename) {
        this.self.checkLanguageName(this.addData.languagename)
      },
      searchAction (data) {
        getList.getLanguageList(data, this)
      },
      cancel () {
        this.add = false
        this.addData = {
          languagecode: '',
          languagedesc: '',
          languagename: ''
        }
      }
    },
    mounted () {
      this.self = new Action(this)
      getList.getLanguageList({current: this.current}, this)
    }

  }
</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }

</style>
