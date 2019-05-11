<template>
    <div>
       <Breadcrumb class="Breadcrumb">
            <Breadcrumb-item>添加运营商</Breadcrumb-item>
        </Breadcrumb>

        <Form ref="operator" :model="operator" :rules="operatorCustom" :label-width="120" >
            <Card shadow style="width:950px; margin:15px 0 15px 20px;">
                <p slot="title">基本信息</p>
                <Row>
                    <Col span="10">
                        <Form-item label="运营商编号：" prop="cmpID">
                            <Input v-model="operator.cmpID" maxlength="" placeholder="数字字母组合长度小于20 例：A12"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="运营商简称：">
                            <Input v-model="operator.shoperName" placeholder="数字字母组合长度小于3 例：TYY"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="运营商名称：" prop="cmpName">
                            <Input v-model="operator.cmpName" placeholder="数字字母组合长度小于100 例：广州途优游信息科技有限公司"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <Form-item label="公司类别：" prop="cmpType">
                            <Select v-model="operator.cmpType">
                                <Option v-for="item in cmpList" :value="item.label" :key="item">{{ item.text }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="4">
                        <Form-item label="所属公司类别：" prop="fCmpType">
                            <Select v-model="operator.fCmpType">
                                <Option v-for="item in cmpList" :value="item.label" :key="item">{{ item.text }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='23'>
                        <Form-item label="所属公司：" prop="fCmpId">
                             <Input style="width:750px" v-model="operator.fCmpId" placeholder="请输入所属公司"></Input>
                        </Form-item>                    
                    </Col>
                    <Col span='1'>
                        <Button @click="fcmpShow" style="font-weight:600;padding: 5px 10px!important; color:#000"  type="ghost">· · ·</Button>
                        <Modal v-model="fcmpChooise" class="fcmpChooise" title="选择所属公司">
                            <table>
                                
                                <Radio-group v-model="operator.fCmpId" style="width:100%">
                                    <tr>
                                        <th>选择</th>
                                        <th>公司名称</th>
                                        <th>所在地</th>
                                        <th>状态</th>
                                    </tr>
                                    <tr v-for="item in departData" :key="item">
                                        <td>
                                            <Radio :label="item.cmpID">{{'  '}}</Radio>
                                        </td>
                                        <td>{{item.cmpName}}</td>
                                        <td>{{item.provinceName}}{{item.cityName}}</td>
                                        <td>
                                            <span v-if="item.status === 'O'">正常</span>
                                            <span v-else-if="item.status === 'D'">删除</span>
                                            <span v-else-if="item.status === 'L'">锁定</span>
                                            <span v-else="item.status === 'C'">取消</span>
                                        </td>
                                    </tr>
                                </Radio-group>
                            </table>
                        </Modal>  
                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                        <Form-item label="是否产品中心：" :label-width="110">
                            <Radio-group v-model="operator.isProductCenter" @on-change="productChange">
                                <Radio label="1">是</Radio>
                                <Radio label="0">否</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span='10' offset="4">
                        <Form-item label="所属产品中心：">
                            <Input v-model="operator.pdtctrcode" :disabled="isProduct" placeholder="请输入所属产品中心"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span='10'>
                        <Form-item label="账号：" prop="systNo">
                            <Input v-model="operator.systNo" placeholder="字母组合长度小于20 例：YYSGDTYY"></Input>
                        </Form-item>
                        <Form-item label="密码：" prop="sysPwd">
                            <Input type="password" v-model="operator.sysPwd" placeholder="数字字母组合长度小于20"></Input>
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
                        <Form-item label="数据库编号：" prop="dbID">
                            <Input v-model="operator.dbID" placeholder="字母组合长度小于20 例：YYSGDTYY"></Input>
                        </Form-item>
                        <div class="enterRow"></div>
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
                            <Input v-model="operator.legadid" placeholder="请输入18位身份证" maxlength="18"></Input>
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
                cmpID:'',
                cmpName:'',
                shoperName:'',
                fCmpType:'2',
                fCmpId:'',
                isProductCenter:'0',
                pdtctrcode:'',
                dbID:'',
                systNo:'',
                sysPwd:'',
                startTime:'',
                endTime:'',
                cardPic:'',
                cardCode:'',
                legalPerson:'',
                legadid:'',
                regcapital:'',
                legadtype:'1',

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
                ispdtctr:'0',
                cmpType:'2'
            },
            operatorCustom:{
                cmpID:[{ required: true, message: '公司编号不能为空', trigger: 'blur' }],
                cmpName:[{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
                systNo:[{ required: true, message: '账号不能为空', trigger: 'blur' }],
                sysPwd:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
                cmpType:[{ required: true, message: '请选择公司类型', trigger: 'change' }],
                legalPerson:[{ required: true, message: '法人姓名不能为空', trigger: 'change' }],
                legadid:[{ required: true, message: '法人证件号码不能为空', trigger: 'change' }],
                fCmpType:[{ required: true, message: '所属公司类别不能为空', trigger: 'change' }],
                dbID:[{ required: true, message: '数据库编码不能为空', trigger: 'blur' }],
                startTime:[{ required: true, message: '开始时间不能为空', trigger: 'change' }],
                endTime:[{ required: true, message: '结束时间不能为空', trigger: 'change' }],
                fCmpId:[{ required: true, message: '所属公司不能为空', trigger: 'change' }],
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
           this.self.addOperator (this.operator)
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
            console.log(file.response)
            console.log('123456')
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
</style>
