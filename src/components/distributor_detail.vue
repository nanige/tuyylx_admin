<template>
    <div>
        <Card shadow style="width:60%;margin:20px auto 50px auto">
            <p slot="title">分销商详情</p>
            <table style="width:98%;margin-left:30px" class="tableDetail">
                <tr>
                    <td class="titleTb">经销商编号：</td>
                    <td>{{operator.cusCode}}</td>
                    <td class="titleTb">运营商简称：</td>
                    <td>{{operator.shoperName}}</td>
                </tr>
                <tr>
                    <td class="titleTb">经销商名称：</td>
                    <td>{{operator.cusName}}</td>
                    <td class="titleTb">所属公司：</td>
                    <td>{{operator.fCmpId}}</td>
                </tr>

                <tr>
                    <td class="titleTb">账号：</td>
                    <td>{{operator.sysNo}}</td>
                    <td class="titleTb">密码：</td>
                    <td>{{operator.sysPwd}}</td>
                </tr>
                <tr>
                    <td class="titleTb">开始日期：</td>
                    <td>{{operator.startTime}}</td>
                    <td class="titleTb">截止日期：</td>
                    <td>{{operator.endTime}}</td>
                </tr>
                <tr>
                    <td class="titleTb">执照编码：</td>
                    <td>{{operator.cardCode}}</td>
                    <td class="titleTb">法 人：</td>
                    <td>{{operator.legalPerson}}</td>
                </tr>
                <tr>
                    <td class="titleTb">法人身份证：</td>
                    <td>{{operator.legadid}}</td>
                    <td class="titleTb">注册资金：</td>
                    <td>{{operator.regcapital}}</td>
                </tr>
                <tr>
                    <td class="titleTb">银行账号：</td>
                    <td>{{operator.bankNo}}</td>
                    <td class="titleTb">账号名称：</td>
                    <td>{{operator.accountNo}}</td>
                </tr>
                <tr>
                    <td class="titleTb">开户银行：</td>
                    <td>{{operator.bankName}}</td>
                    <td class="titleTb">开户行地址：</td>
                    <td>{{operator.bankAddress}}</td>
                </tr>
                <tr>
                    <td class="titleTb">联系地址：</td>
                    <td>{{operator.address}}</td>
                    <td class="titleTb">联系人：</td>
                    <td>{{operator.ctName}}</td>
                </tr>
                <tr>
                    <td class="titleTb">电话：</td>
                    <td>{{operator.tel}}</td>
                    <td class="titleTb">手机：</td>
                    <td>{{operator.mobile}}</td>
                </tr>
                <tr>
                    <td class="titleTb">邮箱：</td>
                    <td>{{operator.email}}</td>
                    <td class="titleTb">传真：</td>
                    <td>{{operator.fax}}</td>
                </tr>
                <tr>
                    <td>备注：</td>
                    <td>{{operator.remark}}</td>
                </tr>
                <tr>
                    <td>营业执照：</td>
                </tr>
                <tr>
                    <td colspan="4"></td>
                </tr>
            </table>
        </Card>
        
    </div>
</template>
<script>
  import Action from '../actions/action'
  export default {
    data() {
        return {
            self: '',
            operator:{}  
        }
    },
    mounted () {
        this.self = new Action(this)
            this.self.oneDistributor ( this.$route.query.cusCode )
        }
  }
  
</script>
<style lang="less">
   .tableDetail {
       background:#fff;
       margin-top:15px;
       .titleTb {
          width:120px;
       }
       td { 
           padding:10px 0;    
       }
   }
</style>
