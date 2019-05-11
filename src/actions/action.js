// ken 2017-06-02 10:17:06

import Config from '../config/config'
import Util from '../commons/util'
import getList from './list'

const api = new Config().getApi()
const util = new Util()

const menu = '/sys/omnu/getRoleMenu.do'

//获取单个供应商
const ovenOne = '/biz/oven/selectOvenList.do'

//获取单个分销商
const ocustOne = '/biz/ocust/selectOcustList.do'

/*-------------- 部门 ---------------*/

const checkDeptCode = '/biz/odpt/ajaxCheckdeptDesc.do'

/*---------------------------------*/

/*-------------- 用户 ---------------*/

const userList = '/biz/ousr/list.do'

const addUser = '/biz/ousr/add.do'

const editUser = '/biz/ousr/edit.do'

const delUser = '/biz/ousr/del.do'

const selectOrleList = '/biz/orle/selectOrleList.do'

const selectOdptList = '/biz/odpt/selectOdptList.do'

const selectOtileList = '/biz/otile/selectOtileList.do'

/*---------------------------------*/

//****************** 角色 *************************/
const roleList = '/biz/orle/list.do'

const rolePermList = '/sys/omnu/list.do'

const orea = '/sys/orea/list.do'

const province = '/sys/opvn/list.do'

const city = '/sys/octy/list.do'

const addRolePermUrl = '/biz/orle/add.do'

const editRolePermUrl = '/biz/orle/edit.do'

const editRolePermListUrl = '/sys/omnu/getRoleCheckMenu.do'

const removerRoleUrl = '/biz/orle/del.do'

//导出数据

//******************语种管理*************************/

const addLanguagePermUrl = '/sys/olge/add.do'

const editLanguagePermUrl = '/sys/olge/edit.do'

const languagePermListUrl = '/sys/olge/list.do'

const removerLanguageUrl = '/sys/olge/del.do'

const checkLanguageUrl = '/sys/olge/ajaxCheckolgeInfo.do' //参团名称编号校验


const guideList = '/sys/ogde/list.do'
const removerGuideUrl = '/sys/ogde/del.do'

//******************线路*************************/
const getOneGuoNeiUrl = '/sys/orea/selectAllList3.do'
const getMaxAreaUrl = '/biz/odton/selectOdtonList.do'
const getShengNeiAreaUrl = '/sys/opvn/selectOpvnList.do'
const getShengQuUrl = '/sys/opvn/selectAddressList.do'
const getGuoNeiUrl = '/sys/orea/selectAllList2.do'

const getNatureListUrl = '/biz/ontr/list.do' //参团性质
const checkNatureNameUrl = '/biz/ontr/ajaxChecknatureName.do'
const checkNatureCodeUrl = '/biz/ontr/ajaxChecknatureCode.do'
const addNatureListUrl = '/biz/ontr/add.do'
const editNatureListUrl = '/biz/ontr/edit.do'
const delNatureListUrl = '/biz/ontr/del.do'

const getThemeListUrl = '/sys/othe/list.do' //主题管理
const checkThemeNameUrl = '/sys/othe/ajaxCheckthemeName.do'
const checkThemeCodeUrl = '/sys/othe/ajaxCheckthemeCode.do'
const addThemeListUrl = '/sys/othe/add.do'
const editThemeListUrl = '/sys/othe/edit.do'
const delThemeListUrl = '/sys/othe/del.do'

const getCityListUrl = '/sys/octy/list.do' //出发城市
const addCityListUrl = '/sys/octy/add.do'
const editCityListUrl = '/sys/octy/edit.do'
const delCityListUrl = '/sys/octy/del.do' //编辑出发城市
const getProvincetUrl = '/sys/opvn/list.do'
const getAreaUrl = '/sys/orea/list.do' //
const checkCityCodeUrl = '/sys/octy/ajaxCheckoctyinfo.do'
const oneSubmitFormUrl = '/biz/oline/addOline.do'
const twoLineUrl = '/biz/oline/list.do' // 行程
const labelListUrl = '/biz/olbl/list.do' // 行程
const priceListUrl = '/biz/line4/list.do' // 发布线路第3步列表
const editLinePriceUrl = '/biz/line4/edit.do'
const editLinePriceUrl2 = '/biz/line4/add.do'
const specialDateList = '/biz/line44/selectLine44List.do'
const delSpanDateUrl = '/biz/line44/del.do' // 线路第3步特殊日期-左边日期特殊价格删除
const tripSubmitTwoUrl = '/biz/line5/add.do'
const addPreferenUrl = '/biz/line45/add.do' // 添加优惠
const addListPreferenUrl = '/biz/line455/add.do' // 列表添加优惠
const preferenListUrl = '/biz/line45/selectLine45List.do' // 添加优惠列表
const preferenListUrl2 = '/biz/line455/selectLine455List.do' // 列表添加优惠列表
const editSpecialDetermineUrl = '/biz/line44/edit.do' // 特殊日期保存
const lineListUrl = '/biz/oline/list.do' // 线路列表
const lineListGocityUrl = '/sys/octy/selectOctyList.do' // 出发地
const searchSubmitUrl = '/biz/oline/search.do' // 查询线路
const lineListAuditUrl = '/biz/oline/check.do' // 线路审核
const delLineListUrl = '/biz/oline/del.do' // 线路删除
const editLineInfoUrl = '/biz/oline/selectOlineList.do'
const editLineInfoSubmitUrl = '/biz/oline/editOline.do'
const editLineTravelInfoUrl = '/biz/line5/selectList.do'
const editLineTravelSubmitUrl = '/biz/line5/edit.do'
const publishLineUrl = '/biz/oline/publish.do'
const channelListUrl = '/sys/line/select.do'

export default class Action {
    constructor (self) {
        this.self = self
    }

    //导出 ken 2017-06-06 11:47:11
    getData () {
        this.self.$http.get(api + exportApi).then(res => {
            console.log(res)
        })
    }

    //获取菜单 ken 2017-06-02 10:14:41
    getMenu () {
        this.self.$http.post(api + menu).then( res => {
            this.self.menu = res.data
        })
    }

    //添加一个区域 ken 2017-06-14 19:11:24
    addArea ( data ) {
        this.self.$http({
            method:'post',
            url:api + util.setUrlSYS(1,'orea'),
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })

                    this.self.$router.push({ path: '/index/area_list'})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //获取区域 ken 2017-06-07 14:12:13
    getOrea ( data ) {
        this.self.$http({
            method: 'post',
            url: api + orea,
            params: data
        }).then( res => {
            if (data.hasOwnProperty('ProvinceCode')) {
                this.self.oreaCodeList = res.data.rows
            } else {
                this.self.areaCodeList = res.data.rows
            }
            this.self.cityList = ''
        })
    }

    //添加一个省份 ken 2017-06-14 19:11:24
    addProvince ( data ) {
        this.self.$http({
            method:'post',
            url:api + util.setUrlSYS(1,'opvn'),
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/index/area_list'})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //获取省份  ken  2017-06-07 14:12:34
    getProvince (area) {
        this.self.$http.post(api + province + '?areaCode=' + area).then( res => {
            this.self.provinceCodeList = res.data.rows
            this.self.cityList = ''
            //this.self.operator.provinceCode = res.data.rows[0].provinceName
            //console.log(this.self.operator.provinceCode)
        })
    }

    //添加一个城市 ken 2017-06-15 10:47:12
    addCity ( data ) {
        this.self.$http({
            method:'post',
            url:api + util.setUrlSYS(1,'octy'),
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/index/area_list'})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //获取城市 ken  2017-06-07 14:33:11
    getCity (orea) {
        this.self.$http.post(api + city + '?oreaCode=' + orea).then( res => {
            this.self.cityList = res.data.rows
        })
    }

    //基础增加接口 ken  2017-06-13 14:55:46
    add (data,str) {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(1,str),
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }
    //基础系统增加接口 ken  2017-06-13 14:55:46
    sysAdd (data,str) {
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(1,str),
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }


    /********************************部门设置*************************************************/


    //增加部门 ken 2017-06-02 10:15:20
    addDepart ( data ) {
        this.self.$http({
            method: 'post',
            url: api + util.setUrl(1,'odpt'),
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.add = false

                    getList.getBaseInfo(1,this.self)

                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
    }

    //校验部门编号 ken 2017-06-02 10:15:31
    checkDeptCode (deptDesc) {
        this.self.$http({
            method: 'post',
            url: api + checkDeptCode,
            params: {deptDesc:deptDesc}
        }).then( res => {

        })
    }

    //编辑部门信息 ken 2017-06-02 10:15:48
    editBaseInfo ( data ) {
        delete data.updateDate
        delete data.DBname
        delete data.updateUser
        delete data.createDate

        this.self.$http({
            method: 'post',
            url: api + '/biz/odpt/save.do',
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.edit = false
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.edit = false
                    break
            }
        })
    }

    //删除部门 ken 2017-06-02 10:16:00
    removeBaseInfo ( deptCode ) {
        this.self.$http({
            method: 'post',
            url: api + util.setUrl(3,'odpt'),
            params: {deptCode:deptCode}
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.delAffirm = false
                    getList.getBaseInfo(1,this.self)
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }
    /************************************部门 end********************************/


    /********************************用户管理************************************/

    addUser (data) {
        this.self.$http({
            method: 'post',
            url: api + addUser,
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    getList.getUserList ( {page: 1},this.self )

                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.add = false

                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
    }

    editUser (data) {
        delete data.createDate
        delete data.updateDate
        delete data.updateUser
        this.self.$http({
            method: 'post',
            url: api + editUser,
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    getList.getUserList ( {page: 1},this.self )

                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.edit = false

                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
    }

    getSelectList () {
        this.self.$http.post(api + selectOrleList).then(res => {
            this.self.orleList = res.data.object
        })

        this.self.$http.post(api + selectOdptList).then(res => {
            this.self.deptList = res.data.object
        })

        this.self.$http.post(api + selectOtileList).then(res => {
            this.self.titleList = res.data.object
        })
    }

    getUserList (current) {
        this.self.$http.post(api + userList + '?page=' + current).then(res => {
            this.self.userData = res.data.rows
        })
    }

     /********************************角色管理************************************/
     //拉取列表 Gary 2017-06-02 14:05:36
    getRoleList ( current ) {
        this.self.$http.post(api + roleList + '?page=' + current).then( res => {
            this.self.roleData = res.data.rows
            this.self.total = res.data.total
        })
    }

    //增加角色 Gary 2017-06-02 14:05:54
    /*addRole ( data ) {
        this.self.$http({
            method: 'post',
            url: api + add,
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
    }*/

    //权限菜单列表 Gary 2017-06-02 15:52:32
    getRolePermList () {
        this.self.$http.post(api + rolePermList).then( res => {
            this.self.permList = res.data.object
            //console.log(this.self.permList)
        })
    }
    //获取编辑权限菜单列表 Gary 2017-06-12 13:29:34
    getEditPermList (id) {
      this.self.$http.get(api + editRolePermListUrl + '?orleCode=' + id).then( res => {
        this.self.permListEidt = res.data.object
      })
    }
    editClick (code, desc){
      this.self.$router.push({ path: '/index/role_edit', query: { orleCode: code, orleDesc: desc }})
    }
    //添加权限 Gary 2017-06-08 17:15:25
    addRolePerm (data) {
        this.self.$http({
            method: 'post',
            url: api + addRolePermUrl,
            params: data
          }).then( res => {
          if(res.data.statusCode == 200){
            this.self.$Notice.success({
              title: res.data.message
            })
            //this.self.$router.push({ path: '/index/role'})
          }
        })
    }

    //编辑角色 Gary 2017-06-12 14:06:07
    editRolePerm ( data ) {
      this.self.$http({
            method: 'post',
            url: api + editRolePermUrl,
            params: data
      }).then(res => {

      })
    }

    //删除角色 Gary 2017-06-02 14:06:17
    removeRole ( num ) {
        this.self.$http.post(api + removerRoleUrl + '?orleCode=' + num).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.add = false
                    this.self.$http.post(api + roleList + '?page=' + 1).then( res => {
                      this.self.roleData = res.data.rows
                      this.self.total = res.data.total
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
    }



    //**********************************************运营商列表*******************************************************/

    getOperator (current) {
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(4,'ocmp'),
            params: {page:current}
        }).then(res => {
            this.self.departData = res.data.rows
            this.self.total = res.data.total
        })
    }

    getOperatorItem (id) {
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(5,'ocmp'),
            params: {cmpID:id}
        }).then(res => {
            this.self.operator = res.data.object[0]
        })
    }
    //添加运营商 ken 2017-06-06 18:07:23
    addOperator (data) {
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(1,'ocmp'),
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path:'/index/operator' })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }
    //修改运营商 ken 2017-06-06 18:07:23
    editOperator (data) {
        delete data.DBname
        delete data.updateDate
        delete data.updateUser
        delete data.createDate
        delete data.createUser
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(2,'ocmp'),
            params: data

        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path:'/index/operator' })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }
    //删除公司
    deleteCmpy ( id ) {
        this.self.$http({
            method:'post',
            url: api + util.setUrlSYS(3,'ocmp'),
            params: {cmpID:id}
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }
//************************线路*****************************//
  getGoCityList () { //线路列表 - 出发地
    this.self.$http({
      method: 'post',
      url: api + lineListGocityUrl,
      params: ''
    }).then( res => {
      this.self.goCityList = res.data.object
    })
  }
  searchSubmit (data) { // 查询线路列表
    this.self.$http({
      method: 'post',
      url: api + searchSubmitUrl,
      params: data
    }).then( res => {
      this.self.lineListData = res.data.object.list
    })
  }
  linelistAudit (data) { // 线路审核
    this.self.$http({
      method: 'post',
      url: api + lineListAuditUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.this.selectLineListArr.lineCodeList = []
          this.searchSubmit()
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }
  delLineList (data) { // 线路删除
    this.self.$http({
      method: 'post',
      url: api + delLineListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.searchSubmit()
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }
  getLineMaxArea () {
    this.self.$http({
      method: 'post',
      url: api + getMaxAreaUrl,
      params: ''
    }).then( res => {
      this.self.maxAreaList = res.data.object
    })
  }
  getLineShengNeiList () {
    this.self.$http({
      method: 'post',
      url: api + getShengNeiAreaUrl,
      params: ''
    }).then( res => {
      this.self.shengNeiList = res.data
    })
  }
  getLineShengQuList (data) {
    this.self.$http({
      method: 'post',
      url: api + getShengQuUrl,
      params: data
    }).then( res => {
      this.self.shengQuList = res.data.object
    })
  }
  getGuoNeiList (data) {
    this.self.$http({
      method: 'post',
      url: api + getGuoNeiUrl,
      params: data
    }).then( res => {
      this.self.guoNeiList = res.data.object
    })
  }

  oneSubmitForm (data) { //线路第一步提交表单
    this.self.$http({
      method: 'post',
      url: api + oneSubmitFormUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.steps++
        this.getTripNum({linecode: res.data.object})
        this.self.lineCode = res.data.object
        this.self.tripLineCode = res.data.object
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }

  //参团性质
  getNatureList (data) {
    this.self.$http({
      method: 'post',
      url: api + getNatureListUrl,
      params: data
    }).then( res => {
      this.self.lineNatureData = res.data.rows
    })
  }

  addNatureList (data) {
    this.self.$http({
      method: 'post',
      url: api + addNatureListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getNatureList({page: 1})
          this.self.lineNatureForm.natureCode = ''
          this.self.lineNatureForm.natureName = ''
          this.self.lineNatureForm.sort = ''
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  editNatureList (data) {
    this.self.$http({
      method: 'post',
      url: api + editNatureListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getNatureList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  delNatureList (data) {
    this.self.$http({
      method: 'post',
      url: api + delNatureListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getNatureList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  checkNatureName (data) {
    this.self.$http({
      method: 'post',
      url: api + checkNatureNameUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.name = res.data.message
        this.self.checkMessage.nameStatus = res.data.statusCode
      } else {
        this.self.checkMessage.nameStatus = res.data.statusCode
      }
    })
  }
  checkNatureCode (data) {
    this.self.$http({
      method: 'post',
      url: api + checkNatureCodeUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.natureCode = res.data.message
        this.self.checkMessage.natureCodeStatus = res.data.statusCode
      } else {
        this.self.checkMessage.natureCodeStatus = res.data.statusCode
      }
    })
  }

  //主题管理
  getThemeList (data) {
    this.self.$http({
      method: 'post',
      url: api + getThemeListUrl,
      params: data
    }).then( res => {
      this.self.lineThemeData = res.data.rows
    })
  }

  addThemeList (data) {
    this.self.$http({
      method: 'post',
      url: api + addThemeListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getThemeList({page: 1})
          this.self.lineThemeForm.themeCode = ''
          this.self.lineThemeForm.themeName = ''
          this.self.lineThemeForm.sort = ''
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  editThemeList (data) {
    this.self.$http({
      method: 'post',
      url: api + editThemeListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getThemeList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  delThemeList (data) {
    this.self.$http({
      method: 'post',
      url: api + delThemeListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getThemeList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  checkThemeName (data) {
    this.self.$http({
      method: 'post',
      url: api + checkThemeNameUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.name = res.data.message
        this.self.checkMessage.nameStatus = res.data.statusCode
      } else {
        this.self.checkMessage.nameStatus = res.data.statusCode
      }
    })
  }
  checkThemeCode (data) {
    this.self.$http({
      method: 'post',
      url: api + checkThemeCodeUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.themeCode = res.data.message
        this.self.checkMessage.themeCodeStatus = res.data.statusCode
      } else {
        this.self.checkMessage.themeCodeStatus = res.data.statusCode
      }
    })
  }

  //出发城市
  getCityList (data) {
    this.self.$http({
      method: 'post',
      url: api + getCityListUrl,
      params: data
    }).then( res => {
      this.self.lineCityData = res.data.rows
    })
  }

  addCityList (data) {
    this.self.$http({
      method: 'post',
      url: api + addCityListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getCityList({page: 1})
          this.self.lineCityForm.cityCode = ''
          this.self.lineCityForm.cityName = ''
          this.self.lineCityForm.sort = ''
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  getProvincetList (data) {
    this.self.$http({
      method: 'post',
      url: api + getProvincetUrl,
      params: data
    }).then( res => {
      this.self.provinceList = res.data.rows
    })
  }

  getAreaList (data) {
    this.self.$http({
      method: 'post',
      url: api + getGuoNeiUrl,
      params: data
    }).then( res => {
      this.self.areaList = res.data.object
    })
  }

  getAreaWaiList (data) {
    this.self.$http({
      method: 'post',
      url: api + getOneGuoNeiUrl,
      params: data
    }).then( res => {
      this.self.guoWaiList = res.data.object
    })
  }

  editCityList (data) {
    this.self.$http({
      method: 'post',
      url: api + editCityListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getCityList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  delCityList (data) {
    this.self.$http({
      method: 'post',
      url: api + delCityListUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.getCityList({page: 1})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  checkCityCode (data) {
    this.self.$http({
      method: 'post',
      url: api + checkCityCodeUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.cityCode = res.data.message
        this.self.checkMessage.cityCodeStatus = res.data.statusCode
      } else {
        this.self.checkMessage.cityCodeStatus = res.data.statusCode
      }
    })
  }

  getLabelList (data) {
    this.self.$http({
      method: 'post',
      url: api + labelListUrl,
      params: data
    }).then( res => {
      this.self.labelList = res.data.object.list
      //console.log(this.self.labelList)
    })
  }

  tripSubmitTwo (data) { //第2步提交表单
    this.self.$http({
      method: 'post',
      url: api + tripSubmitTwoUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.steps++
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }

  getTripNum (data) {
    this.self.$http({
      method: 'post',
      url: api + twoLineUrl,
      params: data
    }).then( res => {
      this.self.tripDayList = res.data.rows[0].schedulingDay
      for (var i = 1; i <= res.data.rows[0].schedulingDay; i++) {
        this.self.tripFormArr.push(
          {
            day: i,
            title: '',
            meals: '',
            isstay: 0,
            mealsList: [],
            line55List: [
              {
                projectcode: '',
                price: '',
                memo: ''
              }
            ],
            line56List: [
              {
                linecode: '',
                dayid: '1',
                projectcode: '',
                itemdesc: '',
                memo: ''
              }
            ],
            line8List: [
              {
                itemcode: '',
                intemdesc: '',
                price: ''
              }
            ],
            memo: '请输入。。'
          }
        )
      }
    })
  }

  getPricelist (data) {
    this.self.$http({
      method: 'post',
      url: api + priceListUrl,
      params: data
    }).then( res => {
      this.self.priceList = res.data.rows
      //console.log(res.data.rows)
    })
  }

  editLinePrice (data) {
    this.self.$http({
      method: 'post',
      url: api + editLinePriceUrl,
      params: data
    }).then( res => {
      this.getPricelist({page: 1})
    })
  }

  editLinePrice2 (data) {
    this.self.$http({
      method: 'post',
      url: api + editLinePriceUrl2,
      params: data
    }).then( res => {
      this.getPricelist({page: 1})
    })
  }

  specialDateTable (data) { //线路第3步特殊日期-左边日期特殊价格列表
    this.self.$http({
      method: 'post',
      url: api + specialDateList,
      params: data
    }).then( res => {
      this.self.editSpecialDatePriceList = res.data.object
    })
  }

  delSpanDate (data) { //线路第3步特殊日期-左边日期特殊价格删除
    this.self.$http({
      method: 'post',
      url: api + delSpanDateUrl,
      params: data
    }).then( res => {
      if(res.data.statusCode == 200){
        this.specialDateTable(this.self.specialDateTableForm)
      }
      console.log(res.data)
    })
  }

  editSpecialSubmit (data) { //线路第3步特殊价格保存
    this.self.$http({
      method: 'post',
      url: api + editSpecialDetermineUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.steps++
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }

  //添加优惠
  addPreferen (data) {
    this.self.$http({
      method: 'post',
      url: api + addPreferenUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }
  // 优惠列表
  getPreferenList (data) {
    this.self.$http({
      method: 'post',
      url: api + preferenListUrl,
      params: data
    }).then( res => {
      this.self.preferenListData = res.data.object
    })
  }

  // 列表添加优惠
  addListPreferen (data) {
    this.self.$http({
      method: 'post',
      url: api + addListPreferenUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }
  // 列表优惠列表
  getListPreferenList (data) {
    this.self.$http({
      method: 'post',
      url: api + preferenListUrl2,
      params: data
    }).then( res => {
      this.self.preferenListData2 = res.data.object
      console.log(res.data.object)
    })
  }

  // 编辑线路基本信息 - 数据
  editLineInfo (data) {
    this.self.$http({
      method: 'post',
      url: api + editLineInfoUrl,
      params: data
    }).then( res => {
      this.self.lineReleaseForm.linename = res.data.object.linename
      this.self.lineReleaseForm.linedesc = res.data.object.linedesc
      this.self.lineReleaseForm.schedulingDay = res.data.object.schedulingDay
      this.self.lineReleaseForm.expiredate = res.data.object.expiredate
      this.self.lineReleaseForm.isTraffic = res.data.object.isTraffic
      this.self.lineReleaseForm.fTraffic = res.data.object.fTraffic
      this.self.lineReleaseForm.tTraffic = res.data.object.tTraffic
      this.self.shengCode = res.data.object.line33Models[0].provincecode
      for (let value of res.data.object.line2Models) {
        this.self.themeCodeArr.push(value.themeCode)
      }
      for (let value of res.data.object.line11Models) {
        this.self.labelCodeArr.push(value.labelcode)
      }
      for (let value of res.data.object.line3Models) {
        this.self.goCityArr.push(value.cityCode)
      }
      for (let value of res.data.object.line33Models) {
        this.self.destCityArr.push(value.citycode)
      }
      if (res.data.object.isNew === 0) {
        this.zhub = true
      }
      if (res.data.object.isHot === 0) {
        this.zhuc = true
      }
      if (res.data.object.isPromote === 0) {
        this.zhud = true
      }
      if (res.data.object.isRecommend === 0) {
        this.zhua = true
      }
    })
  }
  // 编辑线路基本信息提交
  editLineInfoSubmit (data) {
    this.self.$http({
      method: 'post',
      url: api + editLineInfoSubmitUrl,
      params: data
    }).then( res => {
      if ( res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.steps++
      }else{
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }
  // 编辑线路第二步信息
  editLineTravelInfo (data) {
    this.self.$http({
      method: 'post',
      url: api + editLineTravelInfoUrl,
      params: data
    }).then( res => {
      for (let value of res.data.object) {
        this.self.tripFormArrEdit.push(this.self.tripForm)
        this.self.tripFormArrEdit[value.day - 1].title = value.title
        this.self.tripFormArrEdit[value.day - 1].isstay = value.isstay
        this.self.tripFormArrEdit[value.day - 1].mealsList = value.mealsList
        this.self.tripFormArrEdit[value.day - 1].memo = value.memo
        this.self.tripFormArrEdit[value.day - 1].line55List = value.line55List
        this.self.tripFormArrEdit[value.day - 1].line56List = value.line56List
        this.self.tripFormArrEdit[value.day - 1].line8List = value.line8List
        this.self.tripFormArrEdit[value.day - 1].dayid = value.dayid
      }
    })
  }
  // 编辑线路第二步保存
  editLineTravelSubmit (data) {
    this.self.$http({
      method: 'post',
      url: api + editLineTravelSubmitUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.steps++
      } else {
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }

  // 发布线路
  publishLine (data) {
    this.self.$http({
      method: 'post',
      url: api + publishLineUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 200) {
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.$router.push({path: '/index/line_list'})
      } else {
        this.self.$Notice.error({
          title: res.data.message
        })
      }
    })
  }

  // 渠道列表
  channelList () {
    this.self.$http({
      method: 'post',
      url: api + channelListUrl,
      params: ''
    }).then( res => {
      console.log(res.data.object)
      /*for (let value of res.data.object) {
       this.self.baseData.title = value.title
       }*/
      this.self.baseData = res.data.object
    })
  }
/******************************************供应商******************************************/
    addSupplier (data) {
        this.self.$http({
            method: 'post',
            url: api + util.setUrl(1, 'oven'),
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path:'/index/supplier' })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    oneSupplier (id) {
      this.self.$http({
        method:'post',
        url: api + ovenOne,
        params: {venCode:id}
      }).then(res => {
        this.self.operator = res.data.object[0]
        console.log(res.data)
      })
    }

    editSupplier (data) {
      delete data.DBname
      delete data.updateDate
      delete data.updateUser
      delete data.createDate
      delete data.createUser
      this.self.$http({
        method: 'post',
        url: api + util.setUrl(2, 'oven'),
        params: data

      }).then(res => {
        switch (res.data.statusCode) {
          case 200:
            getList.getSupplier(1)
            this.self.$Notice.success({
                title: res.data.message
            })
            this.self.$router.push({ path:'/index/supplier' })
            break
          case 300:
            this.self.$Notice.error({
                title: res.data.message
            })
            break
        }
      })
    }

    //删除供应商
    deleteSupplier ( id ) {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(3,'oven'),
            params: {venCode:id}
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    getList.getSupplier(1,this.self,'oven')
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    /******************************************分销商******************************************/
    oneDistributor (id) {
        this.self.$http({
            method:'post',
            url: api + ocustOne,
            params: {cusCode:id}
        }).then(res => {
            this.self.operator = res.data.object[0]
        })
    }

    removeDistributor (id) {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(3,'ocust'),
            params: {cusCode:id}
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    getList.getSupplier(1,this.self,'ocust')
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }


    /*****************************************签证类别****************************************/
    getVisaType () {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(4,'ovitp')
        }).then(res => {
            this.self.visaType = res.data.rows
        })
    }
    getCountryList () {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(4,'outy')
        }).then(res => {
            this.self.countryList = res.data.rows
        })
    }
    submitVisa ( data ) {
        this.self.$http({
            method:'post',
            url: api + util.setUrl(1,'ovsa'),
            params: data
        }).then(res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }


    /*******************************签证类别******************************/

    visaAdd ( data ) {
        this.self.$http({
            method:'post',
            url:api + util.setUrl(1,'ovsa'),
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.status = 'upload'
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }


    /****************************订单********************************/
    //提交订单 ken 2017-06-29 15:48:27
    addOrder ( data ) {
        this.self.$http({
            method:'post',
            url:api + util.setUrl(1,'ordr'),
            params:data
        }).then( res => {
            switch ( res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/index/order_list'})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //修改订单 Ken 2017-07-05 15:35:09
    editOrder ( data ) {
        this.self.$http({
            method:'post',
            url:api + '/biz/ordr/update.do',
            params:data
        }).then( res => {
            switch ( res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/index/order_list'})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //订单变更操作
    changeOrder ( data ) {
        this.self.$http({
            method:'post',
            url:api + '/biz/ordr/checkLog.do',
            params:data
        }).then( res => {
            switch ( res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    getList.searchChangeOrder(this.self,1)
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    break
            }
        })
    }

    //删除订单 ken 2017-06-30 18:17:28
    removeOrder ( code ) {
        this.self.$http({
            method:'post',
            url:api + '/biz/ordr/delOrdr.do',
            params:{ docentry:code }
        }).then( res => {

            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    //提交付款 Ken 2017-07-06 09:42:07
    geiqian ( data ) {
        this.self.$http({
            method:'post',
            url:api + '/biz/orce/collectMoney.do',
            params:data
        }).then(res => {
            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    this.self.collectShow = false
                    getList.getOrderAll ( this.self, { pageNum: this.self.current, type:'pay' })
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    //确认收款 Ken  2017-07-06 11:31:21
    affirmShouQian ( code,moneys ) {
        this.self.$http({
            method: 'post',
            url:api + '/biz/orce/multiConfirm.do',
            params: { codes: code,moneys:moneys  }
        }).then( res => {
            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    this.self.collectShow = false
                    getList.getUnAffirm ( this.self )
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    //退款 Ken 2017-07-07 10:10:27
    huanqian (data) {
        this.self.$http({
            method:'post',
            url:api + '/biz/orfd/returnMoney.do',
            params:data
        }).then(res => {
            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    this.self.collectShow = false
                    getList.getOrderAll ( this.self, { pageNum: this.self.current, type:'return' })
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    //确认退款 Ken 2017-07-07 10:23:41
    affirmRefund ( code,moneys ) {
        this.self.$http({
            method: 'post',
            url:api + '/biz/orfd/multiConfirm.do',
            params: { codes: code,moneys:moneys  }
        }).then( res => {
            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    this.self.collectShow = false
                    getList.getUnAffirmRefund ( this.self )
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    //成团
    clustered ( data ) {
      this.self.$http({
        method: 'post',
        url: api + '/biz/oitg/group.do',
        params: data
      }).then( res => {
        switch ( res.data.statusCode ) {
          case 200:
            this.self.$Notice.success({ title:res.data.message})
            this.self.$router.push({ path: '/index/order_list'})
            break
          case 300:
            this.self.$Notice.error({ title:res.data.message})
            break
        }
      })
    }

    //转团
    changeTeam (data) {
        this.self.$http({
            method: 'post',
            url: api + '/biz/ordr/changeOrdr.do',
            params: data
        }).then( res => {
            switch ( res.data.statusCode ) {
                case 200:
                    this.self.$Notice.success({ title:res.data.message})
                    this.self.searchOrder( this, { linecode:this.self.temporaryData.linecode, dbName: this.self.temporaryData.dbName },'list')
                    break
                case 300:
                    this.self.$Notice.error({ title:res.data.message})
                    break
            }
        })
    }

    // 修改备注
    editMemo ( data ) {
      this.self.$http({
        method: 'post',
        url: api + '/biz/oitg/edit.do',
        params: data
      }).then ( res => {
        console.log(res)
      })
    }

  /*******************************语种管理******************************/

// 添加语种 Zhou 2017-6-27 16:10:23
  addLanguagePerm (data){
    this.self.$http({
      method: 'post',
      url: api + addLanguagePermUrl,
      params: data
    }).then( res => {
      if(res.data.statusCode == 200){
        this.self.$Notice.success({
          title: res.data.message
        })
        this.self.add = false
        getList.getLanguageList (1, this.self)
      }
    })
  }

// 编辑语种 Zhou 2017-6-27 16:02:13
  editLanguagePerm ( code ){
    this.self.$http({
      method: 'post',
      url: api + editLanguagePermUrl,
      params: { languagecode:code }
    }).then(res => {
      // this.self.editData = res.data.object
      // console.log(res)
    })
  }

// 编辑语种信息 Zhou  2017-6-29 14:40:45
  editLanguageInfo ( data ) {
    delete data.updateDate
    delete data.DBname
    delete data.updateUser
    delete data.createDate

    this.self.$http({
      method: 'post',
      url: api + editLanguagePermUrl,
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.edit = false
          getList.getLanguageList (1, this.self)
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          this.self.edit = false
          getList.getLanguageList (1, this.self)
          break
      }
    })
  }

 // 删除语种 Zhou 2017-6-27 16:02:47
  removeLanguage ( num ) {
    this.self.$http.post(api + removerLanguageUrl + '?languagecode=' + num).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.add = false
          getList.getLanguageList (1, this.self)
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          this.self.add = false
          break
      }
    })
  }

// 校验语种编号 Zhou 2017-6-27 19:03:10
  checkLanguage (data) {
    this.self.$http({
      method: 'post',
      url: api + checkLanguageUrl,
      params: data
    }).then( res => {
      if (res.data.statusCode == 300) {
        this.self.checkMessage.themeCode = res.data.message
        this.self.checkMessage.themeCodeStatus = res.data.statusCode
      } else {
        this.self.checkMessage.themeCodeStatus = res.data.statusCode
      }
    })
  }

  /*******************************导游管理******************************/
  getLanguage () {
    this.self.$http({
      method:'post',
      url: api + '/sys/olge/find.do'
    }).then(res => {
      console.log(this.self.guideData.olgeList)
      this.self.guideData.olgeList = res.data.object
    })
  }

  //添加导游
  addGuide (data) {
    this.self.$http({
      method: 'post',
      url: api + util.setUrlSYS(1, 'ogde'),
      params: data
    }).then(res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          //this.self.$router.push({ path: '/index/guide', query: {page: 1}})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  //编辑导游
  editGuide (data) {
    this.self.$http({
      method: 'post',
      url: api + util.setUrlSYS(2, 'ogde'),
      params: data
    }).then(res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          //this.self.$router.push({ path: '/index/guide', query: {page: 1}})
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          break
      }
    })
  }

  //点击编辑导游
  viewGuideEdit (guidecode) {
    this.self.$router.push({ path: '/index/guide_edit', query: { guidecode: guidecode }})
  }

  //删除导游
  removeGuide (guidecode) {
    this.self.$http.post(api + removerGuideUrl + '?guidecode=' + guidecode).then(res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.add = false
          getList.getGuideList(1, this.self)
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          this.self.add = false
          break
      }
    })
  }

  //提交派团
  submitPaiTuan( data ) {
    this.self.$http({
      method: 'post',
      url: api + '/biz/gmg1/add.do',
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.add = false
          getList.getGuideList(1, this.self)
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          this.self.add = false
          break
      }
    })

  }

  //编辑派团
  submitPaiTuanEidt( data ) {
    this.self.$http({
      method: 'post',
      url: api + '/biz/gmg1/edit.do',
      params: data
    }).then( res => {
      switch (res.data.statusCode) {
        case 200:
          this.self.$Notice.success({
            title: res.data.message
          })
          this.self.add = false
          getList.getGuideList(1, this.self)
          break
        case 300:
          this.self.$Notice.error({
            title: res.data.message
          })
          this.self.add = false
          break
      }
    })

  }
}

