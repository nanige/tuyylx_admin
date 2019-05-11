import Vue from 'vue'
import Router from 'vue-router'
import login from '@/login/login.vue'

import layout from '@/layout/layout.vue'
Vue.use(Router)

import department from '@/components/department.vue'
import department_list from '@/components/department_list.vue'
import role from '@/components/role.vue'
import role_list from '@/components/role_list.vue'
import role_add from '@/components/role_add.vue'
import role_edit from '@/components/role_edit.vue'
import language from '@/components/language.vue'
import operator from '@/components/operator.vue'
import operator_list from '@/components/operator_list.vue'
import operator_add from '@/components/operator_add.vue'
import operator_edit from '@/components/operator_edit.vue'
import operator_detail from '@/components/operator_detail.vue'

import supplier from '@/components/supplier.vue'
import supplier_list from '@/components/supplier_list.vue'
import supplier_add from '@/components/supplier_add.vue'
import supplier_edit from '@/components/supplier_edit.vue'
import supplier_detail from '@/components/supplier_detail.vue'

import visa from '@/components/visa.vue'
import visa_add from '@/components/visa_add.vue'

import distributor from '@/components/distributor.vue'
import distributor_list from '@/components/distributor_list.vue'
import distributor_add from '@/components/distributor_add.vue'
import distributor_edit from '@/components/distributor_edit.vue'
import distributor_detail from '@/components/distributor_detail.vue'

import user from '@/components/user.vue'
import user_list from '@/components/user_list.vue'
import area_add from '@/components/area_add.vue'
import area_list from '@/components/area_list.vue'

import line_list from '@/components/line_list.vue'
import line_release from '@/components/line_release.vue'
import line_release_edit from '@/components/line_release_edit.vue'
import line_nature from '@/components/line_nature.vue'
import line_theme from '@/components/line_theme.vue'
import line_go_city from '@/components/line_go_city.vue'
import line_destination from '@/components/line_destination.vue'

import order from '@/components/order.vue'
import order_list from '@/components/order_list.vue'
import order_list_change from '@/components/order_list_change.vue'
import order_edit from '@/components/order_edit.vue'
import order_collect from '@/components/order_collect.vue'
import order_collect_affirm from '@/components/order_collect_affirm.vue'
import order_refund from '@/components/order_refund.vue'
import order_refund_affirm from '@/components/order_refund_affirm.vue'
import order_reservation from '@/components/order_reservation.vue'
import order_return_team from '@/components/order_return_team.vue'
import order_detail from '@/components/order_detail.vue'
import order_delegation from '@/components/order_delegation.vue'
import order_clustering from '@/components/order_clustering.vue'
import order_paiTuan from '@/components/order_paiTuan.vue'

import message from '@/components/message.vue'
import wait from '@/components/wait.vue'

import guide from '@/components/guide.vue'
import guide_add from '@/components/guide_add.vue'
import guide_edit from '@/components/guide_edit.vue'

import error from '@/error/404.vue'

//const role = resolve => require(['../components/role.vue'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/error',
      component: error
    },
    {
      path: '/index',
      component: layout,
      children: [{
        path: '/index/wait',
        component: wait
      },
      {
        path: '/index/department', // 部门列表
        component: department
      },
      {
        path: '/index/department_list', // 部门设置
        component: department_list
      },
      {
        path: '/index/language',
        component: language
      },
      {
        path: '/index/role', // 角色管理
        component: role
      },
      {
        path: '/index/role_list', // 角色列表
        component: role_list
      },
      {
        path: '/index/role_add', // 添加角色
        component: role_add
      },
      {
        path: '/index/role_edit', // 编辑角色
        component: role_edit
      },
      {
        path: '/index/user', // 用户管理
        component: user
      },
      {
        path: '/index/user_list', // 用户列表
        component: user_list
      },
      {
        path: '/index/operator', // 运营商
        component: operator
      },
      {
        path: '/index/operator_list', // 运营商
        component: operator_list
      },
      {
        path: '/index/operator_add', // 添加运营
        component: operator_add
      },
      {
        path: '/index/operator_edit', // 编辑运营
        component: operator_edit
      },
      {
        path: '/index/operator_detail',
        component: operator_detail
      },
      {
        path: '/index/supplier',  // 供应商
        component: supplier
      },
      {
        path: '/index/line_list', // 线路列表
        component: line_list
      },
      {
        path: '/index/line_release', // 线路发布
        component: line_release
      },
      {
        path: '/index/line_release_edit', // 线路发布
        component: line_release_edit
      },
      {
        path: '/index/line_nature', // 参团性质
        component: line_nature
      },
      {
        path: '/index/line_theme', // 主题管理
        component: line_theme
      },
      {
        path: '/index/line_go_city', // 出发城市
        component: line_go_city
      },
      {
        path: '/index/line_destination', // 目的地管理
        component: line_destination
      },
      {
        path: '/index/supplier_add',
        component: supplier_add
      },
      {
        path: '/index/supplier_list',
        component: supplier_list
      },
      {
        path: '/index/supplier_edit',
        component: supplier_edit
      },
      {
        path: '/index/supplier_detail',
        component: supplier_detail
      },
      {
        path: '/index/visa',
        component: visa
      },
      {
        path: '/index/visa_add',
        component: visa_add
      },
      {
        path: '/index/distributor',
        component: distributor
      },
      {
        path: '/index/distributor_list',
        component: distributor_list
      },
      {
        path: '/index/distributor_add',
        component: distributor_add
      },
      {
        path: '/index/distributor_edit',
        component: distributor_edit
      },
      {
        path: '/index/distributor_detail',
        component: distributor_detail
      },
      {
        path: '/index/area_add',
        component: area_add
      },
      {
        path: '/index/area_list',
        component: area_list
      },
      {
        path: '/index/order',
        component: order
      },
      {
        path: '/index/order_list',
        component: order_list
      },
      {
        path: '/index/order_list_change',
        component: order_list_change
      },
      {
        path: '/index/order_edit',
        component: order_edit
      },
      {
        path: '/index/order_collect',
        component: order_collect
      },
      {
        path: '/index/order_collect_affirm',
        component: order_collect_affirm
      },
      {
        path: '/index/order_refund',
        component: order_refund
      },
      {
        path: '/index/order_refund_affirm',
        component: order_refund_affirm
      },
      {
        path: '/index/order_reservation',
        component: order_reservation
      },
      {
        path: '/index/order_return_team',
        component: order_return_team
      },
      {
        path: '/index/order_detail',
        component: order_detail
      },
      {
        path: '/index/order_delegation',
        component: order_delegation
      },
      {
        path: '/index/order_clustering',
        component: order_clustering
      },
      {
        path: '/index/order_paiTuan',
        component: order_paiTuan
      },
      {
        path: '/index/guide', // 查看导游
        component: guide
      },
      {
        path: '/index/guide_add', // 添加导游
        component: guide_add
      },
      {
        path: '/index/guide_edit', // 修改导游
        component: guide_edit
      },
      {
        path: '/index/message', // 修改导游
        component: message
      }]
    }
  ]
})
