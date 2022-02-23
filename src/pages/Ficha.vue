<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <form>
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">FICHA DE INGRESO</h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="col">
                  <div
                    class="card border-light mb-3 col"
                    style="max-width: 50rem"
                  >
                    <div class="card-body">
                      <div class="row">
                        <label class="form-label">RUT</label>
                        <div class="col-sm-4">
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-sm-2">
                          <el-button type="primary">BUSCAR</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12"><h4>I. DATOS DE IDENTIFICACIÓN</h4></div>

                <div class="card col">
                  <div class="card-body">
                    <div class="col-md-12">
                      <label class="form-label">NOMBRE COMPLETO </label>
                      <el-input v-model="input" clearable> </el-input>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-6">
                          <label class="form-label">FECHA DE NACIMIENTO</label>
                          <div class="row">
                            <el-date-picker
                              class="col-12"
                              v-model="value1"
                              type="date"
                              placeholder="Pick a day"
                            >
                            </el-date-picker>
                          </div>
                        </div>
                        <div class="col-3">
                          <label class="form-label">EDAD</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-3">
                          <label class="form-label">SEXO</label>
                          <div class="row">
                            <el-select
                              v-model="value"
                              placeholder="Select"
                              class="col-12"
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <label class="form-label">NACIONALIDAD</label>
                      <div class="row">
                        <el-select
                          v-model="value"
                          placeholder="Select"
                          class="col-12"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-6">
                          <label class="form-label">ESTADO CIVIL</label>
                          <div class="row">
                            <el-select
                              v-model="value"
                              placeholder="Select"
                              class="col-12"
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                        <div class="col-2">
                          <label class="form-label">HIJOS</label>
                          <div>
                            <el-radio v-model="radio" label="1">Si</el-radio>
                            <el-radio v-model="radio" label="2">No</el-radio>
                          </div>
                        </div>
                        <div class="col-4">
                          <label class="form-label">N° DE HIJOS</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-6">
                          <label class="form-label">PROFESIÓN</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-2">
                          <label class="form-label">PESO</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-2">
                          <label class="form-label">TALLA</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-2">
                          <label class="form-label">IMC</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <label class="form-label">DIRECCIÓN PARTICULAR</label>
                      <el-input v-model="input" clearable> </el-input>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col-sm">
                          <label class="form-label">TELEFONO</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                        <div class="col-sm">
                          <label class="form-label">EMAIL</label>
                          <el-input v-model="input" clearable> </el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>II. ÁREA PERSONALES Y FAMILIAR</h4>
                </div>

                <div class="card col">
                  <div class="card-body">
                    <div class="col-md-12">
                      <label class="form-label">A. MOTIVO CONSULTA</label>
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">B. ANTECEDENTES</label>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label"
                        >1. ENFERMEDADES PERSONALES Y/O FAMILIARES</label
                      >
                      <el-input
                        v-model="input"
                        id="text_area_antecedentes"
                        clearable
                      >
                      </el-input>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">2. CONSUMO</label>
                      <div>
                        <el-radio v-model="radio" label="1">Alcohol</el-radio>
                        <el-radio v-model="radio" label="2">Drogas</el-radio>
                        <el-radio v-model="radio" label="2">Otros</el-radio>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label"
                        >3. EXPERIENCIAS TRAUMÁTICAS, ACCIDENTES, OTROS:</label
                      >
                      <el-input
                        v-model="input"
                        id="text_area_antecedentes"
                        clearable
                      >
                      </el-input>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">4. ANTECEDENTES DE SALUD</label>
                      <el-input
                        v-model="input"
                        id="text_area_antecedentes"
                        clearable
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>III. ANAMNESIS</h4>
                </div>

                <div class="card col">
                  <div class="card-body">
                    <div class="col-12">
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>IV. DIAGNOSTICO</h4>
                </div>
                <div class="card col">
                  <div class="card-body">
                    <div class="col-12">
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>V. INDICACIONES</h4>
                </div>
                <div class="card col">
                  <div class="card-body">
                    <div class="col-12">
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>VI. TRATAMIENTO</h4>
                </div>
                <div class="card col">
                  <div class="card-body">
                    <div class="col-12">
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h4>VII. EXAMENES SOLICITADOS</h4>
                </div>
                <div class="card col">
                  <div class="card-body">
                    <div class="col-12">
                      <el-input type="textarea" id="text_area"></el-input>
                    </div>
                  </div>
                </div>

                <br />
                <div class="col-12">
                  <div class="col-12">
                    <el-button type="success">REGISTRAR</el-button>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>

    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    ></div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import swal from "sweetalert2";
import { mapState } from "vuex";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
window.Swal = swal;
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      input: "",
      value: "",
      fecha_actual: new Date(),
    };
  },
  method: {
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
  },

  computed: {
    formattedDate() {
      return this.formatDate(this.date);
    },
  },
};
</script>
<style>
button {
  float: right;
}

#text_area {
  height: 200px;
}

#text_area_antecedentes {
  height: 100px;
}
</style>
