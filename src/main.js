// =========================================================
// * Vue Material Dashboard - v1.5.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "babel-polyfill";

import { PaginationPlugin } from "bootstrap-vue";
Vue.use(PaginationPlugin);

import locale from "element-ui/lib/locale/lang/es";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
/* import { store } from "./store/index.js"; */



// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Chartist from "chartist";
import router from "./routes/routes.js";

import VueIframe from "vue-iframes";

Vue.use(VueIframe);

import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";
Vue.use(Vuesax);

Vue.prototype.$Chartist = Chartist;

Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(VueRouter);
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  render: (h) => h(App),
  router,
 /*  store, */
  data: {
    Chartist: Chartist,
  },
});
