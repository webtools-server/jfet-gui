/**
 * 路由
 */

import Vue from 'vue';
import NotFound from '@/components/404.vue';
import Abstract from '@/components/abstract.vue';
import Shopping from './shopping.vue';

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

const routes = [
  {
    path: '/404',
    component: NotFound,
    name: '404',
    title: '404'
  },
  {
    path: '/',
    component: root,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: Shopping,
        name: 'dashboard',
        title: '仪表盘',
        iconClass: 'el-icon-fa-tachometer'
      },
      {
        path: 'project',
        component: Abstract,
        name: 'project',
        title: '项目',
        iconClass: 'el-icon-fa-product-hunt',
        children: [
          {
            path: 'shopping',
            name: 'shopping',
            title: '购物车',
            component: Shopping,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
];

const menuCount = routes.length;

addMetaTitle(routes);
routes[menuCount - 2].children.forEach((route) => {
  if (route.children) {
    if (!route.meta) route.meta = {};
    route.meta.children = route.children;
  }
});

function addMetaTitle(arr) {
  if (Array.isArray(arr)) {
    arr.forEach((a) => {
      if (!a.meta) a.meta = {};
      if (a.title) a.meta.title = a.title;
      if (Array.isArray(a.children)) addMetaTitle(a.children);
    });
  }
}

export default routes;
