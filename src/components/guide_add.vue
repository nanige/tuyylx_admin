<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>添加导游</Breadcrumb-item>
        </Breadcrumb>

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
                            <Input type="text" v-model="guideData.guidecode" placeholder="导游编码"></Input>
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

            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">渠道信息  
                    <Button type="text" style="float:right" @click="openCard('channel')">
                        <Icon :type="icon_type_channel"></Icon>
                    </Button>
                </p>
                <div v-if="isOpenChannel === true">
                    <!-- 全渠道 -->
                    <div>
                        <div>
                            <div class="tree-title">
                                <label>{{channelData.name}}<input v-model="channelData.checked" type="checkbox"></label>
                            </div>
                        </div>
                        <div class="" style="margin-left:20px;">
                            <label><input v-model="channelData.checked" type="checkbox" >全渠道（设置了这个，所有人都可以看到）</label>
                        </div>
                    </div>
                    <!-- 线上渠道 -->
                    <div>
                        <div class="tree-title">
                            <label v-for="(offline, index) in channelData.list2" :key="offline">{{offline.name}}<input v-model="offline.checked" type="checkbox" ></label>
                        </div>
                        <div class="tree-title-child" v-for="operators in channelData.list2">
                            <div class="tree-title-child" v-for="operator in operators.list2" :key="operator">
                                <label><input v-model="operator.checked" type="checkbox" >{{"【运营商】" + operator.name}}</label>
                                <div class="tree-title">
                                    <label>分销商<input type="checkbox" ></label>
                                </div>
                                <div class="tree-title-child">
                                    <label v-for="distributor in operator.list2" :key="distributor"><input v-model="distributor.checked" type="checkbox" >{{distributor.name}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 线下渠道 -->
                    <div>
                        <div class="tree-title">
                            <label v-for="(offline, index) in channelData.list" :key="offline">
                                {{offline.name}}<input v-model="offline.checked" type="checkbox">
                            </label>
                        </div>
                        <div class="tree-title-child" v-for="operators in channelData.list">
                            <div v-for="operator in operators.list">
                                <div class="tree-title">
                                    <label :key="operator" @click.stop="selectOperator(operator)"><input v-model="operator.checked" type="checkbox">{{operator.name}}</label>
                                </div>
                                <div class="tree-title-child">
                                    <label><input v-model="operator.checked" type="checkbox" >{{"【运营商】" + operator.name}}</label>
                                    <div class="tree-title">
                                        <label>分销商</label>
                                    </div>
                                    <div class="tree-title-child">
                                        <div v-for="distributor in operator.list" :key="distributor" @click.stop="selectDistributor(this, distributor)"><input v-model="distributor.checked" type="checkbox" >{{distributor.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="isOpenChannel === false">
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
  import Config from '../config/config'
  import Util  from '../commons/util'
  import rule  from '../commons/rule'
  import getList from '../actions/list'
  export default {
    data() {
        return {
            //基本信息
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
            distrubutorStr: '',
            channelData:'',
            self: '',
            util:'',
            api:'',
            isProduct:true,
            fcmpChooise:false,
            current:1,
            cmpName:'',           
            ruleValidate:{
                guidecode:[
                    { required: true, message: '公司编号不能为空', trigger: 'blur' }
                ]
            },
            cmpList:[{
                label:'0',
                text:'平台总部'
            },{
                label:'2',
                text:'运营商'
            }],
            areaCodeList:[],
            provinceCodeList:[],
            oreaCodeList:[],
            cityList:[],
            isOpen:true,
            isOpenChannel:true,
            isOpenAddr:true,
            icon_type:'chevron-up',
            icon_type_channel:'chevron-up',
            icon_type_addr:'chevron-up'
        }
    },
    mounted () {
        this.self = new Action(this)
        this.self.getLanguage();
        this.api = new Config().getApi()
        this.util = new Util()
        this.util.timeFormat()
        let thisDate = new Date().format('yyyy-MM-dd')
        rule.bound (this)
        getList.getChannel(this)
    },
    methods: {
        submitFn (name) { //点击提交按钮
            this.languagecodes = ''
            for(let value of this.guideData.olgeList.entries()){
                if(value[1].checked){
                if (this.languagecodes.length > 0) {
                    this.languagecodes += ','
                }
                this.languagecodes += value[1].languagecode
                }
            }
            this.self.addGuide (this.guideData)
        },
        chooseAreaBig () {
            this.self.getProvince(this.operator.areaCode)
        },
        chooseProvince () {
            this.self.getOrea ( { level: 1, ProvinceCode:this.operator.provinceCode } )
        },
        chooseOrea () {
            this.self.getCity(this.operator.oreaCode)
        },
        dataChange ( data ) {
            this.operator.startTime = data

            this.operator.endTime = this.util.getDateStr (data)
        },
        dataEndChange ( data ) {
            this.operator.endTime = data
        },
        upLoad ( response, file, fileList ) {
            this.operator.cardPic = response.object
        },
        fcmpShow () {
            this.fcmpChooise = true

            this.self.getOperator (this.current)
        },
        openCard ( name ) {
            switch ( name ) {
                case 'base':
                    this.isOpen === true ? this.isOpen = false : this.isOpen = true
                    this.icon_type === 'chevron-up' ? this.icon_type = 'chevron-down' : this.icon_type = 'chevron-up'
                    break
                case 'channel':
                    this.isOpenChannel === true ? this.isOpenChannel = false : this.isOpenChannel = true
                    this.icon_type_channel === 'chevron-up' ? this.icon_type_channel = 'chevron-down' : this.icon_type_channel = 'chevron-up'
                    break
                case 'addr':
                    this.isOpenAddr === true ? this.isOpenAddr = false : this.isOpenAddr = true
                    this.icon_type_addr === 'chevron-up' ? this.icon_type_addr = 'chevron-down' : this.icon_type_addr = 'chevron-up'
            }
        },
        cancel () {
            this.$router.push({ path: '/index/guide' })
        },
        radioChange () {
            console.log(134567)
        },
        selectOffline() {
            //'{"21":"11,22","31":"55,66"}'
            this.guideData.codeStr = '';
            for (let offline of this.channelData.list.entries()){
                console.log("offline")
                console.log(offline)
                if (offline.checked) {
                    this.guideData.codeStr = '"' + offline[1].ID + '":""';
                }
                for (let operator of offline[1].list) {
                    operator.checked = offline[1].checked;
                    if (operator.checked) {
                        if (this.guideData.codeStr.length > 0) {
                            this.guideData.codeStr += ',';
                        }
                        this.guideData.codeStr += '"'+ operator.ID +'":';
                    }
                    this.distrubutorStr = '';
                    for (let distributor of operator.list) {
                        distributor.checked = offline[1].checked;
                        if (distributor.checked) {
                            if (this.distrubutorStr.length > 0) {
                                this.distrubutorStr += ',';
                            }
                            this.distrubutorStr += distributor.ID;
                        }
                    }
                    if (this.distrubutorStr.length > 0) {
                        this.guideData.codeStr += '"' + this.distrubutorStr + '"';
                    }
                }
            }
            this.guideData.codeStr = '{' + this.guideData.codeStr + '}';
            console.log(this.guideData.codeStr)
        },
        selectOperator (operator) {
            for (let distributor of operator.list) {
                distributor.checked = operator.checked;
            }
        },
        selectDistributor (elem, distributor) {
            distributor.checked;
        }
    }
  }
  
</script>
<style lang="less">
    .departPage {
        float: right;
        margin-top:20px;
    }
    .dfdfdf {
        background:#f8f8f9;
    }
    .searchAndExport {
        border:1px solid #dddee1;

        margin:20px 0;
        padding:25px 10px 10px 10px;
    }
    .submit {
        margin-left:20px;
    }
    .infoList {
        margin-top: 20px;
    }
    .enterRow {
        height:56px;
    }
    .btn {
        margin-bottom:100px;
    }

    .ivu-poptip {
        width:100%;
    }

    .ivu-poptip-rel {
        width:100%;
        
    }
    .ivu-poptip-body-content-inner {
        color:#ff9900!important;
    }
    .ivu-poptip-popper {
        width:100%;
        
    }
    .tree-title {
        color:#FFFFFF; 
        background-color:#777777; 
        height:30px; 
        line-height:30px; 
        padding-left:5px;
        margin-bottom:3px;
    }
    .tree-title-child {
        margin-left:20px;
    }
</style>
