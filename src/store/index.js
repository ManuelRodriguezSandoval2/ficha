import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "es6-promise/auto";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    layout: "login-layout",
    // DESCOMENTAR LINEA DE SERVER API SEGÚN SE DEBA SUBIR A SERVIDOR DE PRODUCCIÓN O PRUEBAS
    //server_api: 'http://10.0.0.16:5000/api',
    server_api: "http://127.0.0.1:8000/api",
    auth: {
      auth: false,
      status: "",
      access_token: localStorage.getItem("access_token") || "",
      token_type: null,
      expires_at: null,
      usuario: [],
      user: {},
      username: "",
    },
    status: "",
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout;
    },
    SET_AUTH(state, auth) {
      state.auth.auth = auth.auth;
      state.auth.status = auth.status;
      state.auth.access_token = auth.access_token;
      state.auth.token_type = auth.token_type;
      state.auth.expires_at = auth.expires_at;
      state.auth.user = auth.user;
    },
    auth_request(state) {
      state.auth.status = "loading";
    },
    auth_success(state, token, user) {
      state.auth.status = "success";
      state.auth.access_token = token;
      state.auth.user = user;
    },
    auth_error(state) {
      state.auth.status = "error";
    },
    logout(state) {
      state.auth.auth = false;
      state.auth.status = "";
      state.auth.access_token = null;
      state.auth.token_type = null;
      state.auth.expires_at = null;
      state.auth.user = {};
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");


        axios({
          url: "http://127.0.0.1:8000/api" + "/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            localStorage.setItem("access_token", resp.data.access_token);
            this.usuario = resp.data.usuario;
            // Add the following line:
            // axios.defaults.headers.common['Authorization'] = resp.data.access_token
            // axios.defaults.headers.common["Authorization"] = "Bearer " + resp.data.access_token
            // axios.defaults.headers.common["Accept"] = "*/*"
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            commit("SET_AUTH", {
              auth: true,
              status: "success",
              access_token: resp.data.access_token,
              token_type: resp.data.token_type,
              expires_at: resp.data.expires_at,
              user: resp.data.usuario,

            });           
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("access_token");
            console.log(err);
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const access_token = resp.data.access_token;
            const user = resp.data.user;
            localStorage.setItem("access_token", access_token);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = access_token;
            commit("auth_success", access_token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("access_token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },


    obtener({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");


        axios({
          url: "http://127.0.0.1:8000/api" + "/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            this.username = resp.data.usuario.username


            resolve();
          })
      })
    },




  },
  getters: {
    isLoggedIn: (state) => !!state.auth.access_token,
    access_token: (state) => state.auth.access_token,
    authStatus: (state) => state.auth.status,
    server_api: (state) => state.server_api,
    userAuth: (state) => state.auth.user,
  },
  modules: {},
});


