<template>
  <div class="contenedor">
    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h3 class="title text-center">Bienvenido a InventorySoft</h3>
        </md-card-header>

        <md-card-content>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
            v-if="error != ''"
          >
            {{ error }}
            <button type="button" class="close" @click="error = ''">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--  -->
          <div class="md-layout contenido">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field class="mdfield">
                <md-icon>person</md-icon>
                <label>Usuario...</label>
                <md-input v-model="username" type="email" class="input" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="password" type="password" class="input" />
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 text-center">
              <md-button
                class="md-raised md-success"
                v-loading="loading"
                :disabled="username == '' || password == ''"
                name="signin"
                id="signin"
                @click="login()"
                >Ingresar</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";
/* import TopNavbar from "@/components/TopNavbar.vue"; */

window.Swal = swal;

export default {
  /* components: {
    topNavar: TopNavbar,
  }, */
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  name: "login",
  data() {
    return {
      loading: false,
      username: "mrodriguez",
      password: "123",
      error: "",
      usuario: [],
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    ...mapState(["server_api", "auth"]),
  },
  methods: {
    login() {
      let me = this;
      me.loading = true;
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then((resp) => {
          me.loading = false;
          this.usuario = resp.data.usuario;
          if (this.usuario.id_rol == 1) {
            this.$router.push("/");
          } else if (this.usuario.id_rol == 2) {
            this.$router.push("/menu");
          } else if (this.usuario.id_rol == 3) {
            this.$router.push("/proyecto");
          }
          if (this.usuario.estado == 0) {
            Swal.fire({
              icon: "error",
              title: "¡Atención!",
              text:
                "Usuario " +
                this.username +
                " se encuentra inactivo, por favor contáctese con el administrador del sistema",
            });
            this.$router.push("/login");
          }

          // this.$refs.topNavar.username = this.usuario.username;
        })
        .catch((err) => {
          me.loading = false;
          Swal.fire("¡ Error !", "Usuario o contraseña no válidos");
          //   this.error = "Usuario y/o contraseña están incorrectos.";
        });
    },
  },
  created() {
    this.$store.commit("SET_LAYOUT", "login-layout");
    if (this.isLoggedIn) {
    }
  },
};
</script>

<style lang="css">
body {
  /*  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #4194af; */
}
.contenedor {
  width: 100vh;
  height: 100vh;
  max-width: 450px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
}
.contenido {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
