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

                            <!--Editar marcas-->
                            <v-dialog 
                                v-model="dialogEditarMarca"
                                transition="fab-transition"
                                max-width="600px"
                            >
                                <v-card>
                                    <v-toolbar class="elevation-1" height="100" color="primary" dark>
                                        <v-toolbar-title class="mx-auto">
                                            <h3 class="text-h6">{{tituloDetallesEditar.toUpperCase()}}</h3>
                                        </v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container>
                                            <v-form ref="validarModifica">
                                                <v-col 
                                                    cols="12"
                                                    sm="12"
                                                >
                                                    <v-text-field 
                                                        v-model="datosEditar.nombre_marca"
                                                        label="Reemplaze el nombre de la marca"
                                                        color="indigo darken-4"
                                                        autocomplete="off"
                                                        class="caption my-input mt-5"
                                                        type="text"
                                                        clearable
                                                        :rules="$rules.required"
                                                    >
                                                    </v-text-field>
                                                </v-col>    
                                            </v-form>
                                        </v-container>
                                  
                                    </v-card-text>
                                    <v-card-actions class="mx-auto">
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            color="red"
                                            class="white--text mr-3"
                                            large
                                            width="150"
                                            @click="salir()"
                                        >
                                            cancelar
                                        </v-btn>
                                        <v-btn 
                                            color="indigo darken-4"
                                            class="white--text"
                                            large
                                            width="150"
                                            @click="guardar()"
                                        >
                                            guardar
                                        </v-btn>
                                    </v-card-actions>
                                    <v-spacer></v-spacer>
                                </v-card>

                            </v-dialog>
                            
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
                                :loading="cargarDatos"
                                loading-text="Cargando marcas por favor espere..."
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
           cargarDatos:true,
           dialogEditarMarca:false,
           datos:{
               nombre_marca:''
           },
           datosEditar:{
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
        },
        tituloDetallesEditar() { 
            return this.titulo === -1 ? 'formulario de editar marca' : ''
        }
    },

    methods: {
        mostrarListaMarcas: function () {
            this.cargarDatos = true
            API 
            .get('mostrarListaMarcas')
            .then(respuesta=>{
                this.marcas = respuesta.data.data
                this.cargarDatos = false
            })
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
        },

        traerEditarMarca: function (item) {
            this.editedIndex = this.marcas.indexOf(item)
            this.datosEditar = Object.assign({},item)
            Swal.fire({ 
                title: 'Estas seguro de editar?',
                text: "Advertencia: modificaras la marca " + this.datosEditar.nombre_marca,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText:'No'

            }).then((result) => {
            if (result.isConfirmed) {
                this.editedIndex = this.marcas.indexOf(item)
                this.datosEditar = Object.assign({},item)
                this.dialogEditarMarca = true
            }
            }) 
         
        },

        salir:function () { 
            this.dialogEditarMarca = false
        },

        guardar: function () { 
            console.log(this.datosEditar)
            if (this.$refs.validarModifica.validate()) {
                API 
                .put('modificarMarca', this.datosEditar)
                .then(respuesta=>{
                    if (respuesta.data.ok) {
                        this.mostrarListaMarcas()
                        this.$emit('mostrarListaMarcas')
                        this.dialogEditarMarca = false
                        this.mensajeGuardarMarca(respuesta.data.modificado)
                    } else { 
                        this.mensajeExisteModificarMarca(respuesta.data.verificar)
                    }
                })
            }

        },

        mensajeGuardarMarca: function (modificado) { 
            Swal.fire({
                icon:'success',
                title:'Genial!',
                text: modificado,
                showConfirmButton: false,
                timer: 2000
            })
        },

        mensajeExisteModificarMarca: function (verificar) { 
            Swal.fire({ 
                icon:'error',
                title:'Error al modificar',
                text: verificar + this.datosEditar.nombre_marca,
                confirmButtonColor:'#B71C1C'

            })
        }

       

       
    },
}
</script>

<style>
.my-input input{
  text-transform: uppercase;
}
</style>