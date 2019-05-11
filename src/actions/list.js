import Config from '../config/config'
import Util from '../commons/util'

const api = new Config().getApi()
const util = new Util()


class List {

    //获取订单左侧菜单列表 ken 2017-06-23 14:22:13
    allLeftMenu(self) {
        self.$http({
            method: 'post',
            url:api + '/biz/oline/getOrderMenu.do'
        }).then( res => {
            console.log(res.data.object)
            self.menuForLeft = res.data.object
        })
    }

    //获取线路列表 ken 2017-06-27 11:56:23
    searchLine (self,data) {
        self.$http({
            method: 'post',
            url:api + '/biz/oline/selectByDestinationCode.do',
            params:data
        }).then( res => {

            if ( res.data.length !== 0) {
                self.treePanel = false
                self.pruList = true
                self.lineList = res.data
            } else{
                self.$Notice.error({
                    title: '暂时无此地区线路'
                })
            }

        })
    }

    //获取订单列表 ken 2017-06-27 11:58:34
    searchOrder (self,data,type) {
        self.$http({
            method:'post',
            url:api + '/biz/line444/getAllowBookGroupList.do',
            params:data
        }).then( res => {

            if (type === 'list') {
              self.orderData = res.data[0].list
            } else {
              self.orderData = res.data

              self.addroomamt = res.data[0].addroomamt
              self.dowmroomamt = res.data[0].dowmroomamt
            }
        })
    }


    //获取变更订单列表
    searchChangeOrder (self,data) {
        self.$http({
            method:'post',
            url:api + '/biz/ordr/selecClogtList.do',
            params:data
        }).then( res => {
            self.orderList = res.data.rows
            self.total = res.data.total
        })
    }

    //获取已提交订单的列表  ken 2017-06-30 16:41:39
    getOrderAll ( self,data ) {
        self.$http({
            method:'post',
            url:api + '/biz/ordr/selectList.do',
            params:data
        }).then( res => {
            self.orderList = res.data.object
        })
    }

    //获取修改订单信息
    getOrderEdit (self,data) {
        self.$http({
            method:'post',
            url: api + '/biz/ordr/selectOrdr.do',
            params:data
        }).then( res => {
            self.orderData = res.data.object
            self.touristData = res.data.object.rdr1ModelList
            self.touristData.forEach( el => {

                    el.rdr11ModelList.forEach( el2 => {
                        self.subjoin = self.subjoin + parseFloat(el2.price)
                        self.rentalSum = self.rentalSum + self.subjoin
                    })
                })
            self.personNum = res.data.object.rdr1ModelList.length
        })
    }

    //拉取部门列表 ken 2017-06-02 10:15:04
    getBaseInfo ( current,self ) {
        self.$http({
            method: 'post',
            url: api + util.setUrl(4,'odpt'),
            params: {page:current}
        }).then( res => {
            self.departData = res.data.rows
            self.total = res.data.total
        })
    }

    //根据条件查询 ken 2017-06-14 09:57:25
    conditionalSearch ( data,self ) {
        self.$http({
            method: 'post',
            url: api + util.setUrl(4,'odpt'),
            params: data
        }).then( res => {
            self.departData = res.data.rows
            self.total = res.data.total
            self.$Notice.success({
              title: "查询成功"
            })
        })
    }


    //获取供应商列表
    getSupplier (current,self,str) {
        self.$http({
            method:'post',
            url: api + util.setUrl(4,str),
            params: {page:current}
        }).then(res => {
            self.departData = res.data.rows
            self.total = res.data.total
        })
    }

    //获取用户列表
    getUserList ( data,self ) {
        self.$http({
            method: 'post',
            url: api + util.setUrl(4,'ousr'),
            params: data
        }).then( res => {
            self.userData = res.data.rows
            self.total = res.data.total
        })
    }

    //获取国家里列表  ken  2017-06-14 14:34:14
    getCountry (self) {
        self.$http.post(api + '/biz/outy/list.do').then( res => {
            self.compList = res.data.rows
        })
    }


    //获取签证类别  ken 2017-06-14 15:03:47
    getVisaType (self) {
        self.$http.post(api + '/biz/ovitp/list.do').then( res => {
            self.typeList = res.data.rows
        })
    }

    //获取签证列表
    visaList (self) {
        self.$http.post(api + '/biz/ovsa/list.do').then( res => {
            self.departData = res.data.rows
        })
    }

    //查询单条签证记录
    visaOne (self,code) {
        self.$http.post(api + '/biz/ovsa/list.do?visacode=' + code).then( res => {
            self.visaAdd = res.data.rows[0]
        })
    }


    //获取所有区域列表
    allArea(self) {
        self.$http({
            method:'post',
            url:api + '/sys/orea/selectAllList1.do'
        }).then(res => {
            self.allList = res.data.object
        })
    }

    //获取目的地城市类型 ken 15点43分
    getDestinationType (self) {
        self.$http({
            method:'post',
            url:api + '/biz/odton/list.do'
        }).then( res => {
            self.destination = res.data.rows
        })
    }

    //获取省内游
    getDestinationList ( self ) {
        self.$http({
            method:'post',
            url:api + '/sys/opvn/selectOpvnList.do'
        }).then( res => {
            self.provinceList = res.data
        })
    }

    //获取附加产品 ken 2017-06-29 13:48:47
    getAdditional ( self ) {
        self.$http({
            method:'post',
            url:api + '/biz/line8/list.do'
        }).then( res => {
            self.additionalList = res.data.object.list
        })
    }

    //获取加减房差 ken 2017-06-29 13:49:18
    getPriceSpread ( self,data) {
        self.$http({
            method:'post',
            url:api + '/biz/line444/list.do',
            params:data
        }).then( res => {

            self.pricePanel = res.data.rows[0]

            self.addroomamt = res.data.rows[0].addroomamt
            self.dowmroomamt = res.data.rows[0].dowmroomamt

            self.addroomamtSum = self.touristData.length * res.data.rows[0].addroomamt
            self.dowmroomamtSum = self.touristData.length * res.data.rows[0].dowmroomamt

            self.comboSum = self.touristData.length * res.data.rows[0].saleprice
            self.rentalSum = self.comboSum + self.addroomamtSum - self.dowmroomamtSum
        })
    }


    //获取未确认收款列表  Ken 2017-07-06 11:13:49
    getUnAffirm ( self ) {
        self.$http({
            method:'get',
            url:api + '/biz/orce/list.do'
        }).then( res => {
            self.orderList = res.data.rows
        })
    }

    //获取未确认收款列表  Ken 2017-07-06 11:13:49
    getUnAffirmRefund ( self ) {
        self.$http({
            method:'get',
            url:api + '/biz/orfd/list.do'
        }).then( res => {
            self.orderList = res.data.rows
        })
    }

  getLanguageList ( data,self ) {
    self.$http({
      method: 'post',
      url: api + util.setUrlSYS(4,'olge'),
      params: data
    }).then( res => {
      self.languageData = res.data.object
    })
  }

  LanguageSearch ( data,self ) {
    self.$http({
      method: 'post',
      url: api + util.setUrl(4,'olge'),
      params: data
    }).then( res => {
      self.languageData = res.data.rows
      self.total = res.data.total
      self.$Notice.success({
        title: "²éÑ¯³É¹¦"
      })
    })
  }

  //获取导游列表
  getGuideList (current, self) {
    self.$http({
      method: 'post',
      url: api + '/sys/ogde/list.do',
      params: {page: current}
    }).then( res => {
      self.guideData = res.data.object.list
      self.total = res.data.object.totalRow
    })
  }

  //根据条件查询导游
  searchGuide(data, self) {
    self.$http({
      method: 'post',
      url: api + '/sys/ogde/list.do',
      params: data
    }).then(res => {
      self.guideData = res.data.object.list
      self.total = res.data.object.totalRow
      self.$Notice.success({
        title: "查询成功"
      })
    })
  }

  //点击编辑导游
  getGuideDetail(data, self) {
    self.$http({
      method: 'post',
      url: api + '/sys/ogde/find_guide_and_language.do',
      params: data
    }).then(res => {
      self.guideData.guidecode = res.data.object.ogde.guidecode
      self.guideData.guidename = res.data.object.ogde.guidename
      self.guideData.level = res.data.object.ogde.level
      self.guideData.certificate = res.data.object.ogde.certificate
      self.guideData.price = res.data.object.ogde.price
      self.guideData.memo = res.data.object.ogde.memo
      self.guideData.olgeList = res.data.object.olge
      self.$Notice.success({
        title: "查询成功"
      })
    })
  }

  //点击编辑导游
  getChannel(self) {
    self.$http({
      method: 'post',
      url: api + '/sys/line/select.do'
    }).then(res => {
      if (res.data.statusCode == 200) {
        self.channelData = res.data.object
        console.log(self.channelData.list[0])
      }
      self.$Notice.success({
        title: "查询成功"
      })
    })
  }

  //获取派团信息
  paiTuanInfo ( self,data ) {
      self.$http({
        method: 'post',
        url: api + '/biz/oitg/getOitg.do',
        params: data
      }).then( res => {
        self.paiTuanItem = res.data.object
      })
  }

  paiTuanEditInfo ( self,data ) {
    self.$http({
      method: 'post',
      url: api + '/biz/gmg1/getGmg1.do',
      params: data
    }).then( res => {
      self.paiTuanItem2 = res.data.object
    })
  }

  getDaoyouList (self,data) {
    self.$http({
      method: 'post',
      url: api + '/sys/ogde/getOgdeLanguageName.do',
      params: data
    }).then( res => {
      self.daoyouData.length = 0

      self.daoyouData = res.data.object
    })
  }

  getDaoyouList2 (self,data) {
    self.$http({
      method: 'post',
      url: api + '/sys/ogde/getOgdeLanguageName.do',
      params: data
    }).then( res => {
      self.daoyouData.length = 0

      res.data.object.map( (el,i) => {
        if (self.localcode.length !== 0) {
          self.localcode.map( (ell,i) => {

            if ( ell ===  el.guidecode) {
              el._checked = true
            }
          })
          console.log(self.localcode)
        }

        if (self.allcode.length !== 0) {
          self.allcode.map( (ell,i) => {

            if ( ell ===  el.guidecode) {
              el._checked = true
            }
          })
          console.log(self.allcode)
        }

      })
      self.daoyouData = res.data.object
    })
  }
}

export default new List()
