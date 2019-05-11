import Util from '../commons/util'
import Config from '../config/config'

const api = new Config().getApi()
const util = new Util()

class ajaxCheck {
    checkAreaBig (self,name) {
        self.$http({
            method:'post',
            url:api + '/sys/orea/ajaxCheckoreainfo.do',
            params:{ areaName:name }
        }).then( res => {
            console.log(res)
        })
    }
}


export default new ajaxCheck()