<template>
  <div class="line-release-font">
    <Card>
      <Steps slot="title" :current="steps" class="step-margin">
        <Step title="已完成" content="基本信息"></Step>
        <Step title="进行中" content="行程安排"></Step>
        <Step title="待进行" content="价格计划"></Step>
        <!--<Step title="待进行" content="销售渠道"></Step>-->
      </Steps>
      <div class="tabLineEdit">
        <span @click="steps = 0" :class="steps === 0 ? 'active':''">编辑基本信息</span>
        <span @click="steps = 1" :class="steps === 1 ? 'active':''">编辑行程安排</span>
        <span @click="steps = 2" :class="steps === 2 ? 'active':''">编辑价格计划</span>
      </div>
      <Row>
        <Col class="line-release-from"  span="24">
        <!-- 第1步 -->
        <div class="steps-one" v-if="steps == 0">
          <Form ref="lineReleaseForm" :model="lineReleaseForm" :rules="lineReleaseRuleVali"  :label-width="95">
            <Form-item label="线路名称" prop="linename">
              <Input v-model="lineReleaseForm.linename" placeholder="请输入线路名称" />
            </Form-item>
            <Form-item label="副标题" prop="linedesc">
              <Input v-model="lineReleaseForm.linedesc" placeholder="请输入副标题" />
            </Form-item>
            <Form-item label="行程天数" prop="schedulingDay" >
              <Input v-model="lineReleaseForm.schedulingDay" placeholder="请输入行程天数" />
            </Form-item>
            <Form-item label="过期时间">
              <!--<Input v-model="lineReleaseForm.expiredate" placeholder="请选择过期时间" />-->
              <Date-picker type="date" v-model="lineReleaseForm.expiredate" @on-change="getExpiredate" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Form-item>
            <Form-item label="出发城市">
              <div class="orea-wrap orea-go">
                <div class="orea-wrap-cent" v-for="(item,key) in guoNeiList" :key="123">
                  <div class="orea-wrap-left fl">
                    <span>{{item.menuName}}</span>
                  </div>
                  <div class="orea-wrap-right fl">
                    <Checkbox-group v-model="goCityArr">
                      <Checkbox v-for="value in item.childList" :label="value.menuCode"  :key="123"><span>{{value.menuName}}</span></Checkbox>
                    </Checkbox-group>
                  </div>
                </div>
              </div>
            </Form-item>
            <Form-item label="目的地城市" class="mudiPosi">
              <Select  placeholder="请选择省份" @on-change="changeShengFen" v-model="shengCode" class="shengfen" v-if="tabName == '省内游'" >
                <Option :value="item.provinceCode" v-for="item in shengNeiList" :key="123">{{item.provinceName}}</Option>
              </Select>
              <Tabs value="name1" v-model="tabName" :animated="true" >
                <Tab-pane :label="item.dtonName" :name="item.dtonName" v-for="item in maxAreaList" :key="123" >
                  <div class="orea-wrap" v-if="tabName == '境外游'">
                    <div class="orea-wrap-cent" v-for="(value,key) in guoWaiList" :key="123" >
                      <div class="orea-wrap-left fl">
                        <span>{{value.menuName}}</span>
                      </div>
                      <div class="orea-wrap-right fl">
                        <Checkbox-group v-model="destCityArr">
                          <Checkbox :label="minvalue.menuCode" v-for="minvalue in value.childList" :key="123"><span>{{minvalue.menuName}}</span></Checkbox>
                        </Checkbox-group>
                      </div>
                    </div>
                  </div>
                  <div class="orea-wrap" v-if="tabName == '国内游'">
                    <div class="orea-wrap-cent" v-for="(value,key) in areaList" :key="123" >
                      <div class="orea-wrap-left fl">
                        <span>{{value.menuName}}</span>
                      </div>
                      <div class="orea-wrap-right fl">
                        <Checkbox-group v-model="destCityArr">
                          <Checkbox :label="minvalue.menuCode" v-for="minvalue in value.childList" :key="123"><span>{{minvalue.menuName}}</span></Checkbox>
                        </Checkbox-group>
                      </div>
                    </div>
                  </div>
                  <div class="orea-wrap" v-if="tabName == '省内游'">
                    <div class="orea-wrap-cent" v-for="(value,key) in shengQuList" :key="123" >
                      <div class="orea-wrap-left fl">
                        <span>{{key}}</span>
                      </div>
                      <div class="orea-wrap-right fl">
                        <Checkbox-group v-model="destCityArr">
                          <Checkbox :label="box.cityCode" v-for="box in value" :key="123">{{box.cityName}}</Checkbox>
                        </Checkbox-group>
                      </div>
                    </div>
                  </div>
                </Tab-pane>
              </Tabs>
            </Form-item>
            <Form-item label="线路主题">
              <Checkbox-group v-model="themeCodeArr">
                <Checkbox :label="item.themeCode" v-for="item in lineThemeData" :key="123"><span>{{item.themeName}}</span></Checkbox>
              </Checkbox-group>
            </Form-item>
            <Form-item label="交通自理">
              <Radio-group v-model="lineReleaseForm.isTraffic">
                <Radio label="0"><span>是</span></Radio>
                <Radio label="1"><span>否</span></Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="往返交通" prop="fTraffic">
              <Row>
                <Col span="4">
                <Form-item prop="fTraffic">
                  <Select v-model="lineReleaseForm.fTraffic" placeholder="请选择">
                    <Option value="fei">飞机</Option>
                    <Option value="huoche">火车</Option>
                    <Option value="qiche">汽车</Option>
                    <Option value="lunchuan">轮船</Option>
                    <Option value="dongche">动车</Option>
                    <Option value="gaotie">高铁</Option>
                    <Option value="zili">自理</Option>
                  </Select>
                </Form-item>
                </Col>
                <Col span="2" class="traffic-padding">往</Col>
                <Col span="4">
                <Form-item prop="tTraffic">
                  <Select v-model="lineReleaseForm.tTraffic" placeholder="请选择">
                    <Option value="fei">飞机</Option>
                    <Option value="huoche">火车</Option>
                    <Option value="qiche">汽车</Option>
                    <Option value="lunchuan">轮船</Option>
                    <Option value="dongche">动车</Option>
                    <Option value="gaotie">高铁</Option>
                    <Option value="zili">自理</Option>
                  </Select>
                </Form-item>
                </Col>
                <Col span="2" class="traffic-padding">返</Col>
              </Row>
            </Form-item>
            <Form-item label="状态" >
              <Checkbox v-model="zhua" >推荐</Checkbox>
              <Checkbox v-model="zhub">新品</Checkbox>
              <Checkbox v-model="zhuc">热销</Checkbox>
              <Checkbox v-model="zhud">特价</Checkbox>
            </Form-item>
            <Form-item label="标签" >
              <Checkbox-group v-model="labelCodeArr">
                <Checkbox :label="item.labelcode" v-for="item in labelList" :key="123">{{item.labeldesc}}</Checkbox>
              </Checkbox-group>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="oneSubmit('lineReleaseForm')">提交</Button>
              <Button type="ghost" @click="oneReset('lineReleaseForm')" style="margin-left: 8px">重置</Button>
            </Form-item>
          </Form>
        </div>
        <!-- 第2步 -->
        <div v-if="steps == 1">
          <Tabs value="tripTab1" v-model="tabTwoTabValue">
            <Tab-pane  :label="'第'+(index+1)+'天'" v-for="(item,index) in tripFormArrEdit" :123="item" >
              <Form ref="lineReleaseForm" :model="tripForm" :rules="tripRuleVali" :label-width="80">
                <Form-item label="行程标题" prop="title">
                  <Input v-model="item.title" placeholder="请输入行程标题"></Input>
                </Form-item>
                <Form-item label="用餐">
                  <Checkbox-group v-model="item.mealsList">
                    <Checkbox label="1"><span>早餐</span></Checkbox>
                    <Checkbox label="2"><span>中餐</span></Checkbox>
                    <Checkbox label="3"><span>晚餐</span></Checkbox>
                  </Checkbox-group>
                </Form-item>
                <Form-item label="住宿" >
                  <Radio-group v-model="item.isstay">
                    <Radio label="0">
                      <span>是</span>
                    </Radio>
                    <Radio label="1">
                      <span>否</span>
                    </Radio>
                  </Radio-group>
                </Form-item>
                <Form-item label="活动安排">
                  <vue-editor v-model="item.memo"></vue-editor>
                </Form-item>
                <Form-item label="附加项目">
                  <Button type="primary" @click="addTwoProject">添加</Button>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th>名称</th>
                      <th>参考价格</th>
                      <th>详情/备注</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in item.line55List" :key="123">
                      <td><Input v-model="item.projectcode" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.price" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.memo" placeholder="请输入..." ></Input></td>
                      <td><Button type="error" @click="delTwoProject(index)">删除</Button></td>
                    </tr>
                    </tbody>
                  </table>
                </Form-item>
                <Form-item label="购物项目">
                  <Button type="primary" @click="addTwoShopPro">添加</Button>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th>名称</th>
                      <th>营业产品</th>
                      <th>说明</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in item.line56List" :key="123">
                      <td><Input v-model="item.projectcode" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.itemdesc" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.memo" placeholder="请输入..." ></Input></td>
                      <td><Button type="error" @click="delTwoShopPro(index)">删除</Button></td>
                    </tr>
                    </tbody>
                  </table>
                </Form-item>
                <Form-item label="附加产品">
                  <Button type="primary" @click="addTwoProduct">添加</Button>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th>产品编号</th>
                      <th>产品名称</th>
                      <th>产品价格</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in item.line8List" :key="123">
                      <td><Input v-model="item.itemcode" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.intemdesc" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.price" placeholder="请输入..." ></Input></td>
                      <td><Button type="error" @click="delTwoProduct(index)">删除</Button></td>
                    </tr>
                    </tbody>
                  </table>
                </Form-item>
                <Form-item>
                  <Button type="primary" @click="tripSubmit">保存</Button>
                </Form-item>
              </Form>
            </Tab-pane>
            <!--<Tab-pane label="行程备注" name="tripTab4">行程备注</Tab-pane>-->
          </Tabs>
        </div>
        <!-- 第3步 -->
        <div v-if="steps == 2">
          <Button type="success" class="add-margin" @click="preferenModalShow">线路优惠</Button>
          <Table :columns="columns3" :data="priceList"></Table>
          <Modal v-model="editLinePriceModal" :width="900" title="编辑线路价格" @on-ok="pricePlanDetermine" :mask-closable="false" >
            <Row>
              <Col span="22" class="margin-center">
              <Form ref="formValidate" :model="editLinePriceForm" :rules="pricePlanRuleVali" :label-width="130" >
                <Form-item label="名称" prop="pricedesc">
                  <Input v-model="editLinePriceForm.pricedesc" placeholder="请输入" style="width: 200px"></Input>
                </Form-item>
                <Form-item label="截止收团 出团日期" prop="minday">
                  <Input v-model="editLinePriceForm.minday" class="input-width" placeholder="请输入"></Input><span class="margin-left">天前截止</span>
                </Form-item>
                <Form-item label="提前预定 出团日期" prop="maxday">
                  <Input v-model="editLinePriceForm.maxday" class="input-width" placeholder="请输入"></Input><span class="margin-left">天前开始预定</span>
                </Form-item>
                <Form-item label="选择日期">
                  <Row>
                    <Col span="8">
                    <Form-item>
                      <Date-picker type="daterange" v-model="editLinePriceFormDates" @on-change="getEditPriceDate" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="5">
                    <Form-item>
                      <Checkbox v-model="editLinePriceForm.isdaygo">默认天天出团</Checkbox>
                    </Form-item>
                    </Col>
                  </Row>
                </Form-item>
                <Form-item label="销售价" prop="saleprice">
                  <Row>
                    <Col span="7" class="margin-right">
                    <Form-item prop="saleprice" class="input-width fl">
                      <Input v-model="editLinePriceForm.saleprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/大人</span>
                    </Col>
                    <Col span="7" class="margin-right">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.childsaleprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/儿童</span>
                    </Col>
                    <Col span="7">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.oldsaleprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/婴儿</span>
                    </Col>
                  </Row>
                </Form-item>
                <Form-item label="同行价" prop="peerprice">
                  <Row>
                    <Col span="7" class="margin-right">
                    <Form-item prop="peerprice" class="input-width fl">
                      <Input v-model="editLinePriceForm.peerprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/大人</span>
                    </Col>
                    <Col span="7" class="margin-right">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.childpeerprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/儿童</span>
                    </Col>
                    <Col span="7">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.oldpeerprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/婴儿</span>
                    </Col>
                  </Row>
                </Form-item>
                <Form-item label="最终结算价" prop="purprice">
                  <Row>
                    <Col span="7" class="margin-right">
                    <Form-item prop="purprice" class="input-width fl">
                      <Input v-model="editLinePriceForm.purprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/大人</span>
                    </Col>
                    <Col span="7" class="margin-right">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.childpurprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/儿童</span>
                    </Col>
                    <Col span="7">
                    <Form-item class="input-width fl">
                      <Input v-model="editLinePriceForm.oldpurprice" placeholder="请输入"></Input>
                    </Form-item>
                    <span class="fl margin-left">元/婴儿</span>
                    </Col>
                  </Row>
                </Form-item>
                <Form-item label="补房差">
                  <Input v-model="editLinePriceForm.addroomamt" class="input-width" placeholder="请输入"></Input><span class="margin-left">元/人</span>
                </Form-item>
                <Form-item label="减房差">
                  <Input v-model="editLinePriceForm.dowmroomamt" class="input-width" placeholder="请输入"></Input><span class="margin-left">元/人</span>
                </Form-item>
                <Form-item label="余位" prop="remainnum">
                  <Input v-model="editLinePriceForm.remainnum" class="input-width" placeholder="请输入"></Input><span class="margin-left">数值为0则默认“满客”，有特殊日期价格的除外</span>
                </Form-item>
                <Form-item label="销售指引(即小黑板)">
                  <vue-editor v-model="editLinePriceForm.memo"></vue-editor>
                </Form-item>
                <Form-item label="处理方式">
                  <Radio-group v-model="editLinePriceForm.isauto">
                    <Radio label="0"><span>自动处理</span></Radio>
                    <Radio label="1"><span>人工处理</span></Radio>
                  </Radio-group>
                </Form-item>
              </Form>
              </Col>
            </Row>
          </Modal>
          <Modal title="特殊日期编辑" :width="1400" v-model="editSpecialModal" @on-ok="editSpecialDetermine" :mask-closable="false">
            <Row>
              <Col span="16">
              <Date-picker type="month" format="yyyy-MM" v-model="specialDate" @on-change="dataModald" placeholder="选择月" style="width: 150px"></Date-picker>
              <div class="modal-three fl">
                <div class="modal-three-header model-three-span">
                  <span>星期日</span>
                  <span>星期一</span>
                  <span>星期二</span>
                  <span>星期三</span>
                  <span>星期四</span>
                  <span>星期五</span>
                  <span>星期六</span>
                </div>
                <div class="modal-three-header">
                  <span v-for="item in specialDateObj.nullArrStart"></span>
                  <span v-for="(item,index) in specialDateObj.daysObj">
                    {{item.day}}
                    <div v-if="item.date == value.startdate" v-for="(value,index) in editSpecialDatePriceList">
                      <p>销售价：{{value.saleprice}}</p>
                      <p>同行价：{{value.peerprice}}</p>
                      <i class="iconfont"  style="color: red" @click="spanCloseIcon(value)">&#xe685;</i>
                      <p class="iconfont" style="color: #2d8cf0; text-align: right" @click="spanClickEdit(value)">&#xe605;</p>
                    </div>
                  </span>
                </div>
              </div>
              </Col>
              <Col span="8" v-show="!specialEditPriceModal">
                <h3>批量编辑指定日期价格</h3>
                <div class="line-title-tip">第一步：指定价格有效日期段(日期区间不超过半年)</div>
                <Date-picker type="daterange" @on-change="changeEditSpecialDate" v-model="editSpecialDate" placement="bottom" placeholder="选择日期" style="width: 200px"></Date-picker>
                <div class="line-title-tip">第二步：选择条件（不规则的日期可直接在左侧点日历）</div>
                <Tabs type="card" value="name1" v-model="specialTab">
                  <Tab-pane label="按周" name="name1">
                    <Checkbox-group v-model="editSpecialPriceForm.weekNo">
                      <Checkbox label="0"><span>周日</span></Checkbox>
                      <Checkbox label="1"><span>周一</span></Checkbox>
                      <Checkbox label="2"><span>周二</span></Checkbox>
                      <Checkbox label="3"><span>周三</span></Checkbox>
                      <Checkbox label="4"><span>周四</span></Checkbox>
                      <Checkbox label="5"><span>周五</span></Checkbox>
                      <Checkbox label="6"><span>周六</span></Checkbox>
                    </Checkbox-group>
                  </Tab-pane>
                  <Tab-pane label="按号" name="name2">
                    <Checkbox-group v-model="editSpecialPriceForm.numList">
                      <Checkbox :label="item.day" v-for="item in specialDateObj.daysObj" :key="123"></Checkbox>
                    </Checkbox-group>
                  </Tab-pane>
                </Tabs>
                <div>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th></th>
                      <th>成人</th>
                      <th>儿童</th>
                      <th>婴儿</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td width="65">销售价格</td>
                      <td><Input v-model="editSpecialPriceForm.saleprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.childsaleprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.oldsaleprice" placeholder="请输入..." ></Input></td>
                    </tr>
                    <tr>
                      <td>同行价格</td>
                      <td><Input v-model="editSpecialPriceForm.peerprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.childpeerprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.oldpeerprice"  placeholder="请输入..." ></Input></td>
                    </tr>

                    <tr>
                      <td>结算价</td>
                      <td><Input v-model="editSpecialPriceForm.purprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.childpurprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialPriceForm.oldpurprice" placeholder="请输入..." ></Input></td>
                    </tr>
                    <tr>
                      <td>补房差</td>
                      <td><Input v-model="editSpecialPriceForm.addroomamt" placeholder="请输入..." ></Input></td>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td>减房差</td>
                      <td><Input v-model="editSpecialPriceForm.dowmroomamt" placeholder="请输入..." ></Input></td>
                      <td colspan="2" ></td>
                    </tr>
                    <tr>
                      <td>余位</td>
                      <td><Input v-model="editSpecialPriceForm.remainnum" placeholder="请输入..." ></Input></td>
                      <td colspan="2" >
                        <Radio-group v-model="editLinePriceForm.isauto">
                          <Radio label="0"><span>自动处理</span></Radio>
                          <Radio label="1"><span>人工处理</span></Radio>
                        </Radio-group>
                      </td>
                    </tr>
                    <tr>
                      <td>标签描述</td>
                      <td colspan="3"><Input v-model="editSpecialPriceForm.grouplabel" placeholder="请输入..." ></Input></td>
                    </tr>
                    </tbody>
                  </table>
                  <h3>优惠设置 <Button type="primary" class="margin-left" @click="addSpecialTable">添加</Button></h3>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th>满多少人</th>
                      <th>减多少钱</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in editSpecialPriceForm.line4555List">
                      <td><Input v-model="item.totalnum" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.totalamt" placeholder="请输入..." ></Input></td>
                      <td><Button type="error" @click="delSpecialTable(index)">删除</Button></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <!-- 编辑 -->
              <Col span="8" v-show="specialEditPriceModal">
                <h3>{{specialTitleDate}}</h3>
                <div>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th></th>
                      <th>成人</th>
                      <th>儿童</th>
                      <th>婴儿</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td width="65">销售价格</td>
                      <td><Input v-model="editSpecialModalForm.saleprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.childsaleprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.oldsaleprice" placeholder="请输入..." ></Input></td>
                    </tr>
                    <tr>
                      <td>同行价格</td>
                      <td><Input v-model="editSpecialModalForm.peerprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.childpeerprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.oldpeerprice"  placeholder="请输入..." ></Input></td>
                    </tr>
                    <tr>
                      <td>结算价</td>
                      <td><Input v-model="editSpecialModalForm.purprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.childpurprice" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="editSpecialModalForm.oldpurprice" placeholder="请输入..." ></Input></td>
                    </tr>
                    <tr>
                      <td>补房差</td>
                      <td><Input v-model="editSpecialModalForm.addroomamt" placeholder="请输入..." ></Input></td>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td>减房差</td>
                      <td><Input v-model="editSpecialModalForm.dowmroomamt" placeholder="请输入..." ></Input></td>
                      <td colspan="2" ></td>
                    </tr>
                    <tr>
                      <td>余位</td>
                      <td><Input v-model="editSpecialModalForm.remainnum" placeholder="请输入..." ></Input></td>
                      <td colspan="2" >
                        <Radio-group v-model="editSpecialModalForm.isauto">
                          <Radio label="0"><span>自动处理</span></Radio>
                          <Radio label="1"><span>人工处理</span></Radio>
                        </Radio-group>
                      </td>
                    </tr>
                    <tr>
                      <td>标签描述</td>
                      <td colspan="3"><Input v-model="editSpecialPriceForm.grouplabel" placeholder="请输入..." ></Input></td>
                    </tr>
                    </tbody>
                  </table>
                  <h3>优惠设置 <Button type="primary" class="margin-left" @click="addEditSpecialTable">添加</Button></h3>
                  <table class="line-table-utia">
                    <thead>
                    <tr>
                      <th>满多少人</th>
                      <th>减多少钱</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in editSpecialModalForm.line4555List">
                      <td><Input v-model="item.totalnum" placeholder="请输入..." ></Input></td>
                      <td><Input v-model="item.totalamt" placeholder="请输入..." ></Input></td>
                      <td><Button type="error" @click="delEditSpecialTable(index)">删除</Button></td>
                    </tr>
                    </tbody>
                  </table>
                  <Button type="info">保存</Button>
                  <Button type="error" @click="offSpecialEditModal">关闭</Button>
                </div>
              </Col>
            </Row>
          </Modal>
          <!--添加线路优惠-->
          <Modal v-model="preferenModal" title="线路优惠" width="730" @on-ok="addPreferenSubmit">
            <Form :model="addPreferenForm" :rules="addPreferenFormValidation"  :label-width="120" >
              <Form-item label="优惠类型">
                <Radio-group v-model="addPreferenForm.discounttype">
                  <Radio label="1">排名</Radio>
                  <Radio label="2">人数</Radio>
                  <Radio label="3">全部</Radio>
                </Radio-group>
              </Form-item>
              <Form-item label="报名前几位" prop="ranking">
                <Input type="text" v-model="addPreferenForm.ranking" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="报名优惠" prop="rankamt">
                <Input type="text" v-model="addPreferenForm.rankamt" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="满多少人" prop="rankamt">
                <Input type="text" v-model="addPreferenForm.totalnum" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="满多少人优惠多少" prop="rankamt">
                <Input type="text" v-model="addPreferenForm.totalamt" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="备注">
                <Input v-model="addPreferenForm.memo" type="textarea" placeholder="请输入..."></Input>
              </Form-item>
              <Table :columns="preferenListArr" :data="preferenListData"></Table>
            </Form>
          </Modal>
          <!--列表 - 添加线路优惠-->
          <Modal v-model="listPreferenModal" title="线路优惠" width="730" @on-ok="addListPreferenSubmit">
            <Form :model="addListPreferenForm" :rules="addListPreferenFormValidation"  :label-width="120" >
              <Form-item label="优惠类型">
                <Radio-group v-model="addListPreferenForm.discounttype">
                  <Radio label="1">排名</Radio>
                  <Radio label="2">人数</Radio>
                  <Radio label="3">全部</Radio>
                </Radio-group>
              </Form-item>
              <Form-item label="报名前几位" prop="ranking">
                <Input type="text" v-model="addListPreferenForm.ranking" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="报名优惠" prop="rankamt">
                <Input type="text" v-model="addListPreferenForm.rankamt" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="满多少人" prop="rankamt">
                <Input type="text" v-model="addListPreferenForm.totalnum" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="满多少人优惠多少" prop="rankamt">
                <Input type="text" v-model="addListPreferenForm.totalamt" placeholder="请输入" ></Input>
              </Form-item>
              <Form-item label="优惠类型">
                <Radio-group v-model="addListPreferenForm.isenjoy">
                  <Radio label="0">排名</Radio>
                  <Radio label="1">人数</Radio>
                  <Radio label="2">全部</Radio>
                </Radio-group>
              </Form-item>
              <Form-item label="备注">
                <Input v-model="addListPreferenForm.memo" type="textarea" placeholder="请输入..."></Input>
              </Form-item>
              <Table :columns="preferenListArr2" :data="preferenListData2"></Table>
            </Form>
          </Modal>
        </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
  import Action from '../actions/action'
  import { VueEditor } from 'vue2-editor'
  import Util from '../commons/util'
  import config from '../config/config'
  export default {
    components: {
      VueEditor
    },
    name: 'department',
    data () {
      return {
        steps: 0,
        buttnPrimary: '',
        util: '',
        lineCode: '', // 线路编号
        maxAreaList: '', //
        areaList: '',
        shengNeiList: '', // 省内列表
        shengQuList: '', // 省区
        shengCode: 123,
        guoNeiList: '',
        guoWaiList: '',
        tabName: '省内游',
        zhua: false,
        zhub: false,
        zhuc: false,
        zhud: false,
        labelList: '',
        lineThemeData: '',
        goCityArr: [],
        destCityArr: [],
        themeCodeArr: [],
        labelCodeArr: [],
        lineReleaseForm: { // 线路发布表单
          linename: '',
          linedesc: '',
          schedulingDay: 0,
          line3Models: [],
          line33Models: [], // 目的地
          line2Models: [],
          dtonCode: 1,
          fTraffic: '',
          tTraffic: '',
          isRecommend: 1,
          isPromote: 1,
          isHot: 1,
          isNew: 1,
          isdest: 0,
          natureCode: '',
          lineTypecode: '',
          expiredate: '', // 过期日期
          isTraffic: 1, // 是否交通自理
          line11Models: []
        },
        lineReleaseRuleVali: { // 线路发布表验证
          linename: [
            { required: true, message: '线路名称不能为空', trigger: 'blur' }
          ],
          linedesc: [
            { required: true, message: '副标题不能为空', trigger: 'blur' }
          ],
          schedulingDay: [
            { required: true, message: '行程天数不能为空', trigger: 'blur' }
          ],
          cityCode: [
            { required: true, message: '请选择出发城市', trigger: 'change' }
          ],
          fTraffic: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          tTraffic: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        // 第2步
        tripDayList: '',
        tabTwoTabValue: 0,
        mealsList: [],
        tripLineCode: '',
        tripFormArrEdit: [],
        tripForm: {
          day: 1,
          dayid: '',
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
        },
        tripRuleVali: {
          title: [
            { required: true, message: '行程标题不能为空', trigger: 'blur' }
          ],
          dining: [
            { required: true, message: '', trigger: 'blur' }
          ]
        },
        // 第3步
        editLinePriceModal: false, // 添加编辑模态框
        editSpecialModal: false, // 特殊日期编辑模态框
        preferenModal: false, // 优惠模态框
        listPreferenModal: false, // 列表优惠模态框
        editLinePriceFormDates: [],
        specialDate: '2017-6',
        specialTitleDate: '',
        specialEditPriceModal: false,
        specialTab: 'name1',
        specialDateTableForm: {
          linecode: '',
          pricecode: ''
        },
        addPreferenForm: { // 优惠表单
          linecode: '',
          discounttype: '',
          ranking: '',
          rankamt: '',
          totalnum: '',
          totalamt: '',
          memo: ''
        },
        addPreferenFormValidation: { // 优惠表单验证

        },
        addListPreferenForm: { // 列表优惠表单
          linecode: '',
          pricecode: '',
          discounttype: 1,
          ranking: '',
          rankamt: '',
          totalnum: '',
          totalamt: '',
          status: '',
          isenjoy: '',
          memo: ''
        },
        addListPreferenFormValidation: { // 列表优惠表单验证

        },
        preferenListArr: [ // 优惠列表
          {
            title: '报名前几位',
            key: 'ranking'
          },
          {
            title: '报名优惠',
            key: 'rankamt'
          },
          {
            title: '满多少人',
            key: 'totalnum'
          },
          {
            title: '满多少人优惠多少',
            key: 'totalamt'
          },
          {
            title: '备注',
            key: 'memo'
          },
          {
            title: '备注',
            key: 'memo'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.addPreferenForm.discounttype = params.row.discounttype
                      this.addPreferenForm.ranking = params.row.ranking
                      this.addPreferenForm.rankamt = params.row.rankamt
                      this.addPreferenForm.totalnum = params.row.totalnum
                      this.addPreferenForm.totalamt = params.row.totalamt
                      this.addPreferenForm.memo = params.row.memo
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        preferenListData: [], // 优惠列表数据
        preferenListArr2: [ // 优惠列表
          {
            title: '报名前几位',
            key: 'ranking'
          },
          {
            title: '报名优惠',
            key: 'rankamt'
          },
          {
            title: '满多少人',
            key: 'totalnum'
          },
          {
            title: '满多少人优惠多少',
            key: 'totalamt'
          },
          {
            title: '备注',
            key: 'memo'
          },
          {
            title: '备注',
            key: 'memo'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.addListPreferenForm.discounttype = params.row.discounttype
                      this.addListPreferenForm.ranking = params.row.ranking
                      this.addListPreferenForm.rankamt = params.row.rankamt
                      this.addListPreferenForm.totalnum = params.row.totalnum
                      this.addListPreferenForm.totalamt = params.row.totalamt
                      this.addListPreferenForm.memo = params.row.memo
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        preferenListData2: [], // 优惠列表数据
        specialDateObj: {
          year: '',
          month: '',
          days: '',
          nullArrStart: '',
          nullArrEnd: '',
          daysObj: []
        },
        editLinePriceForm: {
          vencode: '',
          linecode: '',
          pricecode: '',
          pricedesc: '',
          dateform: '',
          dateto: '',
          minday: '',
          maxday: '',
          saleprice: '',
          oldsaleprice: '',
          childsaleprice: '',
          peerprice: '',
          oldpeerprice: '',
          childpeerprice: '',
          purprice: '',
          oldpurprice: '',
          childpurprice: '',
          addroomamt: '',
          dowmroomamt: '',
          remainnum: '',
          isauto: 0,
          memo: '123'
        },
        editSpecialDate: [],
        editSpecialDatePriceList: '',
        editSpecialModalForm: {
          saleprice: '',
          childsaleprice: '',
          oldsaleprice: '',
          peerprice: '',
          childpeerprice: '',
          oldpeerprice: '',
          purprice: '',
          childpurprice: '',
          oldpurprice: '',
          addroomamt: '',
          dowmroomamt: '',
          remainnum: '',
          isauto: '',
          line4555List: [
            {
              totalnum: '',
              totalamt: ''
            }
          ]
        },
        editSpecialPriceForm: { // 编辑特殊价格表单
          linecode: '',
          pricecode: '',
          startdate: '',
          startweek: '',
          saleprice: '',
          childsaleprice: '',
          oldsaleprice: '',
          purprice: '',
          childpurprice: '',
          oldpurprice: '',
          peerprice: '',
          childpeerprice: '',
          oldpeerprice: '',
          addroomamt: '',
          dowmroomamt: '',
          isauto: '',
          grouplabel: '',
          weekNo: [],
          numList: [],
          dateform: '',
          dateEnd: '',
          line4555List: [
            {
              totalnum: '',
              totalamt: ''
            }
          ]
        },
        pricePlanRuleVali: {
          pricedesc: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          minday: [
            { required: true, message: '截止收团时间不能为空', trigger: 'blur' }
          ],
          maxday: [
            { required: true, message: '提前预定时间不能为空', trigger: 'blur' }
          ],
          saleprice: [
            { required: true, message: '销售价', trigger: 'blur' }
          ],
          peerprice: [
            { required: true, message: '同行价', trigger: 'blur' }
          ],
          purprice: [
            { required: true, message: '最终结算价', trigger: 'blur' }
          ],
          remainnum: [
            { required: true, message: '余位不能为空', trigger: 'blur' }
          ]
        },
        columns3: [ // 第3步线路列表
          {
            title: '线路价格名称',
            key: 'pricedesc'
          },
          {
            title: '销售价（成人）',
            key: 'saleprice'
          },
          {
            title: '同行价（成人）',
            key: 'peerprice'
          },
          {
            title: '结算价（成人）',
            key: 'purprice'
          },
          {
            title: '结算价（儿童）',
            key: 'childpurprice'
          },
          {
            title: '特殊日期报价',
            key: 'address',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editSpecialModal = true
                      this.editSpecialDate = []
                      this.editSpecialDate.push(params.row.dateform)
                      this.editSpecialDate.push(params.row.dateto)
                      this.editSpecialPriceForm.dateform = params.row.dateform
                      this.editSpecialPriceForm.numList = []
                      this.editSpecialPriceForm.weekNo = []
                      this.editSpecialPriceForm.dateform = params.row.dateform
                      this.editSpecialPriceForm.dateEnd = params.row.dateto
                      this.editSpecialPriceForm.linecode = params.row.linecode // 线路编号
                      this.editSpecialPriceForm.pricecode = params.row.pricecode // 价格清单编号
                      this.editSpecialPriceForm.saleprice = params.row.saleprice // 销售价（成人）
                      this.editSpecialPriceForm.childsaleprice = params.row.childsaleprice // 销售价（儿童）
                      this.editSpecialPriceForm.oldsaleprice = params.row.oldsaleprice // 销售价（婴儿）
                      this.editSpecialPriceForm.purprice = params.row.purprice // 结算价（成人）
                      this.editSpecialPriceForm.childpurprice = params.row.childpurprice // 结算价（儿童）
                      this.editSpecialPriceForm.oldpurprice = params.row.oldpurprice // 结算价（婴儿）
                      this.editSpecialPriceForm.peerprice = params.row.peerprice // 同行价（成人）
                      this.editSpecialPriceForm.childpeerprice = params.row.childpeerprice // 同行价（儿童）
                      this.editSpecialPriceForm.oldpeerprice = params.row.oldpeerprice // 同行价（婴儿）
                      this.editSpecialPriceForm.addroomamt = params.row.addroomamt // 加房差
                      this.editSpecialPriceForm.dowmroomamt = params.row.dowmroomamt // 减房差
                      this.editSpecialPriceForm.remainnum = params.row.remainnum // 余位总计
                      this.editSpecialPriceForm.isauto = params.row.isauto // 成团处理方式，0=自动，1=手动
                      this.editSpecialPriceForm.grouplabel = params.row.grouplabel // 标签描述

                      this.specialDateTableForm.linecode = params.row.linecode
                      this.specialDateTableForm.pricecode = params.row.pricecode
                      this.self.specialDateTable(this.specialDateTableForm)
                    }
                  }
                }, '特殊日期编辑')
              ])
            }
          },
          {
            title: '操作',
            key: 'address',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editLinePriceForm.vencode = params.row.vencode
                      this.editLinePriceForm.linecode = params.row.linecode
                      this.editLinePriceForm.pricecode = params.row.pricecode
                      this.editLinePriceForm.saleprice = params.row.saleprice
                      this.editLinePriceForm.pricedesc = params.row.pricedesc
                      this.editLinePriceForm.minday = params.row.minday
                      this.editLinePriceForm.maxday = params.row.maxday
                      this.editLinePriceForm.childsaleprice = params.row.childsaleprice
                      this.editLinePriceForm.oldsaleprice = params.row.oldsaleprice
                      this.editLinePriceForm.purprice = params.row.purprice
                      this.editLinePriceForm.childpurprice = params.row.childpurprice
                      this.editLinePriceForm.oldpurprice = params.row.oldpurprice
                      this.editLinePriceForm.peerprice = params.row.peerprice
                      this.editLinePriceForm.childpeerprice = params.row.childpeerprice
                      this.editLinePriceForm.oldpeerprice = params.row.oldpeerprice
                      this.editLinePriceForm.addroomamt = params.row.addroomamt
                      this.editLinePriceForm.dowmroomamt = params.row.dowmroomamt
                      this.editLinePriceForm.remainnum = params.row.remainnum
                      this.editLinePriceForm.isauto = params.row.isauto
                      this.editLinePriceForm.memo = params.row.memo
                      this.editLinePriceFormDates = []
                      this.editLinePriceFormDates.push(params.row.dateform)
                      this.editLinePriceFormDates.push(params.row.dateto)
                      this.editLinePriceModal = true
                      this.getEditPriceDate(this.editLinePriceFormDates)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.listPreferenModal = true
                      this.addListPreferenForm.linecode = params.row.linecode
                      this.addListPreferenForm.pricecode = params.row.pricecode
                      this.addListPreferenForm.status = params.row.status

                      this.addListPreferenForm.discounttype = ''
                      this.addListPreferenForm.ranking = ''
                      this.addListPreferenForm.rankamt = ''
                      this.addListPreferenForm.totalnum = ''
                      this.addListPreferenForm.totalamt = ''
                      this.addListPreferenForm.memo = ''
                      this.self.getListPreferenList({
                        linecode: params.row.linecode,
                        pricecode: params.row.pricecode
                      })
                    }
                  }
                }, '优惠')
              ])
            }
          }
        ],
        priceList: []
      }
    },
    methods: {
      getExpiredate (date) {
        this.lineReleaseForm.expiredate = date
      },
      oneSubmit (name) {
        this.lineReleaseForm.line3Models = []
        this.lineReleaseForm.line33Models = []
        this.lineReleaseForm.line2Models = []
        this.lineReleaseForm.line11Models = []
        for (let value of this.goCityArr) {
          this.lineReleaseForm.line3Models.push({cityCode: value})
        }
        for (let value of this.destCityArr) {
          this.lineReleaseForm.line33Models.push({citycode: value})
        }
        for (let value of this.themeCodeArr) {
          this.lineReleaseForm.line2Models.push({themeCode: value})
        }
        for (let value of this.labelCodeArr) {
          this.lineReleaseForm.line11Models.push({labelcode: value})
        }
        if (this.zhua) {
          this.lineReleaseForm.isRecommend = 0
        } else {
          this.lineReleaseForm.isRecommend = 1
        }
        if (this.zhub) {
          this.lineReleaseForm.isNew = 0
        } else {
          this.lineReleaseForm.isNew = 1
        }
        if (this.zhuc) {
          this.lineReleaseForm.isHot = 0
        } else {
          this.lineReleaseForm.isHot = 1
        }
        if (this.zhud) {
          this.lineReleaseForm.isPromote = 0
        } else {
          this.lineReleaseForm.isPromote = 1
        }
        if (this.tabName === '省内游') {
          this.lineReleaseForm.dtonCode = 1
        } else if (this.tabName === '国内游') {
          this.lineReleaseForm.dtonCode = 2
        } else if (this.tabName === '境外游') {
          this.lineReleaseForm.dtonCode = 3
        }
        this.lineReleaseForm.lineTypecode = this.$route.query.lineTypecode
        this.lineReleaseForm.natureCode = this.$route.query.natureCode
        console.log(this.lineReleaseForm)
        this.self.editLineInfoSubmit({model:JSON.stringify(this.lineReleaseForm)})
      },
      oneReset (name) {
        this.$refs[name].resetFields()
      },
      changeShengFen () {
        this.self.getLineShengQuList({provinceCode: this.shengCode})
      },
      // 第2步
      oneGoAllCheck (data) {
        /* for (let value of data.entries()) {
         this.lineReleaseForm.cityCode.push(value[1].menuName)
         } */
      },
      addTwoProject () {
        this.tripForm.line55List.push({
          projectcode: '',
          price: '',
          memo: ''
        })
      },
      delTwoProject (index) {
        if (this.tripForm.line55List.length > 1) {
          this.tripForm.line55List.splice(index, 1)
        }
      },
      addTwoProduct () {
        this.tripForm.line8List.push({
          itemcode: '',
          intemdesc: '',
          price: ''
        })
      },
      delTwoProduct (index) {
        if (this.tripForm.line8List.length > 1) {
          this.tripForm.line8List.splice(index, 1)
        }
      },
      addTwoShopPro () {
        this.tripForm.line56List.push({
          linecode: '',
          // dayid: this.tabTwoTabValue + 1,
          projectcode: '',
          itemdesc: '',
          memo: ''
        })
      },
      delTwoShopPro (index) {
        if (this.tripForm.line56List.length > 1) {
          this.tripForm.line56List.splice(index, 1)
        }
      },
      tripSubmit () {  // 第2步提交表单
        console.log(this.tripFormArrEdit[this.tabTwoTabValue])
        this.tripFormArrEdit[this.tabTwoTabValue].linecode = this.$route.query.linecode
        this.self.editLineTravelSubmit({model: JSON.stringify(this.tripFormArrEdit[this.tabTwoTabValue])})
      },
      // 第3步----------------
      preferenModalShow () {
        this.preferenModal = true
        this.addPreferenForm.linecode = this.lineCode
        this.self.getPreferenList({linecode: this.lineCode})
      },
      addPreferenSubmit () {
        this.self.addPreferen(this.addPreferenForm)
      },
      addListPreferenSubmit () {
        this.self.addListPreferen(this.addListPreferenForm)
      },
      changeEditSpecialDate (date) {
        this.editSpecialPriceForm.dateform = date[0]
        this.editSpecialPriceForm.dateEnd = date[1]
      },
      pricePlanSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      pricePlanReset (name) {
        this.$refs[name].resetFields()
      },
      getEditPriceDate (date) {
        this.editLinePriceForm.dateform = date[0]
        this.editLinePriceForm.dateto = date[1]
      },
      pricePlanDetermine () {
        // console.log(this.editLinePriceForm)
        this.self.editLinePrice(this.editLinePriceForm)
      },
      addSpecialTable () {
        this.editSpecialPriceForm.line4555List.push({
          totalnum: '',
          totalamt: ''
        })
      },
      delSpecialTable (index) {
        this.editSpecialPriceForm.line4555List.splice(index, 1)
      },
      addEditSpecialTable () {
        this.editSpecialModalForm.line4555List.push({
          totalnum: '',
          totalamt: ''
        })
      },
      delEditSpecialTable (index) {
        this.editSpecialModalForm.line4555List.splice(index, 1)
      },
      spanClickEdit (data) {
        this.specialTitleDate = data.startdate
        this.editSpecialModalForm.saleprice = data.saleprice
        this.editSpecialModalForm.childsaleprice = data.childsaleprice
        this.editSpecialModalForm.oldsaleprice = data.oldsaleprice
        this.editSpecialModalForm.peerprice = data.peerprice
        this.editSpecialModalForm.childpeerprice = data.childpeerprice
        this.editSpecialModalForm.oldpeerprice = data.oldpeerprice
        this.editSpecialModalForm.purprice = data.purprice
        this.editSpecialModalForm.childpurprice = data.childpurprice
        this.editSpecialModalForm.oldpurprice = data.oldpurprice
        this.editSpecialModalForm.addroomamt = data.addroomamt
        this.editSpecialModalForm.dowmroomamt = data.dowmroomamt
        this.editSpecialModalForm.remainnum = data.remainnum
        this.editSpecialModalForm.isauto = data.isauto
        this.specialEditPriceModal = true
      },
      offSpecialEditModal () {
        this.specialEditPriceModal = false
      },
      editSpecialDetermine () {
        if (this.specialTab == 'name1') {
          this.editSpecialPriceForm.numList = []
        } else if (this.specialTab == 'name2') {
          this.editSpecialPriceForm.weekNo = []
        }
        this.self.editSpecialSubmit({model: JSON.stringify(this.editSpecialPriceForm)})
        console.log(this.editSpecialPriceForm)
      },
      dataModald (date) { // 第3步日期
        this.util.dateInit(date, this)
      },
      spanCloseIcon (data) { // 线路第3步特殊日期-左边日期特殊价格删除
        this.self.delSpanDate({
          vencode: data.vencode,
          linecode: data.linecode,
          pricecode: data.pricecode,
          startdate: data.startdate
        })
      },
      confirmSave () {
        alert(this.confirmContent.replace(/<\/?.+?>/g, ''))
        this.$Message.info('点击了保存')
      }
    },
    mounted () {
      this.self = new Action(this)
      this.self.getOrea({ level: 0 })
      this.self.getLineMaxArea()
      this.self.getLineShengNeiList()
      this.self.getGuoNeiList({isdomestic: 0})
      this.self.getAreaList({level: 1, isdomestic: 0})
      this.self.getAreaWaiList({level: 1, isdomestic: 1})
      this.self.getThemeList({page: 1})
      this.self.getLabelList()
      // 第3步
      this.self.getPricelist({linecode: this.tripLineCode})
      this.specialDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      this.util = new Util()
      this.util.dateInit(this.specialDate, this) // 第3步日期
      //console.log(this.$route.query)
      this.lineCode = this.$route.query.linecode
      this.self.editLineInfo(this.$route.query) // 编辑线路基本信息
      //this.self.getTripNum({linecode: this.$route.query.linecode}) // 第二步
      this.self.editLineTravelInfo({linecode: this.$route.query.linecode}) // 第二步获取信息
    }
  }
</script>
<style lang="less">
  .line-release-font{
  .ivu-form-item-label{
    font-size: 14px!important;
  }
  .step-margin{
    margin-top: 20px;
  }
  .line-release-from{
    margin: 0 auto;
    float: none!important;
    margin-top: 30px;
  }
  .traffic-padding{
    padding-left: 10px;
    font-size: 14px;
  }
  .steps-one{
    width: 60%;
    margin: 0 auto!important;
  }
  .orea-go{
    margin: 0!important;
  }
  .orea-wrap{
    min-height: 32px;
    margin: 10px 2px;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    overflow: hidden;
  .orea-wrap-cent{
    border-bottom: 1px solid #d7dde4;
    overflow: hidden;
  &:last-of-type{
     border-bottom: none;
   }
  .orea-wrap-left{
    padding: 10px;
    width:20%;
    border-right: 1px solid #d7dde4;
  }
  .orea-wrap-right{
    padding: 10px;
    width: 80%;
  }
  }
  }
  }
  .shengfen{
    position: absolute;
    left: -93px;
    top: 62px;
    z-index: 99;
    width: 72px!important;
    margin: 0 10px;
  }
  .mudiPosi{
    position: relative;
  }
  .input-width{
    width: 120px!important;
  }
  .add-margin{
    margin-bottom: 20px!important;
  }
  .ivu-modal-body{
    overflow: hidden;
  }
  .modal-three{
    width: 862px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    overflow: hidden;
    margin-top: 20px;
  .model-three-span{
    span{
      font-weight: bold;
      background: #d7dde4;
    }
  }
    .modal-three-header{
      width:100%;
      span{
        float: left;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        width: 123px;
        height: 90px;
        padding-top: 10px;
        line-height: 1.5;
        text-align: center;
        display: inline-block;
        position: relative;
        i{
          position: absolute;
          top:-8px;
          right: -5px;
          font-size: 32px!important;

        }
        .iconfont{
          cursor: pointer;
        }
      }
    }
  }
  .spanSele{
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .line-title-tip{
    margin: 10px 0;
  }
  .line-table-utia{
    border: 1px solid #ccc;
    margin: 20px 0;
  th{
    height: 40px;
    border: 1px solid #ccc;
    background: #d7dde4;
  }
  td{
    border: 1px solid #ccc;
    padding: 5px;
  }
  }
  .tabLineEdit{
    span{
      margin: 0px 10px;
      padding: 5px 20px;
      border-radius: 4px;
      border: solid 1px #ccc;
      cursor: pointer;
      display: inline-block;
    }
    .active{
      color: #fff;
      background: #2d8cf0;
      border-color: #2d8cf0;
    }
  }
</style>
