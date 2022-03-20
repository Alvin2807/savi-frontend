<template>
  <v-app style="background:#ECEFF1">
      <v-navigation-drawer
      v-model="drawer"
       app
       class="elevation-1"
      >
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar size="70">
                    <img :src="require('../assets/usuario.png')">
                </v-list-item-avatar>
                
                <v-list-item-content>
                    <v-list-item-title class="subtitle-2">Alvin Javier</v-list-item-title>
                    <v-list-item-subtitle class="subtitle-2">Pino</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-divider></v-divider>

        <v-list>
            <v-list-group 
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
                color="indigo darken-4"
            >
                <template v-slot:activator>
                  <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item 
                    v-for="child in item.items"
                    :key="child.title"
                    link 
                    :to="child.path" 
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="child.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list-group>
        </v-list>

      </v-navigation-drawer>
      <v-app-bar 
        app
        color="indigo darken-4"
        dark
      >
          <v-app-bar-nav-icon @click="drawer =! drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-toolbar-title class="overline">
            <img height="40"  :src="require('../assets/ventas.png')"/>
            {{tituloSistema.toUpperCase()}}
            <img height="40"  :src="require('../assets/iventario.png')"/>
          </v-toolbar-title>
          <v-spacer></v-spacer>
      </v-app-bar>
    <router-view/>
  </v-app>
</template>
<script>
export default {
    name:'SistemaBasico',
    data() {
        return {
            drawer:null,
            titulo:-1,
            items:[
                {
                    action:'space_dashboard',
                    items:
                    [
                        {title:'Listado de categorías', path:'/categorias'},
                        {title: 'Listado de marcas', path:'/listado-de-marcas'}
                    ]
                        ,
                    title:'Parametros'
                },

               
            ]
           
            
        };
    },

    mounted () {
        
    },

    computed: {
        tituloSistema() {
            return this.titulo === -1 ? 'sistema administrativo de ventas e iventario' : ''
        }
    },
}
</script>