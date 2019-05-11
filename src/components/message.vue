<template>
  <Collapse v-model="message">
    <Panel name="1">
      订单变更
      <div slot="content">

      </div>
    </Panel>
  </Collapse>
</template>

<script>
  import  list from '../actions/list'
  import  Config from '../config/config'
  export default {
    data () {

      return {
        current: 1,
        message: '1'
      }
    },
    mounted () {
        this.$http({
          method: 'post',
          url: new Config().getApi() + '/test.do'
        }).then( res => {
            console.log(res)
        })
//      list.getMessage ( { current: this.current }, this)
    }
  }
</script>

<style lang="less">

</style>
