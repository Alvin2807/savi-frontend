<template>
    <v-container>
    <v-app-bar 
        app 
        color="indigo darken-4"
        dark
    >
        <v-spacer></v-spacer>
          <img height="40" class="mr-3" :src="require('../assets/iventario.png')"/>
        <v-toolbar-title class="subtitle-2">
            <h3 class="text-h6">
            {{tituloSistema.toUpperCase()}}</h3>
        </v-toolbar-title>
          <img height="40" class="mx-3" :src="require('../assets/ventas.png')"/>
        <v-spacer></v-spacer>

    </v-app-bar>
    </v-container>
</template>
<script>
export default {
    name:'LoginIniciar',
      data() {
        return {
            titulo: -1,
        };
    },

    mounted () {
        
    },

    computed: {
        tituloSistema() {
            return this.titulo === -1 ? 'sistema administrativo de ventas e iventario' : ''
        },
    },
}
</script>