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
    meta: { title: '404' }
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
        meta: { icon: 'el-icon-fa-product-hunt', title: '项目' },
        redirect: 'project/index',
        children: [
          {
            path: 'index',
            name: 'index',
            meta: { title: '项目主页' },
            component: ProjectIndex
          },
          {
            path: 'detail',
            name: 'detail',
            meta: { title: '项目详情' },
            component: ProjectDetail
          }
        ]
      },
      {
        path: 'template',
        component: Abstract,
        name: 'template',
        meta: { icon: 'el-icon-fa-align-left', title: '模板' },
        redirect: 'template/index',
        children: [
          {
            path: 'index',
            name: 'index',
            meta: { title: '模板主页' },
            component: TemplateIndex
          }
        ]
      },
      {
        path: 'setting',
        component: Abstract,
        name: 'setting',
        meta: { icon: 'el-icon-fa-cog', title: '设置' },
        redirect: 'setting/index',
        children: [
          {
            path: 'index',
            name: 'index',
            meta: { title: '设置主页' },
            component: SettingIndex
          }
        ]
      },
      {
        path: 'help',
        component: HelpIndex,
        name: 'help',
        meta: { icon: 'el-icon-fa-question-circle', title: '帮助' }
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
