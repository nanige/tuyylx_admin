<template>
    <div>
        <Card shadow v-for="item in allList" :key="item" style="margin-bottom:20px;">
            <div slot="title">{{item.menuName}}</div>
            

            <Tabs v-if="item.childList.length !== 0">
                <Tab-pane v-for="itemTwo in item.childList" :key="itemTwo" :label="itemTwo.menuName" :name="itemTwo.menuCode">
                    <Collapse v-if="itemTwo.childList.length !== 0">
                        <Panel v-for="itemThree in itemTwo.childList" :key="itemThree">
                            {{itemThree.menuName}}
                            <p slot="content">
                                <Button type="text" v-for="itemFour in itemThree.childList" :key="itemFour">
                                    {{itemFour.menuName}}
                                </Button>
                            </p>
                        </Panel>
                    </Collapse>
                </Tab-pane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
  import Action from '../actions/action'
  import list from '../actions/list'
  export default {
   
    data() {
        return {
            self:'',
            allList:[],
            provinceCodeList:[],
            oreaCodeList:[],
            open:'1',
        }
    },
    methods:{
        
    },
    mounted () {
        this.self = new Action(this)

        // this.self.getOrea ({ level: 0 }) 
        list.allArea (this)
    }        
  }
</script>
<style lang="less">
    
</style>
