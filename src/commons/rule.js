class rule {
    bound (self) {
        $(() => {
            $("#cmpID").keyup( (e) => {
                self.operator.cmpID = self.operator.cmpID.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })

            $("#venCode").keyup( (e) => {
                self.operator.venCode = self.operator.venCode.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })

            $("#cusCode").keyup( (e) => {
                self.operator.cusCode = self.operator.cusCode.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })

            $("#cmpName").keyup( (e) => {
                self.operator.cmpName = self.operator.cmpName.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
            })

            $("#dbID").keyup( (e) => {
                self.operator.dbID = self.operator.dbID.replace(/[^\a-\z\A-\Z0-9_]/g,'')
            })

            $("#systNo").keyup( (e) => {
                self.operator.systNo = self.operator.systNo.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })

            $("#cardCode").keyup( (e) => {
                self.operator.cardCode = self.operator.cardCode.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })

            $("#legadid").keyup( (e) => {
                self.operator.legadid = self.operator.legadid.replace(/[^\a-\z\A-\Z0-9]/g,'')
            })
           

            $("#bankNo").keyup( (e) => {
                self.operator.bankNo = self.operator.bankNo.replace(/[^0-9]/g,'')
            })
            
            $("#tel").keyup( (e) => {
                self.operator.tel = self.operator.tel.replace(/[^0-9]/g,'')
            })

            $("#mobile").keyup( (e) => {
                self.operator.mobile = self.operator.mobile.replace(/[^0-9]/g,'')
            })

            $("#fax").keyup( (e) => {
                self.operator.fax = self.operator.fax.replace(/[^0-9]/g,'')
            })

            $("#regcapital").keyup( (e) => {
                self.operator.regcapital = self.operator.regcapital.replace(/[^0-9]/g,'')
            })
        })
    }
}

export default new rule()