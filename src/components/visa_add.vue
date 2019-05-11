<template>
    <div>
        <Card shadow style="width:60%;" v-if="status === 'add'">
            <p slot="title">添加签证</p>
            <Form ref="visaAdd" :model="visaAdd" :rules="ruleVisaAdd" :label-width="100">
                <Form-item label="签证编号：" prop="visacode">
                    <Input v-model="visaAdd.visacode" placeholder="签证编号"></Input>
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
                        <Form-item label="国家：" prop="Country">
                            <Select v-model="visaAdd.Country">
                                <Option v-for="item in compList" :value="item.countrycode" :key="item">{{item.countrydesc}}</Option>
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
                <Form-item label="签证编号" prop="visacode">
                    <Input type="text" v-model="upload.visacode"></Input>
                </Form-item>
                <Form-item label="行号" prop="linenum">
                    <Input type="text" v-model="upload.linenum"></Input>
                </Form-item>
                <Form-item label="文件名字" prop="filedesc">
                    <Input type="text" v-model="upload.filedesc" number></Input>
                </Form-item>
                <Form-item>
                   
                </Form-item>
            </Form>
            <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
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
                Country:''
            },
            typeList:[],
            compList:[],
            upload: {
                visacode:'',
                linenum:'',
                filedesc:''
            }
        }
    },
    methods: {
        handleSubmit ( name ) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.self.visaAdd ( this.visaAdd )
                } else {
                    this.$Message.error('表单验证失败!')
                }
            })
        },
        handleReset( name ) {
            this.$refs[name].resetFields()
        }
    },
    mounted () {
        this.self = new Action(this)

        list.getCountry(this)
        list.getVisaType (this)
    }
  }
</script>
<style lang="less">
    
</style>
