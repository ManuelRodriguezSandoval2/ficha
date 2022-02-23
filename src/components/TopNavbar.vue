<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <form class="formulario2">
      <!-- <div class="form-group row"> -->
      <p style="color: rgb(92, 88, 88)" class="navbar-brand etiqueta">
        Bienvenido {{ usuario() }}: {{ rol }}
      </p>
    </form>
    <button class="btn btn-danger boton" @click="logout()">
      <i class="fas fa-power-off"> Cerrar sessión</i>
    </button>
  </nav>
</template>
<script>
import swal from "sweetalert2";
/* import { useRouter } from "vue-router";
import useAuth from "@/store/index.js"; */
import { ref } from "vue";
import axios from "axios";
import { mapState } from "vuex";

window.Swal = swal;
export default {
  data() {
    return {
      username: "",
      rol: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("login");
        this.rol="";
      });
    },

    usuario() {
      this.username = this.auth.user.username;
      return this.username;
    },

    /*  roles() {
      this.rol = this.auth.user.tipo_permiso;
      return this.rol;
    }, */

    roles() {
      // console.log(id);
      return new Promise((resolve, reject) => {
        axios
          .get(
            "http://localhost:8000/api/obtener_rol_usuario?id_usuario=" +
              this.auth.user.id_usuario,
            {
              headers: {
                Authorization: `Bearer ${this.auth.access_token}`,
              },
            }
          )
          .then((response) => {
            this.rol = response.data[0].nombre;
            /* this.nro_depto = this.torreSeleccionada;*/
            console.log(this.rol);
          })
          .catch(function (error) {
            console.log(error.response);
            reject(error);
          });
        // return this.rol
      });
      //  return this.rol;
    },

    /* obtenerNombre() {
      this.$store.dispatch("logout").then((resp) => {
        this.username = resp.data.usuario.username;
        console.log(this.username);

        // this.$refs.topNavar.username = this.usuario.username;
      });
    }, */
  },

  mounted() {
    this.usuario();
    this.roles();
    // this.username: this.auth.user.username,
  },

  computed: {
    ...mapState(["server_api", "auth"]),
  },
};
</script>
<style>
.formulario2 {
  top: 20px;
  margin-inline-start: 30px;
}
.etiqueta {
  text-transform: capitalize;
  color: rgb(92, 88, 88);
  font-weight: bold;
}
.boton {
  top: 20px;
  margin-inline-end: 30px;
}

.navbar {
  float: right;
  height: 30px;
}
</style>
