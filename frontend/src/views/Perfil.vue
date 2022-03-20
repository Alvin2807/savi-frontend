<template>
    <v-app style="background:#ECEFF1">
     <v-container>
         <v-card>
             <v-toolbar 
                class="elevation-1"
                flat
                height="100"
             >
                <v-toolbar-title class="caption mx-auto">
                   <h3 class="text-h6">{{tituloPerfil.toUpperCase()}}</h3>
                </v-toolbar-title>
             </v-toolbar>
                
         </v-card>
     </v-container>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
           titulo:-1
        };
    },

    mounted () {
        
    },

    computed: {
        tituloPerfil() {
            return this.titulo === -1 ? 'bienvenido a Alvin Javier Pino' : ''
        }
    },
}
</script>