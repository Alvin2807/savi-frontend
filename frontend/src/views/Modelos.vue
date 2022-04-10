<template>
   <v-app style="background:#ECEFF1">
       <v-container>
           <v-card>
               <v-toolbar flat height="100">
                   <v-toolbar-title class="mt-5">
                       <h3 class="text-h6 mx-3 mt-5">{{tituloTabla.toUpperCase()}}</h3>
                   </v-toolbar-title>
               </v-toolbar>
               
               <v-card-text>
                <v-row>
                    <v-col 
                        cols="12"
                        sm="6"
                        md="6"
                    >
                    <v-text-field 
                        v-model="search"
                        label="Busqueda"
                        placeholder="Buscar"
                        color="indigo darken-4"
                        clearable
                        class="caption"
                        outlined
                        dense
                        prepend-inner-icon="search"
                        autocomplete="off"
                    >
                    </v-text-field>

                    <v-dialog 
                        v-model="dialog"
                        max-width="600px"
                        transition="fab-transition"
                    >
                       <v-card>
                            <v-toolbar height="100" class="elevation-1">
                            <v-toolbar-title class="mx-auto">
                                <h3 class="text-h6">{{tituloFormulario.toUpperCase()}}</h3>
                            </v-toolbar-title>
                        </v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-form ref="validacion">
                                        <v-row>
                                            <v-col 
                                                cols="12"
                                                sm="6"
                                                md="12"
                                            >
                                                <v-text-field 
                                                    v-model="editedItem.nombre_modelo"
                                                    label=" Reemplaze el nombre de modelo"
                                                    color="indigo darken-4"
                                                    maxLength="100"
                                                    autocomplete="off"
                                                    clearable
                                                    type="text"
                                                    dense
                                                    class=" caption my-input mt-5"
                                                    :rules="$rules.required"
                                                >
                                                    
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="red"
                                    class="white--text"
                                    @click="cancelar()"
                                >
                                    cancelar
                                </v-btn>
                                <v-btn 
                                    color="blue darken-4"
                                    class="white--text"
                                    @click="guardar()"
                                >
                                    guardar
                                </v-btn>
                            </v-card-actions>
                       </v-card>

                    </v-dialog>

                    </v-col>
                </v-row>
                   <v-data-table 
                    locale="es"
                    no-data-text="No hay modelos para mostrar"
                    no-results-text="No se encontro resultados"
                    :headers="cabecera"
                    :items-per-page="5"
                    :items="datos"
                    :footer-props="{itemsPerPageText:'Modelos por páginas'}"
                    :loading="cargandoDatos"
                    :search="search"
                    loading-text="Cargando modelos por favor espere"
                   >
                    <template v-slot:[`item.actions`]="{item}">
                        <v-tooltip top>
                            <template v-slot:activator="{on,attrs}">
                                <v-icon 
                                    v-on="on"
                                    v-bind="attrs"
                                    @click="editarModelo(item)"
                                >
                                create
                                </v-icon>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                     
                    </template>

                   </v-data-table>
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
            cargandoDatos:true,
            search:'',
            dialog:false,
            editedItem:{
                nombre_modelo:''
            },
            cabecera:
            [
                {text:'Nombre de modelo', value:'nombre_modelo', class:'blue-grey lighten-3'},
                {text:'Nombre de marca', value:'nombre_marca', class:'blue-grey lighten-3'},
                {text:'Acciones',value:'actions',sortable:false,class:'blue-grey lighten-3'}
            ],
            datos:[]
        };
    },

    mounted () {
        this.mostrarModelos();
    },

    computed: {
        tituloTabla() {
            return this.titulo === -1 ? 'listado de modelos' : ''
        },

        tituloFormulario () { 
            return this.titulo === -1 ? 'formulario de editar modelo' : ''
        }
    },

    methods: {
        mostrarModelos: function () {
            this.cargandoDatos = true
            API 
            .get('mostrarModelos')
            .then(respuesta=>{
                this.datos = respuesta.data.data
                this.cargandoDatos = false
            })
        },

        editarModelo: function (item) { 
            console.log(item)
            Swal.fire({
                title: 'Estas seguro de editar?',
                text: "Advertencia: modificaras el modelo " + item.nombre_modelo,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText:'No'
            }).then((result) => {
            if (result.isConfirmed) {
                this.editedIndex = this.datos.indexOf(item)
                this.editedItem = Object.assign({},item)
                this.dialog = true
            }
            })  
        },

        cancelar: function () { 
            this.$refs.validacion.reset();
            this.$refs.validacion.resetValidation();
            this.dialog = false
        },

        guardar: function () { 
           if (this.$refs.validacion.validate()) {
                API 
                .put('editarModelo', this.editedItem)
                .then(respuesta=>{ 
                    if (respuesta.data.ok) {
                        this.mostrarModelos()
                        this.mensajeModificado(respuesta.data.modificado)
                        this.cancelar();
                    } else { 
                        this.mensajeVerificarModificado(respuesta.data.verificar)
                    }
                })
            }
          console.log(this.editedItem)
        },

        mensajeModificado: function (modificado) { 
            Swal.fire({ 
                icon:'success',
                title:'Genial!',
                text:modificado,
                showConfirmButton:false,
                timer:2000
            })
        },

        mensajeVerificarModificado: function (verificar) { 
            Swal.fire({ 
                icon:'error',
                title: verificar,
               confirmButtonColor:'#B71C1C'
            })
        },


    },
}
</script>
<style>
.my-input input{
  text-transform: uppercase;
}
</style>