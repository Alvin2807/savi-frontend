<template>
   <v-app style="background:#ECEFF1">
      <v-container>
         <v-card>
            <v-toolbar class="elevation-1" flat height="100">
               <v-toolbar-title class="mx-auto">
                  <div class="text-center">
                     <h3 class="text-h6">{{tituloTabla.toUpperCase()}}</h3>
                  </div>
               </v-toolbar-title>
            </v-toolbar>
               <v-card-text>
                     <v-data-table 
                        no-data-text="No hay categorías para mostrar"
                        :footer-props="{itemsPerPageText:'Categorías por páginas'}"
                        :items-per-page="5"
                        locale="es"
                        :headers="datos"
                        :items="categorias"
                     
                     >
                        
                     </v-data-table>
               </v-card-text>
         </v-card>
      </v-container>
   </v-app>
</template>
<script>
import API from '@/api'
export default {
    data() {
       return {
          titulo: -1,
          datos:[
             {text:'Categoría', value:'descripcion'},
             {text:'Estado', value:'estado'},
          ],
          categorias:[]
       };
    },

    mounted() {
       this.mostrarCategorias();
    },

    computed: {
       tituloTabla () {
          return this.titulo === -1 ? 'listado de categorías' : ''
       }
    },

    methods: {
       mostrarCategorias: function () {
          API
          .get('categorias')
          .then(respuesta=>this.categorias = respuesta.data.data)
       },
    },
}
</script>