<template>
    <v-container>
    <v-app-bar 
        app 
        color="indigo darken-4"
        dark
    >
        <v-spacer></v-spacer>
        <v-toolbar-title class="subtitle-2">
            <img height="40"  :src="require('../assets/ventas.png')"/>
            {{tituloSistema.toUpperCase()}}
            <img height="40"  :src="require('../assets/iventario.png')"/>
        </v-toolbar-title>
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