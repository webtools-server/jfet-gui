import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import Breadcrumb from '@/components/bread-crumb.vue';

import store from '@/store';
import { normalizeCurrency } from '@/util/filter';
import App from './app.vue';
import routes from './route';

import './index.scss';

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.component('tp-breadcrumb', Breadcrumb);

Vue.filter('currency', normalizeCurrency);

const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
