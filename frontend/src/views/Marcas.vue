<template>
    <v-app  style="background:#ECEFF1">
       <v-container>
           <v-card>
               <v-toolbar flat class="elevation-0" height="50">
                   <v-toolbar-title class="mt-5">
                       <h3 class="text-h6 mx-3">{{tituloFormulario.toUpperCase()}}</h3>
                   </v-toolbar-title>
               </v-toolbar>
               <v-card-text>
                   <v-container>
                       <v-form ref="validacion">
                           <v-row>
                               <v-col 
                                cols="12"
                                sm="6"
                               >
                                    <v-text-field 
                                        v-model="datos.nombre_marca"
                                        label="Ingrese el nombre de Marca"
                                        color="indigo darken-4"
                                        clearable
                                        autocomplete="off"
                                        type="text"
                                        class="caption my-input"
                                        :rules="$rules.required"
                                    >
                                    </v-text-field>
                               </v-col>
                           </v-row>
                            <v-btn 
                                color="indigo darken-4"
                                class="white--text mt-3"
                                large
                                @click="registrarMarca()"
                            >
                                <v-icon class="mx-1">add</v-icon>
                              crear        
                            </v-btn>
                            <v-row>
                                <v-col 
                                    cols="12"
                                    sm="6"
                                >
                                    <v-text-field 
                                        label="Busqueda"
                                        v-model="busqueda"
                                        color="indigo darken-4"
                                        autocomplete="off"
                                        outlined
                                        dense
                                        class="caption mt-5"
                                        clearable
                                        prepend-inner-icon="search"
                                    >

                                    </v-text-field>

                                </v-col>
                            </v-row>
                            
                            <v-data-table 
                                no-data-text="No hay marcas para mostrar"
                                :footer-props="{itemsPerPageText:'Marcas por páginas'}"
                                :items-per-page="5"
                                no-results-text="No se encontro resultados"
                                locale="es"
                                :headers="cabecera"
                                :items="marcas"
                                :search="busqueda"
                                class="elevation-2"
                            >
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon
                                        md
                                        class="mr-2"
                                        @click="traerEditarMarca(item)"
                                    >
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon
                                        md
                                        class="mx-2"
                                        @click="deleteItem(item)"
                                    >
                                        mdi-delete
                                    </v-icon>
                                    <v-icon
                                        md
                                        class="mx-2"
                                        @click="deleteItem(item)"
                                    >
                                        post_add
                                    </v-icon>
                                </template>
                            </v-data-table>
                       </v-form>
                   </v-container>
               </v-card-text>
           </v-card>
       </v-container>
    </v-app>
</template>
<script src="sweetalert2.all.min.js"></script>
<script>
import API from '@/api'
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
    data() {
        return {
           titulo: -1,
           editedIndex:-1,
           busqueda:'',
           datos:{
               nombre_marca:''
           },
           cabecera:
           [
               {text:'Nombre de marca', value:'nombre_marca'},
                 { text: 'Editar/Eliminar/Agregar Modelo', value: 'actions', sortable: false },
           ],
           marcas:[]
        };
    },

    mounted () {
      this.mostrarListaMarcas()  
    },

    computed: {
        tituloFormulario() {
            return this.titulo === -1 ? 'formulario de crear marcas' : ''
        }
    },

    methods: {
        mostrarListaMarcas: function () {
            API 
            .get('mostrarListaMarcas')
            .then(respuesta=>this.marcas = respuesta.data.data)
        },

        registrarMarca: function () { 
            if (this.$refs.validacion.validate()) {
                API 
                .post('registrarMarca', this.datos)
                .then(respuesta=>{ 
                    if (respuesta.data.ok) {
                        this.mostrarListaMarcas()
                        this.$emit('mostrarListaMarcas')
                        this.mensajeRegistroMarca(respuesta.data.aprovado)
                    } else { 
                        this.mensajeExisteMarca(respuesta.data.validar)
                    }
                })
            }

        },

        resetear: function() { 
            this.$refs.validacion.reset();
            this.$refs.validacion.resetValidation()
        },

        mensajeExisteMarca: function (validar) { 
            Swal.fire({ 
                icon:'error',
                title:'Error de registro',
                text: validar + this.datos.nombre_marca.toUpperCase(),
                confirmButtonColor:'#B71C1C'
            })
        },

        mensajeRegistroMarca: function (aprovado) { 
            Swal.fire({ 
                icon:'success',
                title:'Genial!',
                text: aprovado,
                showConfirmButton: false,
                timer:2000
            })
        }

       
    },
}
</script>

<style>
.my-input input{
  text-transform: capitalize;
}
</style>