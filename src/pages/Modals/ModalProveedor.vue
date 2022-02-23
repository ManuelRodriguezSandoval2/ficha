<template>
  <md-dialog :md-active.sync="modalSync" :before-close="lostFocusModal">
    <md-dialog-title>Editar Proveedor</md-dialog-title>

    <!-- ----------------------------------------------------------------------------------- -->
    <div class="card">
      <div class="card-body">
        <div class="card">
          <div class="card-body">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-20">
                  <md-field>
                    <label>Rut </label>
                    <md-input v-model="rut"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                    <label>Nombre</label>
                    <md-input v-model="nombre_proveedor" type="text"></md-input>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                    <label>Dirección</label>
                    <md-input v-model="direccion" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-60">
                  <md-field>
                    <label>Email</label>
                    <md-input v-model="email" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                    <label>Giro</label>
                    <md-input v-model="giro" type="giro"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-60">
                  <md-field>
                    <md-select
                      v-model="id_ciudad"
                      placeholder="Seleccione ciudad si desea actualizar"
                    >
                      <md-option
                        v-for="(ciudad, index) in ciudades"
                        v-bind:key="index"
                        :value="ciudad.id_ciudad"
                      >
                        {{ ciudad.nombre_ciudad }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-40">
                  <md-field>
                    <md-select v-model="estado" placeholder="Estado">
                      <md-option value="1">Activo</md-option>
                      <md-option value="0">Inactivo</md-option>
                    </md-select>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" @click="editar()"
                    >Guardar Cambios</md-button
                  >
                </div>
              </div>
              <div class="btn-group float-right mb-3" role="group">
                <md-button
                  class="md-raised md-danger"
                  @click="lostFocusModal(), proveedor()"
                >
                  Salir
                </md-button>
              </div>
            </md-card-content>

            <!--  -->
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </md-dialog>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

import proveedor from "@/pages/Proveedores.vue";

export default {
  data() {
    return {
      modalSync: false,

      id_proveedor: "",
      rut: "",
      nombre_proveedor: "",
      direccion: "",
      email: "",
      giro: "",
      id_ciudad: "",
      estado: "",
      ciudades: [],
    };
  },

  methods: {
    proveedor() {
      proveedor;
    },

    obtenerCiudad() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:8000/api/obtener_ciudad", {
            headers: {
              Authorization: `Bearer ${this.auth.access_token}`,
            },
          })
          .then((response) => {
            this.ciudades = response.data;
          })
          .catch(function (error) {
            console.log(error.response.ciudades);

            reject(error);
          });
      });
    },
    editar() {
      return new Promise((resolve, reject) => {
        axios
          .put(
            "http://localhost:8000/api/editar_proveedor",
            {
              id_proveedor: this.id_proveedor,
              rut: this.rut,
              nombre_proveedor: this.nombre_proveedor,
              direccion: this.direccion,
              email: this.email,
              giro: this.giro,
              estado: this.estado,
              id_ciudad: this.id_ciudad,
            },
            {
              headers: {
                Authorization: `Bearer ${this.auth.access_token}`,
              },
            }
          )
          .then(function (response) {
            Swal.fire("¡ Exito !", response.data, "success");

            resolve(response);
          })
          .catch(function (error) {
            Swal.fire("¡ Error !", error.response.data.message, "error");
            reject(error);
          });
      });
    },
    lostFocusModal(done) {
      let me = this;
      this.$confirm("Se cerrará módulo")
        .then((_) => {
          location.reload();
          this.cerrarModal();

          done();
          
        })
        .catch((_) => {});
    },

    cerrarModal() {
      this.modalSync = false;
    },
  },
  mounted() {
    this.obtenerCiudad();
  },

  computed: {
    ...mapState(["server_api", "auth"]),
  },
};
</script>
<style>
.contenedor {
  justify-content: right;
}
.right {
  float: right;
}
.left {
  float: left;
}
</style>
