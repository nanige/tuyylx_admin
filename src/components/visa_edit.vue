<template>
    <div>
        <Card shadow style="width:60%;" v-if="status === 'add'">
            <p slot="title">修改签证</p>
            <Form ref="visaAdd" :model="visaAdd" :rules="ruleVisaAdd" :label-width="100">
                <Form-item label="签证编号：" prop="visacode">
                    <Input v-model="visaAdd.visacode" placeholder="签证编号" disabled></Input>
                </Form-item>
                
                <Row>
                    <Col span="11">
                        <Form-item label="签证类别：" prop="visatypecode">
                            <Select v-model="visaAdd.visatypecode">
                                <Option v-for="item in typeList" :key="item" :value="item.visatypecode">{{item.visatypedesc}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="11" offset="2">
                        <Form-item label="国家：" prop="country">
                            <Select v-model="visaAdd.country">
                                <Option v-for="item in compList" :value="item.countrycode" :key="item">{{item.countrydesc}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <Form-item label="账户状态：">
                            <Select v-model="visaAdd.status">
                                <Option v-for="item in statusList" :key="item" :value="item.val">{{item.text}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Form-item label="签证描述：" prop="visadesc">
                    <Input type="textarea" :rows="4" v-model="visaAdd.visadesc" placeholder="签证描述"></Input>
                </Form-item>
                
                <Form-item label="备注：" prop="memo">
                    <Input type="textarea" :rows="4" v-model="visaAdd.memo" placeholder="备注"></Input>
                </Form-item>

                <Form-item>
                    <Button type="primary" @click="handleSubmit('visaAdd')">提交</Button>
                    <Button type="ghost" @click="handleReset('visaAdd')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
        <Card shadow v-if="status === 'upload'" style="width:60%;">
            <p slot="title">上传签证</p>
            <Form ref="upload" :model="upload" :rules="ruleUpload" :label-width="80">
                <Row>
                    <Col span="11">
                        <Form-item label="签证编号：" prop="visacode">
                            <Input type="text" v-model="upload.visacode"></Input>
                        </Form-item>
                    </Col>
                    <Col span="11" offset="2">
                        <Form-item label="行号：" prop="linenum">
                            <Input type="text" v-model="upload.linenum"></Input>
                        </Form-item>
                    </Col>
                </Row>
                
                <Form-item label="路径：" prop="dowmurl">
                    <Input type="text" v-model="upload.dowmurl" number></Input>
                </Form-item>
                    
    
                <Form-item label="文件上传：">
                   <Upload
                        multiple
                        type="drag"
                        action="http://192.168.1.135:8080/tyy-web-admin/sys/vsa1/upload.do" :on-success="upLoadSuccess" :show-upload-list="false">
                        <div>
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="uploadSubmit (upload)">提交</Button>
                </Form-item>
            </Form>
            
        </Card>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import Config from '../config/config'
  import list from '../actions/list'
  export default {
    name: 'visa_add',
    data() {
        return {
            self:'',
            status:'add',
            ruleVisaAdd:{
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
            ruleUpload:{

            },
            visaAdd:{
                visacode:'',
                visatypecode:'',
                country:''
            },
            typeList:[],
            compList:[],
            upload: {
                visacode:'',
                linenum:'',
                filedesc:'',
                dowmurl:''
            },
            statusList: [
                { val:'O', text:'正常' },
                { val:'D', text:'删除' },
                { val:'C', text:'取消' },
                { val:'L', text:'锁定' }
            ]
        }
    },
    methods: {
        handleSubmit ( name ) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.self.upDataVisa ( this.visaAdd )
                } else {
                    this.$Message.error('表单验证失败!')
                }
            })
        },
        handleReset( name ) {
            this.$refs[name].resetFields()
        },
        upLoadSuccess ( response, file, fileList ) {
            switch ( response.statusCode ) {
                case 200:
                    this.upload.dowmurl = response.object
                    this.$Notice.success({
                        title: response.message
                    })
                    break
                case 300:
                    this.$Notice.success({
                        title: response.message
                    })
                    break
            }   
        },
        uploadSubmit (upload) {
            this.self.qianzheng (upload)
        }
    },
    mounted () {
        this.self = new Action(this)

        list.getCountry(this)
        list.getVisaType (this)

        list.visaOne(this, this.$route.query.visacode)
    }
  }
</script>
<style lang="less">
    
</style>
