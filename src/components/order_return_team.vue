<template>
    <div>
        <Row>
            <Col :span="spanLeft" class="left-menu-box">
                <div class="left-menu-madel" v-if="treePanel">
                    <div class="madel-top">
                        <h1><Icon type="android-funnel" style="margin-right:5px;"></Icon>选择产品树</h1>

                        <Button type="text" style="float:right;color:#fff;" @click="treePanel = false"><Icon type="close-round"></Icon></Button>
                    </div>
                    <div class="content" style="background:#fff">
                        <ul>
                            <li v-for="item in menuForLeft" class="lv1" @click="item.isOpen === true ? item.isOpen = false : item.isOpen = true">

                                <span class="plv1" v-on:mouseenter="item.isShow = true" v-on:mouseleave="item.isShow = false">
                                    <Icon type="folder" class="folderlv1"></Icon>
                                    {{item.menuName}}
                                    <Button type="text" class="enterlv1" @click.stop="lv1 (item.menuCode,'dton')" v-show="item.isShow">进入</Button>
                                </span>
                                <ul v-if="item.isOpen">
                                    <li v-for="(item2,index) in item.childList" class="lv2">
                                        <span class="plv1" @click.stop="item2.isOpen === true ? item2.isOpen = false : item2.isOpen = true" v-on:mouseenter.stop="item2.isShow = true" v-on:mouseleave.stop="item2.isShow = false">
                                            <Icon type="folder" class="folderlv1"></Icon>
                                            {{item2.menuName}}
                                            <Button type="text" class="enterlv1" @click.stop="lv2 (item2.menuCode,'lArea')" v-show="item2.isShow">进入</Button>
                                        </span>
                                        <ul v-if="item2.isOpen">
                                            <li v-for="(item3,index) in item2.childList" class="lv3">
                                                <span class="plv1"  @click.stop="item3.isOpen === true ? item3.isOpen = false : item3.isOpen = true" v-on:mouseenter.stop="item3.isShow = true" v-on:mouseleave.stop="item3.isShow = false">
                                                    <Icon type="folder" class="folderlv1"></Icon>
                                                    {{item3.menuName}}
                                                    <Button type="text" class="enterlv1" @click.stop="lv3 (item3.menuCode,'province')" v-show="item3.isShow">进入</Button>
                                                </span>

                                                <ul v-if="item3.isOpen">
                                                    <li v-for="(item4,index) in item3.childList" class="lv4">
                                                        <span class="plv1" @click.stop="item4.isOpen === true ? item4.isOpen = false : item4.isOpen = true" v-on:mouseenter.stop="item4.isShow = true" v-on:mouseleave.stop="item4.isShow = false">
                                                            <Icon type="folder" class="folderlv1"></Icon>
                                                            {{item4.menuName}}
                                                            <Button type="text" class="enterlv1" @click.stop="lv4 (item4.menuCode,'sArea')" v-show="item4.isShow">进入</Button>
                                                        </span>

                                                        <ul v-if="item4.isOpen">
                                                            <li v-for="(item5,index) in item4.childList" class="lv5">

                                                                <span class="plv1" @click.stop="item5.isOpen === true ? item5.isOpen = false : item5.isOpen = true"  v-on:mouseenter.stop="item5.isShow = true" v-on:mouseleave.stop="item5.isShow = false">
                                                                    <Icon type="folder" class="folderlv1"></Icon>
                                                                    {{item5.menuName}}
                                                                    <Button type="text" class="enterlv1" @click.stop="lv5 (item5.menuCode,'city')" v-show="item5.isShow">进入</Button>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="titleLeft">
                    <h1 v-if="titleLeft">产品列表</h1>
                    <Button type="text" class="arrow" @click="changeMenuLeft"><Icon type="arrow-swap"></Icon></Button>
                </div>
                <div class="navLeftChooise" v-if="titleLeft" style="text-align: center">
                    <Button type="text" @click="openTree">选择地区</Button>
                </div>
                <div class="circuitList" :style="'overflow-y : '+ scroll">

                    <ul v-if="pruList">
                        <li v-for="item in lineList">
                            <Icon type="social-instagram" class="item-icon"></Icon>
                            <p @click="lineAction (item)">{{item.linename}}</p>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col :span="spanRight">
                <div class="search">
                    <Form ref="searchForm" :model="searchForm" :label-width="120">
                        <Row>

                            <Col span="8">
                                <Form-item prop="groupNo" label="根据团号查询：">
                                    <Input type="text" v-model="searchForm.groupNo" placeholder=""></Input>
                                </Form-item>
                            </Col>
                            <Col span="2" offset="1">
                                 <Button type="primary">查询</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div class="dataContent">
                    <Table stripe border class="contentTable" :columns="orderCol" :data="orderData"></Table>
                </div>
            </Col>
        </Row>
        <Modal v-model="affirmRT" width="360">
            <p slot="header" style="color: #fff">
                <Icon type="information-circled"></Icon>
                <span>转团确认</span>
            </p>
            <div style="text-align:center;font-size:14px;">
                <p>是否确定转团</p>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="success" @click="clickYes">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Util  from '../commons/util'
    import list from '../actions/list'
    import Action from '../actions/action'

    export default {

        data () {
            return {
                self:'',
                spanLeft:4,
                spanRight:20,
                titleLeft:true,
                tableShow:true,
                tableShow2:true,
                detailShow:false,
                treePanel:false,
                enter:false,
                pruList:false,
                affirmRT:false,
                scroll:'scroll',
                height:'auto',
                icon_arrow:'chevron-up',
                height2:'auto',
                icon_arrow2:'chevron-up',
                type:'personal',
                type_add:'personal_add',
                orderCol:[{
                    title:'团号',
                    key:'groupno',
                    width:200,

                },{
                    title:'团队名称',
                    key:'groupname',
                    width:240,
                    render: (h,params) => {
                      return h('div',{
                        style:{
                          overflow:'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }
                      }, params.row.groupname)
                    }
                },{
                    title:'出发日期/星期',
                    key:'startdatestr',
                    width:150
                },{
                    title:'截止日期',
                    key:'startweek',
                    width:150
                },{
                    title:'是否截团',
                    key:'startweek',
                    width:150
                },{
                    title:'天数',
                    key:'schedulingDay',
                    width:150
                },{
                    title:'成人',
                    key:'saleprice',
                    width:150
                },{
                    title:'儿童',
                    key:'oldsaleprice',
                    width:150
                },{
                    title:'婴儿',
                    key:'childsaleprice',
                    width:150
                },{
                    title:'总数',
                    key:'num',
                    width:150
                },{
                    title:'已售',
                    key:'soldNum',
                    width:150
                },{
                    title:'可售',
                    key:'remainnum',
                    width:150
                },{
                    title:'所属公司',
                    key:'venName',
                    width:100
                },{
                    title:'操作',
                    key:'Action',
                    width:80,
                    align:'center',
                    fixed:'right',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.affirmRT = true
                                        this.returnData = {
                                            docentry: params.row.docentry,
                                            newGroupNo: params.row.groupno,
                                            newLineDBname: params.row.lineDBname
                                        }
                                    }
                                }
                            }, '转至此团')
                        ]);
                    }
                }],
                search:{
                    startDate:'',
                    passwd:'',
                    date:''
                },
                searchs:[],
                orderData:[],
                checkList:[
                    { text:'客户名称' },
                    { text:'客户名称' },
                    { text:'客户名称' },
                    { text:'客户名称' }
                ],
                personalCol:[
                    { title:'客户编号 '},
                    { title:'客户名称 '},
                    { title:'客户类型 '},
                    { title:'客户等级 '},
                    { title:'客户特征 '},
                    { title:'证件类型 '},
                    { title:'证件号码 '},
                    { title:'手机号码 '}
                ],
                enterpriseCol:[
                    { title:'客户编号 '},
                    { title:'客户名称 '},
                    { title:'公司电话 '},
                    { title:'公司传真 '}
                ],
                menuForLeft:[],
                lineList:[],
                searchForm:{
                    groupNo:''
                },
                returnData:{}
            }
        },
        created () {
            this.self = new Action( this )
        },
        methods: {
            changeMenuLeft () {
                if ( this.spanLeft === 4) {
                    this.spanLeft = 1
                    this.spanRight = 22
                    this.titleLeft = false
                    this.scroll = ''
                } else {
                    this.spanLeft = 4
                    this.spanRight = 20
                    this.titleLeft = true
                    this.scroll = 'scroll'
                }
            },
            changeHeightOne () {

                if ( this.height === 'auto') {
                    this.height = '40px'
                    this.tableShow = false

                    this.icon_arrow = 'chevron-down'
                } else {
                    this.height = 'auto'
                    this.tableShow = true
                    this.icon_arrow = 'chevron-up'
                }

            },
            changeHeightTwo ( ) {
                if ( this.height2 === 'auto') {
                    this.height2 = '40px'
                    this.tableShow2 = false

                    this.icon_arrow2 = 'chevron-down'
                } else {
                    this.height2 = 'auto'
                    this.tableShow2 = true
                    this.icon_arrow2 = 'chevron-up'
                }
            },
            dateChange (date) {
               this.search.startDate = date
            },
            searchSubmit () {

            },
            searchReset() {

            },
            toDetail () {
                this.$router.push({ path: '/index/order_detail'})
            },
            openList () {
                this.detailShow = true
            },
            add () {
                this.customer = true
            },
            toReservation ( code , no , db ) {
                this.$router.push({ path: '/index/order_reservation', query: { lineDBname:code,groupno:no,dbName: db} })
            },
            openTree () {
                this.treePanel === false ? this.treePanel = true : this.treePanel = false
                list.allLeftMenu (this)
            },
            lv1 ( code,type ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv2 ( code,type ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv3 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv4 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lv5 ( code,type  ) {
                list.searchLine ( this, { menuType: type, menuCode:code})
            },
            lineAction ( data ) {
                list.searchOrder( this, { linecode:data.linecode, dbName: data.dbName },'list')
            },
            clickYes () {
                this.self.changeTeam (this.returnData)

                this.affirmRT = false
            }
        }
    }
</script>


<style lang="less">

</style>
