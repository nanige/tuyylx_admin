<template>
  <div>
    <img class="img404" @click="returnIndex" :style="'height: ' + imgHeight" src="../assets/images/404.gif" alt="">
  </div>
</template>
<script>
  export default {
    data () {
        return {
            imgHeight: ''
        }
    },
    mounted () {
        this.imgHeight =  document.documentElement.clientHeight
        console.log(this.imgHeight)
    },
    methods: {
      returnIndex () {
          this.$router.push({ path: '/'})
      }
    }

  }
</script>
<style lang="less">
  .img404 {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
</style>
