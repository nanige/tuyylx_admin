<template>
    <div>
       <header class="role-add-header">
            <span>编辑导游</span>
       </header>
       <Form ref="guideData" :model="guideData" :rules="ruleValidate" :label-width="120" >
            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">基本信息  
                    <Button type="text" style="float:right" @click="openCard ('base')">
                        <Icon :type="icon_type"></Icon>
                    </Button>
                </p>
                <div v-if="isOpen === true">
                <Row>
                    <Col span="10"  >
                        <Form-item label="导游编码:" prop="guidecode" :label-width="100">
                            <Input type="text" v-model="guideData.guidecode" disabled placeholder="导游编码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="导游姓名:" prop="guidename" :label-width="100">
                            <Input type="text" v-model="guideData.guidename" placeholder="导游姓名"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"  >
                        <Form-item label="导游级别:" prop="level" :label-width="100">
                            <Input type="text" v-model="guideData.level" placeholder="导游级别"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="导游资格证号:" prop="certificate" :label-width="100">                  
                            <Input v-model="guideData.certificate" id="certificate" :maxlength="20" placeholder="导游资格证号"></Input> 
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"  >
                        <Form-item label="价格:" prop="price" :label-width="100">
                            <Input type="text" v-model="guideData.price" placeholder="价格"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="备注:" prop="memo" :label-width="100">
                            <Input type="text" v-model="guideData.memo" placeholder="备注"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                        <Form-item label="导游语言:" :label-width="110">
                            <label v-for="(language, index) in guideData.olgeList" :key="language" style="margin-right: 20px;">
                              <input v-model="language.checked" type="checkbox" >{{language.languagename}}
                            </label>
                        </Form-item>
                    </Col>
                </Row>
                </div>
                <div v-else-if="isOpen === false">
                    <p style="color:#ed3f14;text-align:center;">点击右上角按钮打开面板</p>
                </div>
            </Card>
        </Form>
        <div class="btn">
            <Button type="success"  class="submit" @click="submitFn()">确认提交</Button>
            <Button type="ghost" @click="cancel">取消</Button>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import getList from '../actions/list'
  export default {
    name: 'guide_edit',
    data() {
      return {
        guideData:{
            guidecode: '',
            guidename: '',
            level :'',  
            certificate: '',
            price: '',
            memo: '',
            languagecodes: '',
            olgeList: [],
            codeStr: ''
        },
        ruleValidate: {
          guidecode: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        permListEidt: '',
        baseData: [],
        selectArr: [],
        isOpen:true,
        isOpenBank:true,
        isOpenAddr:true,
        icon_type:'chevron-up',
        icon_type_bank:'chevron-up',
        icon_type_addr:'chevron-up'
      }
    },
    methods: {
      submitFn(name) { //点击提交按钮
        this.guideData.languagecodes = ''
        for(let value of this.guideData.olgeList.entries()){
          if(value[1].checked){
            if (this.guideData.languagecodes.length > 0) {
              this.guideData.languagecodes += ','
            }
            this.guideData.languagecodes += value[1].languagecode
          }
        }
        this.self.editGuide(this.guideData)
      },
      cancel () {
        this.$router.push({ path: '/index/guide' })
      },
      openCard ( name ) {
          switch ( name ) {
              case 'base':
                  this.isOpen === true ? this.isOpen = false : this.isOpen = true
                  this.icon_type === 'chevron-up' ? this.icon_type = 'chevron-down' : this.icon_type = 'chevron-up'
                  break
              case 'blank':
                  this.isOpenBank === true ? this.isOpenBank = false : this.isOpenBank = true
                  this.icon_type_bank === 'chevron-up' ? this.icon_type_bank = 'chevron-down' : this.icon_type_bank = 'chevron-up'
                  break
              case 'addr':
                  this.isOpenAddr === true ? this.isOpenAddr = false : this.isOpenAddr = true
                  this.icon_type_addr === 'chevron-up' ? this.icon_type_addr = 'chevron-down' : this.icon_type_addr = 'chevron-up'
          }
      }
    },
    created () {
      
    },
    mounted () {
      this.self = new Action(this)
      this.guideData.guidecode = this.$route.query.guidecode
      getList.getGuideDetail(this.guideData, this);
    }
  }

</script>
<style lang="less">

    .role-add-header{
        border-bottom: 2px solid #ccc;
        height: 30px;
        margin-bottom: 20px!important;
        span{
            height: 30px;
            display: inline-block;
            font-size: 16px;
            border-bottom: 2px solid #441471;
        }
    }
    .role-label{
        font-size: 14px;
        .role-input{
            width: 200px!important;
        }

        .ivu-form-item-label{
            font-size: 14px!important;
        }
    }
    .role-perm{
        border: 1px solid #ccc;
        .role-perm-title{
            padding: 10px 10px;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
        }
        .role-tab{
            margin: 10px;
            label{
              margin: 0 20px;
              position: relative;
              input{
                position: absolute;
                left: -15px;
                top:0;
              }
            }
        }
    }
    .header-conditions{
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 20px;
      .ivu-form-item{
        margin-bottom: 0px!important;
      }
    }
    .role-add-button{
      text-align: center;
      button{
        background: #441471;
        border: #441471;
        padding: 10px 20px!important;
        margin: 20px ;
      }
    }
    .role-add-title{
      padding: 7px 0;
      .tab-title{
        font-weight: 700;
        margin-right: 10px;
      }
    }
    .role-add-cont{
      border: 1px solid #ccc;
      margin-bottom: 15px;
      padding: 10px;
    }

</style>
