<template>
    <div>
        
    </div>
</template>


<script>
    import getList from '../actions/list'
    export default {
        data() {
            return {
                menuForLeft:[]
            }
        },
        created () {
            getList.allLeftMenu ( this )  
        },
        mounted () {
           
        },
        methods: {
            
        }
    }
</script>

<style lang="less">
    
</style>