<template>
    <div>
       <header class="role-add-header">
            <span>添角色</span>
       </header>
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
         <div class="header-conditions">
           <!--<Form-item class="role-label" label="角色ID" prop="roleId">
             <Input v-model="formValidate.name" v-model="selectData.orleCode" placeholder="请输入角色ID" />
           </Form-item>
           <Form-item class="role-label" label="角色名称" prop="roleName">
             <Input v-model="formValidate.mail" v-model="selectData.orleDesc" placeholder="请输入角色名称" />
           </Form-item>-->
           <Form-item class="role-label" label="角色ID" prop="roleId">
             <Input class="role-input" v-model="formValidate.roleId" placeholder="请输入角色ID" />
           </Form-item><br />
            <Form-item class="role-label" label="角色名称" prop="roleName">
                <Input class="role-input" v-model="formValidate.roleName" placeholder="请输入角色名称" />
            </Form-item>
            </div>
            <div class="role-perm">
              <div class="role-perm-title">权限选择</div>
              <div class="role-tab">
                <Tabs type="card">
                  <Tab-pane v-for="item in permList" :label="item.menuDesc">
                    <div v-for="(item,index) in item.childMenuList">
                      <div class="role-add-title">
                        <span class="tab-title" v-if="item.childMenuList != ''">{{item.menuDesc}}</span><label v-if="item.childMenuList != ''" ><input type="checkbox">全选</label>
                        <label class="tab-title" v-if="item.childMenuList == ''" @click="clickSelected(item.checkbox,item.menuCode)">{{item.menuDesc}}<input  v-model="item.checkbox" type="checkbox"></label>
                      </div>
                      <div class="role-add-cont" v-if="item.childMenuList != ''">
                        <label v-for="(item,index) in item.childMenuList" ><input v-model="item.checkbox" type="checkbox" @click="clickSelected(item.checkbox,item.menuCode)">{{item.menuDesc}}</label>
                      </div>
                    </div>
                  </Tab-pane>
                </Tabs>
              </div>
            </div>
        </Form>
        <div class="role-add-button">
          <Button type="primary" @click="clickAddRolePerm">提交</Button>
          <Button type="primary">重置</Button>
        </div>
    </div>
</template>
<script>
  import Action from '../actions/action'
  export default {
    name: 'role_add',
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
        permList:'',
        baseData: [],
        selectArr: [],
        checkbox: false,
        selectData: {
          menuCodes: '',
          orleDesc: '',
          orleCode: ''
        }

      }
    },
    methods: {
      getSelectedNodes () {
          for(let [index,value] of this._data.baseData.entries()) {
            if(value.checked){
              let erValue = value.children
              for(let [index,value] of erValue.entries()){
              }
            }
          }
      },
      clickSelected (checkbox,code) {
        if(checkbox){
          this.selectData.menuCodes += code+','
          this.selectData.orleDesc = this.formValidate.roleName
          this.selectData.orleCode = this.formValidate.roleId
        }else{
          for(let i=0;i<this.selectData.menuCodes.length;i++){
            if(this.selectData.menuCodes[i] == code){
              this.selectData.menuCodes.splice(i,1)
            }
          }
        }
       console.log(this.selectData)
      },
      clickAddRolePerm () {
        this.self.addRolePerm(this.selectData)
      },

      /*clickAddRolePerm (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }*/
    },
    mounted () {
      this.self = new Action(this)
      this.self.getRolePermList()
      this.self.queryRole()
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
