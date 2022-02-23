import Menu from "@/pages/Layout/Menu.vue";




import Ficha from "@/pages/Ficha.vue";

import ListaIngresos from "@/pages/ListaIngresos.vue";

//autenticación
import Login from "@/pages/Login/Login.vue";
import { store } from "./../store/index.js";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    //autenticacion
    /* {
      path: "/login",
      name: "Login",
      visible: false,
      component: Login,
      meta: {
        requiresAuth: false,
      },
    }, */


    {
      path: "/",
      component: Menu,
      redirect: "/ficha",
      /*  meta: {
         requiresAuth: true,
       }, */
      children: [
        {
          path: "ficha",
          name: "ficha",
          component: Ficha,
          /*  meta: {
             requiresAuth: true,
           }, */
        },

        {
          path: "lista_ingresos",
          name: "ListaIngresos",
          component: ListaIngresos,
          /*  meta: {
             requiresAuth: true,
           }, */
        },

      ],
    },

  ],
});
/* router.beforeEach((to, from, next) => {
  var requiresAuth =
    to != null && to.matched.some((record) => record.meta.requiresAuth) != null
      ? to.matched.some((record) => record.meta.requiresAuth)
      : false;
  if (requiresAuth) {
    //console.log(to);
    if (store.getters.isLoggedIn) {
      next();
      return;
    } else {
      next("/login");
    }
  } else {
    //alert("Sin acceso");
    next();
  }
}); */
export default router;
