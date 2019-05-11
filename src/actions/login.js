import Config from '../config/config'

const api = new Config().getApi()

const ext = '/userExit.do'

export default class login {
    constructor ( self ) {
        this.self = self
    }

    login ( data,urls ) {
        let that = this.self
        this.self.$http({
            method: 'post',
            url: api + urls,
            params: data
        }).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/index',query:{ name: res.data.object }})
                    console.log(res.data.object.userID)
                    this.self.$cookie.set('userID',res.data.object.userID)
                    this.self.$cookie.set('cmpID',res.data.object.cmpID)
                    this.self.$cookie.set('cmpName',res.data.object.cmpName)
                    this.self.$cookie.set('cmpType',res.data.object.cmpType)
                    this.self.$cookie.set('orleCode',res.data.object.orleCode)
                    this.self.$cookie.set('sysadmin',res.data.object.sysadmin)
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.add = false
                    break
            }
        })
        .catch(function (error) {
          that.$router.push({ path: '/error'})
        })
    }

    userExt () {
       this.self.$http.post(api + ext).then( res => {
            switch (res.data.statusCode) {
                case 200:
                    this.self.$Notice.success({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/',})
                    break
                case 300:
                    this.self.$Notice.error({
                        title: res.data.message
                    })
                    this.self.$router.push({ path: '/',})
                    this.self.add = false
                    break
            }
        })
    }
}
