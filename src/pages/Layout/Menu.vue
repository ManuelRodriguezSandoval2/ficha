<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="col-xl-3 col-md-6"></div>
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <sidebar-link to="/ficha">
        <md-icon>keyboard_double_arrow_right</md-icon>
        <p>Ingreso Ficha</p>
      </sidebar-link>
      <sidebar-link to="/lista_ingresos">
        <md-icon>format_list_bulleted</md-icon>
        <p>Registro de ingresos</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <br />
      <br />
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
//import DashboardContent from "./Content.vue";

export default {
  components: {
    // DashboardContent,
    TopNavbar,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to .fade-leave-active in <2.1.8 {
  opacity: 0;
}
</style>
