<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Ingresos realizados hasta la fecha</h4>
          </md-card-header>
          <md-card-content>
            <el-table :data="tableData" height="500" style="width: 100%">
              <el-table-column prop="date" label="Rut" width="180">
              </el-table-column>
              <el-table-column prop="name" label="Nombre" width="180">
              </el-table-column>
              <el-table-column prop="address" label="Fecha"> </el-table-column>
              <el-table-column prop="address" label="Dirección">
              </el-table-column>
              <el-table-column label="Acciones" width="90"
                ><div  class=”box” >
                  <button
                    class="btn btn-warning btn-sm text-dark"
                    title="Editar"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-danger btn-sm text-dark"
                    title="Eliminar"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </el-table-column>
            </el-table>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <div class="container">
      <modalListaIngreso ref="modalListaIngreso"> </modalListaIngreso>
    </div>
  </div>
</template>

<script>
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) =>
      toLower(item.numero_documento).includes(toLower(term))
    );
  }

  return items;
};

import ModalListaIngreso from "@/pages/Modals/ModalListaIngreso.vue";
import { ref } from "vue";
import axios from "axios";
import swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  components: {
    modalListaIngreso: ModalListaIngreso,
  },
  name: "TableSearch",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          acciones: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
</style>