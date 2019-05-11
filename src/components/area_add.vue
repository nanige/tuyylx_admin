<template>
    <div>
        <Card shadow style="width:60%;">
            <p slot="title">添加一个大区域</p>
            <Form ref="areaBig" :model="areaBig" :rules="ruleAreaBig" :label-width="80">
                <Row>
                    <Col span="11">
                        <Form-item label="区域编码：" prop="areaCode">
                            <Input type="text" v-model="areaBig.areaCode" placeholder="请输入大区域编号 例：hnq"></Input>
                        </Form-item>
                    </Col>

                    <Col span="11" offset="2">
                        <Form-item label="区域名称：" prop="areaName">
                            <Input type="text" v-model="areaBig.areaName"  placeholder="请输入大区域名称 例：华南区"></Input>
                        </Form-item>  
                    </Col>
                </Row>
                <Form-item>
                    <Button type="primary" @click="areaSubmit( areaBig )">添加</Button>
                    <Button type="primary" @click="areaRest( 'areaBig' )">重置</Button>
                </Form-item>      
            </Form>
        </Card>
        <Card shadow style="width:60%;margin-top:15px;">
            <p slot="title">添加一个省份</p>
            <Form ref="province" :model="province" :rules="ruleAreaBig" :label-width="80">
                <Row>
                    <Col span="11">
                        <Form-item label="区域编号：" prop="areaCode">
                            <Select v-model="province.areaCode">
                                <Option v-for="item in areaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                        </Form-item>
                    </Col>

                    <Col span="11" offset="2">
                        <Form-item label="省份编号：" prop="provinceCode">
                            <Input type="text" v-model="province.provinceCode" placeholder="请输入省份编号 例：gds"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Form-item label="省份名称：" prop="provinceName">
                    <Input type="text" v-model="province.provinceName" placeholder="请输入省份名称 例：广东省"></Input>
                </Form-item>
                
                 <Form-item>
                    <Button type="primary" @click="provinceSubmit(province)">添加</Button>
                    <Button type="primary" @click="areaRest( 'province' )">重置</Button>
                </Form-item>   
            </Form>
        </Card>
        <Card shadow style="width:60%;margin-top:15px;">
            <p slot="title">添加一个小区域</p>
            <Form ref="areaSmall" :model="areaSmall" :rules="ruleAreaBig" :label-width="100">
                <Row>
                    <Col span="11">
                        <Form-item label="大区域编号：" prop="areaCode">
                            <Select v-model="cityAreaChooise.areaCode" @on-change="areaChange (cityAreaChooise.areaCode)">
                                <Option v-for="item in areaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                        </Form-item>  
                    </Col>

                    <Col span="11" offset="2">
                        <Form-item label="省份编号：" prop="provinceCode">
                            <Select v-model="areaSmall.ProvinceCode" >
                                <Option v-for="item in provinceCodeList" :value="item.provinceCode" :key="item">{{ item.provinceName }}</Option>
                            </Select>
                        </Form-item>  
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <Form-item label="区域编码：" prop="areaCode">
                            <Input type="text" v-model="areaSmall.areaCode" placeholder="请输入小区域编号 例：hnq"></Input>
                        </Form-item>
                    </Col>

                    <Col span="11" offset="2">
                        <Form-item label="区域名称：" prop="areaName">
                            <Input type="text" v-model="areaSmall.areaName" placeholder="请输入小区域名称 例：珠江三角"></Input>
                        </Form-item> 
                    </Col>
                </Row>

                <Form-item>
                    <Button type="primary" @click="areaSmallSubmit( areaSmall )">添加</Button>
                    <Button type="primary" @click="areaRest( 'areaSmall' )">重置</Button>
                </Form-item>    
            </Form>
        </Card>
        <Card shadow style="width:60%;margin-top:15px;">
            <p slot="title">添加一个城市</p>
            <Form ref="cityAdd" :model="cityAdd" :rules="ruleAreaBig" :label-width="100">
                <Row>
                    <Col span="11">
                        <Form-item label="大区域编号：" prop="areaCode">
                            <Select v-model="cityAreaChooise.areaCode" @on-change="areaChange (cityAreaChooise.areaCode)">
                                <Option v-for="item in areaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                        </Form-item> 
                        <Form-item label="小区域编号：" prop="areaCode">
                            <Select v-model="cityAdd.areaCode" >
                                <Option v-for="item in oreaCodeList" :value="item.areaCode" :key="item">{{ item.areaName }}</Option>
                            </Select>
                        </Form-item> 
                    </Col>

                    <Col span="11" offset="2">
                        
                        <Form-item label="省份编号：" prop="provinceCode">
                            <Select v-model="cityAdd.provinceCode" @on-change="provinceChange (cityAdd.provinceCode)">
                                <Option v-for="item in provinceCodeList" :value="item.provinceCode" :key="item">{{ item.provinceName }}</Option>
                            </Select>
                        </Form-item> 
                        <Form-item label="城市编码：" prop="areaCode">
                            <Input type="text" v-model="cityAdd.cityCode" placeholder="请输入城市编号 例：gz"></Input>
                        </Form-item>
                        
                    </Col>
                </Row>
                <Form-item label="城市名称：" prop="areaName">
                    <Input type="text" v-model="cityAdd.cityName" placeholder="请输入城市名称 例：广州市"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="citySubmit(cityAdd)">添加</Button>
                    <Button type="primary" @click="areaRest( 'cityAdd' )">重置</Button>
                </Form-item>      
            </Form>
        </Card>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import list from '../actions/list'
  import check from '../actions/ajax_check'
  export default {
    name: 'visa_add',
    data() {
        return {
            self:'',
            status:'add',
            ruleAreaBig:{
               visacode:[
                   { required: true,message: '编号不能为空',trigger: 'blur' },
                   { type: 'string', max: 20, message: '编号不能超过20字', trigger: 'blur' }
                ],
                visatypecode:[
                    { required: true,message: '签证类别不能为空',trigger: 'change' }
                ],
                Country:[
                    { required: true,message: '国家不能为空',trigger: 'change' }
                ]
            },
            ruleUpload:{},
            visaAdd:{
                visacode:'',
                visatypecode:'',
                Country:''
            },
            typeList:[],
            compList:[],
            upload: {
                visacode:'',
                linenum:'',
                filedesc:''
            },
            areaBig:{
                areaCode:'',
                areaName:'',
                level:'0',
                isdomestic:'0'
            },
            areaSmall:{
                areaCode:'',
                areaName:'',
                ProvinceCode:'',
                level:'1',
                isdomestic:'0'
            },
            province: {
                provinceCode:'',
                provinceName:'',
                isdomestic:'0',
                areaCode:''
            },
            cityAdd: {
                cityCode:'',
                cityName:'',
                provinceCode:'',
                areaCode:'',
                isdomestic:'0'
            },
            cityAreaChooise:{
                areaCode:''
            },
            areaCodeList:[],
            provinceCodeList:[],
            oreaCodeList:[]
        }
    },
    methods: {
        handleReset( name ) {
            this.$refs[name].resetFields()
        },
        areaSubmit ( data ) {
            this.self.addArea ( data )
        },
        provinceSubmit (data) {
            this.self.addProvince ( data )
        },
        areaSmallSubmit ( data ) {
            this.self.addArea ( data )
        },
        citySubmit ( data ) {
            this.self.addCity ( data )
        },
        areaRest ( name ) {
            this.$refs[name].resetFields()
            this.cityAreaChooise.areaCode = ''
        },
        requestArea () {
            console.log('123456')
        },
        areaChange ( code ) {
            this.self.getProvince(code)
        },
        provinceChange ( code ) {
            this.self.getOrea ({level:1,ProvinceCode:code})
        },
        
        // checkAreaName () {
        //     check.checkAreaBig ( this, this.areaBig.areaName )
        // }
    },
    mounted () {
        this.self = new Action(this)

        list.getCountry(this)
        list.getVisaType (this)

        this.self.getOrea ( {level:0} )
    }
  }
</script>
<style lang="less">
    
</style>
