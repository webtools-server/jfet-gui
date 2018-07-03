/**
 * 路由
 */

import Vue from 'vue';
import NotFound from '@/components/404.vue';
import Abstract from '@/components/abstract.vue';

// project
import ProjectIndex from './modules/project/index.vue';
import ProjectDetail from './modules/project/detail.vue';
// help
import HelpIndex from './modules/help/index.vue';
// setting
import SettingIndex from './modules/setting/index.vue';
// template
import TemplateIndex from './modules/template/index.vue';

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
    redirect: 'project/index',
    children: [
      {
        path: 'project',
        component: Abstract,
        name: 'project',
        title: '项目',
        children: [
          {
            path: 'index',
            name: 'index',
            title: '项目主页',
            component: ProjectIndex,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'detail',
            name: 'detail',
            title: '项目详情',
            component: ProjectDetail,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'template',
        component: Abstract,
        name: 'template',
        title: '模板',
        children: [
          {
            path: 'index',
            name: 'index',
            title: '模板主页',
            component: TemplateIndex,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'setting',
        component: Abstract,
        name: 'setting',
        title: '设置',
        children: [
          {
            path: 'index',
            name: 'index',
            title: '设置主页',
            component: SettingIndex,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'help',
        component: HelpIndex,
        name: 'help',
        title: '帮助'
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
