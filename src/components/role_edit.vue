<template>
    <div>
       <header class="role-add-header">
            <span>编辑角色</span>
       </header>
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
         <div class="header-conditions">
           <Form-item class="role-label" label="角色ID" prop="roleId">
             <Input class="role-input" v-model="formValidate.roleId" disabled placeholder="请输入角色ID" />
           </Form-item><br />
            <Form-item class="role-label" label="角色名称" prop="roleName">
                <Input class="role-input" v-model="formValidate.roleName" placeholder="请输入角色名称" />
            </Form-item>
            </div>
            <div class="role-perm">
              <div class="role-perm-title">权限选择</div>
              <div class="role-tab">
                <Tabs type="card">
                  <Tab-pane v-for="item in permListEidt" :key="item" :label="item.menuDesc">
                    <div v-for="(item,index) in item.childMenuList" :key="item" >
                      <div class="role-add-title">
                        <!--<span class="tab-title" v-if="item.childMenuList != ''">{{item.menuDesc}}</span><label v-if="item.childMenuList != ''" ><input type="checkbox">全选</label>-->
                        <label class="tab-title" >{{item.menuDesc}}<input  v-model="item.checked" type="checkbox"></label>
                      </div>
                      <div class="role-add-cont" v-if="item.childMenuList != ''">
                        <label v-for="(item,index) in item.childMenuList" :key="item" ><input v-model="item.checked" type="checkbox" >{{item.menuDesc}}</label>
                      </div>
                    </div>
                  </Tab-pane>
                </Tabs>
              </div>
            </div>
        </Form>
        <div class="role-add-button">
          <Button type="primary" @click="clickEditRolePerm">提交</Button>
          <Button type="primary">重置</Button>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  export default {
    name: 'role_edit',
    data() {
      return {
        formValidate: {
          roleName: '',
          roleId: ''
        },
        ruleValidate: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '角色ID不能为空', trigger: 'blur' }
          ]
        },
        permListEidt: '',
        baseData: [],
        selectArr: [],
        selectData: {
          menuCodes: '',
          orleDesc: '',
          orleCode: ''
        }
      }
    },
    created () {
      this.formValidate.roleId = this.$route.query.orleCode
      this.formValidate.roleName = this.$route.query.orleDesc
    },
    methods: {
      clickEditRolePerm () {//点击提交按钮
        this.selectData.orleDesc = this.formValidate.roleName
        this.selectData.orleCode = this.formValidate.roleId
        this.selectData.menuCodes = ''
        for(let value of this.permListEidt.entries()){
          if(value.childMenuList != ''){
            value[1].childMenuList.forEach((value) => {
              if(value.checked){
                this.selectData.menuCodes += value.menuCode + ','
              }
              if(value.childMenuList != ''){
                value.childMenuList.forEach((value) => {
                  if(value.checked){
                    this.selectData.menuCodes += value.menuCode + ','
                  }
                })
              }
            })
          }
        }
        this.selectData.menuCodes = this.selectData.menuCodes.substring(0, this.selectData.menuCodes.length - 1)
        this.self.editRolePerm(this.selectData) //编辑角色
      }
    },
    mounted () {
      this.self = new Action(this)
      this.self.getEditPermList(this.formValidate.roleId) //获取编辑权限列表
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
