<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>添加分销商</Breadcrumb-item>
        </Breadcrumb>

        <Form ref="operator" :model="operator" :rules="operatorCustom" :label-width="120" >
            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">基本信息</p>
                <Row>
                    <Col span="10">
                        <Form-item label="经销商编号：" prop="venCode">
                            <Input v-model="operator.cusCode" :maxlength="20" placeholder="数字字母组合长度小于20 例：A12"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="简称：">
                            <Input v-model="operator.shoperName" placeholder="数字字母组合长度小于3 例：TYY"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="经销商名称：" prop="venName">
                            <Input v-model="operator.cusName" placeholder="数字字母组合长度小于100 例：广州途优游信息科技有限公司"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='23'>
                        <Form-item label="所属公司：" prop="fCmpId">
                             <Input style="width:750px"  v-model="operator.fCmpId" placeholder="请输入所属公司"></Input>
                        </Form-item>
                    </Col>
                    <Col span='1'>
                        <Button style="font-weight:600;padding: 5px 10px!important; color:#000"  type="ghost">· · ·</Button>

                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                        <Form-item label="账号：" prop="accountNo">
                            <Input v-model="operator.sysNo" placeholder="字母组合长度小于20 例：YYSGDTYY" disabled></Input>
                        </Form-item>
                        <Form-item label="开始日期："  prop="startTime">
                            <Date-picker type="date" @on-change="dataChange" placeholder="选择帐号开始日期和时间" v-model="operator.startTime"></Date-picker>
                        </Form-item>
                        <Form-item label="上传营业执照：">
                            <Row>
                                <Col span= "20">
                                    <Input v-model="operator.cardPic"></Input>
                                </Col>
                                <Col span= "2">
                                    <Upload :action="api + '/sys/ocmp/upload.do'" @on-preview="upLoad" :show-upload-list="false">
                                        <Button type="ghost" style="margin-left:7px;font-weight:600;padding: 6px 10px!important; color:#000">· · ·</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Form-item>
                        <Row>
                                <Col span= "20">
                                    <img src="" alt="">
                                </Col>
                            </Row>
                    </Col>
                    <Col span='10' offset="4">
                        <Form-item label="密码：" prop="sysPwd">
                            <Input type="password" v-model="operator.sysPwd" placeholder="数字字母组合长度小于20"></Input>
                        </Form-item>
                        <Form-item label="截止日期：" prop="endTime">
                            <Date-picker type="date" @on-change="dataEndChange" placeholder="选择账号截止日期和时间" v-model="operator.endTime"></Date-picker>
                        </Form-item>
                        <Form-item label="执照编码：" prop="cardCode">
                            <Input v-model="operator.cardCode" placeholder="18位数字字母组合 例：YYSGDTYY"></Input>
                        </Form-item>
                        <Form-item label="法       人：" prop="legalPerson">
                            <Input v-model="operator.legalPerson" placeholder="请输入法人姓名"></Input>
                        </Form-item>
                        <Form-item label="法人身份证：" prop="legadid">
                            <Input v-model="operator.legadid" placeholder="请输入18位身份证" :maxlength="18"></Input>
                        </Form-item>
                        <Form-item label="注册资金：" prop="regcapital">
                                <Input v-model="operator.regcapital" :maxlength="10" placeholder="请输入注册资金"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Card>

            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">开户信息</p>
                <Row>
                    <Col span='11'>
                        <Form-item label="银行账号：">
                            <Input v-model="operator.bankNo" placeholder="请输入银行账号"></Input>
                        </Form-item>
                    </Col>
                    <Col span='11' offset="2">
                        <Form-item label="账号名称：">
                            <Input v-model="operator.accountNo" placeholder="请输入账号名称"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='24'>
                        <Form-item label="开户银行：">
                            <Input v-model="operator.bankName" placeholder="开户银行及分行详细名称"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='24'>
                        <Form-item label="开户行地址：">
                            <Input v-model="operator.bankAddress" placeholder="请输入开户行地址"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Card>
            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">联系信息</p>
                <Row>
                    <Col span='24'>
                        <Form-item label="联系地址：">
                            <Select v-model="operator.areaCode" size="small" @on-change="chooseAreaBig" style="width:100px;margin-right:15px;">
                                <Option v-for="item in areaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                            <Select v-model="operator.provinceCode" @on-change="chooseProvince" size="small" style="width:100px;margin-right:15px;">
                                <Option v-for="item in provinceCodeList" :value="item.provinceCode" :key="item">{{ item.provinceName }}</Option>
                            </Select>
                            <Select v-model="operator.oreaCode" @on-change="chooseOrea" size="small" style="width:100px;margin-right:15px;">
                                <Option v-for="item in oreaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                            <Select v-model="operator.cityCode" size="small" style="width:100px;margin-right:15px;">
                                <Option v-for="item in cityList" :value="item.cityCode" :key="item">{{ item.cityName }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='24'>
                       <Form-item label="详细地址：">
                            <Input v-model="operator.address" placeholder="请输入详细地址"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='8'>
                       <Form-item label="联系人：">
                            <Input v-model="operator.ctName" placeholder="请输入公司联系人姓名"></Input>
                        </Form-item>
                    </Col>
                    <Col span='8'>
                       <Form-item label="电话：">
                            <Input v-model="operator.tel" placeholder="请输入公司固定电话"></Input>
                        </Form-item>
                    </Col>
                    <Col span='8'>
                       <Form-item label="手机：">
                            <Input v-model="operator.mobile" placeholder="请输入公司联系人手机"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='8'>
                       <Form-item label="邮箱：">
                            <Input v-model="operator.email" placeholder="请输入公司联系邮箱"></Input>
                        </Form-item>
                    </Col>
                    <Col span='8'>
                       <Form-item label="传真：">
                            <Input v-model="operator.fax" placeholder="请输入公司传真"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='24'>
                       <Form-item label="备注：">
                            <Input type="textarea" v-model="operator.remark" placeholder="请输入其它备注"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Form-item>
                    <Button type="primary"  class="submit" @click="submitFn ('operator')">确认提交</Button>
                </Form-item>
            </Card>

        </Form>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import Util  from '../commons/util'
  export default {
    data() {
        return {
            self: '',
            util:'',
            api:'',
            isProduct:true,
            fcmpChooise:false,
            current:1,
            departData:[],
            operator:{
                //基本信息
                cusCode:'',
                cusName:'',
                shoperName:'',
                fCmpId:'',
                startTime:'',
                endTime:'',
                cardPic:'',
                cardCode:'',
                legalPerson:'',
                legadid:'',
                regcapital:'',
                legadtype:'1',
                sysPwd:'',
                sysNo:'admin',

                //开户信息
                bankNo:'',
                accountNo:'',
                bankName:'',
                bankAddress:'',

                //联系信息
                    //区域
                areaCode:'',
                provinceCode:'',
                oreaCode:'',
                cityCode:'',

                    //联系方式
                address:'',
                ctName:'',
                tel:'',
                mobile:'',
                email:'',
                fax:'',
                remark:'',
            },
            operatorCustom:{
                cmpType:[{ required: true, message: '请选择公司类型', trigger: 'change' }],
                legalPerson:[{ required: true, message: '法人姓名不能为空', trigger: 'change' }],
                legadid:[{ required: true, message: '法人证件号码不能为空', trigger: 'change' }],
                fCmpType:[{ required: true, message: '所属公司类别不能为空', trigger: 'change' }],
                dbID:[{ required: true, message: '数据库编码不能为空', trigger: 'blur' }],
                startTime:[{ required: true, message: '开始时间不能为空', trigger: 'change' }],
                endTime:[{ required: true, message: '结束时间不能为空', trigger: 'change' }],
                cardCode:[{ required: true, message: '营业执照编码不能为空', trigger: 'blur' }],
                legalPerson:[{ required: true, message: '法人不能为空', trigger: 'blur' }],
                legadid:[{ required: true, message: '法人身份证不能为空', trigger: 'blur' }],
                regcapital:[{ required: true, message: '注册基金不能为空', trigger: 'blur' }]
            },
            cmpList:[{
                label:'0',
                text:'平台总部'
            },{
                label:'2',
                text:'运营商'
            }],
            fcmpColumns:[{
                title:'选择',
                align:'center',
                render: (h, params) => {
                    return `<i-Radio :label="${params.row}"><i-Radio>`
                }
            },{
                title:'公司编号',
                key:'cmpID'
            },{
                title:'公司名称',
                key:'cmpName'
            }],
            areaCodeList:[],
            provinceCodeList:[],
            oreaCodeList:[],
            cityList:[]
        }
    },
    created () {
        if ( this.operator.isProductCenter === '0' ) {
            this.isProduct = false
        }
    },
    mounted () {
        this.self = new Action(this)
        this.self.getOrea ( { level: 0 } )

        this.api = new Config().getApi()

        this.util = new Util()
        this.util.timeFormat()
        let thisDate = new Date().format('yyyy-MM-dd')

        this.operator.startTime = thisDate

        this.operator.endTime = this.util.getDateStr (thisDate)
    },
    methods: {
        submitFn (name) {
            this.self.add (this.operator,'ocust')
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
        productChange () {
            this.operator.isProductCenter === '0' ? this.isProduct = false: this.isProduct = true
        },
        dataChange ( data ) {
            this.operator.startTime = data

            this.operator.endTime = this.util.getDateStr (data)
        },
        dataEndChange ( data ) {
            this.operator.endTime = data
        },
        upLoad ( file ) {

        },
        fcmpShow () {
            this.fcmpChooise = true

            this.self.getOperator (this.current)
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

    .infoList {
        margin-top: 20px;
    }
    .submit {
        margin-left: 250px;
    }
    .enterRow {
        height:56px;
    }
    .fcmpTable {
        .ivu-table-header {
            table { width: 100%;}
        }
        .ivu-table-body {
            table { width: 100%;}
        }
    }
</style>
