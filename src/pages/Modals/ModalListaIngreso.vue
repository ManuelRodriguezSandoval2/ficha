<template>
  <md-dialog
    :md-active.sync="modalSync"
    :before-close="lostFocusModal"
    width="80%"
    top="10px"
  >
    <md-dialog-title
      >Detalle Ingreso de {{ tipo_documento }} N° {{ numero_documento }} con
      fecha: {{ formatDate(fecha_ingreso) }}</md-dialog-title
    >

    <!-- ----------------------------------------------------------------------------------- -->
    <div
      style=" width=80% min-height: 800px; max-height: 800px; overflow-x: hidden"
    >
      <div class="card">
        <div class="card-body">
          <div class="card">
            <div class="card-body">
              <md-card-content>
                <div class="md-layout">
                  <!--     <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Codigo</label>
                    <md-input v-model="numero_documento" type="text"></md-input>
                  </md-field>
                </div> -->

                  <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <div class="table-responsive">
                      <table
                        class="table table-sm table-hover table-bordered"
                        id="myTable"
                      >
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Código Producto</th>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Bodega Almacenamiento</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Precio Total</th>
                          </tr>
                        </thead>

                        <template v-for="lista in detalle_ingresos">
                          <tr :key="lista.id">
                            <td v-text="lista.id_producto"></td>
                            <td v-text="lista.nombre_producto"></td>
                            <td v-text="lista.nombre_bodega"></td>
                            <td
                              class="text-center"
                              v-text="lista.cantidad"
                            ></td>
                            <td class="text-right">
                              ${{
                                lista.precio
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              }}
                            </td>
                            <td class="text-right">
                              ${{
                                lista.precio_total
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              }}
                            </td>
                          </tr>
                        </template>

                        <tr style="font-weight: bold">
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td class="text-right">Total:</td>
                          <td class="text-right">
                            ${{
                              totalItem
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <!-- <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" @click="editar()"
                    >Guardar Cambios</md-button
                  >
                </div> -->
                </div>
                <div class="btn-group float-right mb-3" role="group">
                  <md-button
                    class="md-raised md-danger"
                    @click="lostFocusModal()"
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
    </div>
  </md-dialog>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      modalSync: false,
      id_ingreso: "",
      detalle_ingresos: [],
      tipo_documento: "",
      numero_documento: "",
      fecha_ingreso: "",
    };
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
    detalle(id) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "http://localhost:8000/api/obtener_ingresos_productos?id_ingreso=" +
              id,
            {
              headers: {
                Authorization: `Bearer ${this.auth.access_token}`,
              },
            }
          )
          .then((response) => {
            this.detalle_ingresos = response.data;
            console.log(this.detalle_ingresos);
          })
          .catch(function (error) {
            console.log(error.response.lista_ingresos);

            reject(error);
          });
      });
    },
    /*   editar() {
      return new Promise((resolve, reject) => {
        axios
          .put(
            "http://localhost:8000/api/editar_avance",
            {
              id_avance: this.id_avance,
              id_depto: this.id_depto,
              id_torre: this.id_torre,
              id_tarea: this.id_tarea,
              id_estado: this.id_estado,
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
    }, */
    lostFocusModal(done) {
      let me = this;
      this.$confirm("Se cerrará módulo")
        .then((_) => {
          this.detalle_ingresos=[]
          this.cerrarModal();
          done();
        })
        .catch((_) => {});
    },

    cerrarModal() {
      this.modalSync = false;
      ;
    },
  },

  computed: {
    totalItem: function () {
      let sum = 0;
      this.detalle_ingresos.forEach(function (item) {
        sum += parseFloat(item.cantidad) * parseFloat(item.precio);
      });

      return sum;
    },
    formattedDate() {
      return this.formatDate(this.date);
    },
    ...mapState(["server_api", "auth"]),
  },
  mounted() {
    this.detalle();
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
