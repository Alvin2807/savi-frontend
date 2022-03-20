<template>
<v-app>
<login-iniciar/>
<v-container>
    <v-card max-width="600px" class="mx-auto elevation-5" height="550">
        <v-toolbar height="120" flat>
            <v-toolbar-title class="mx-auto">
                <img height="100" :src="require('../assets/usuario.png')"/>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <div class="text-center">
                <h3 class="text-h5">Iniciar Session</h3>
            </div>
           
                <v-form ref="validacion">
                    <v-row>
                    <div class="text-left mt-8">
                        <h3 class="text-h6 mx-8">Usuario</h3>
                    </div>
                        <v-col
                            cols="12"
                            sm="6"
                            md="12"
                        >
                            <v-text-field
                                v-model="usuario"
                                label="Ingrese su usuario"
                                prepend-inner-icon="mdi-account-circle" 
                                color="indigo darken-4"
                                autocomplete="off"
                                class="caption mx-5"
                                dense
                                id="usuario"
                                outlined
                                height="50"
                                :rules="$rules.usuarioRules"
                            >
                            </v-text-field>
                        </v-col>

                        <div class="text-left">
                            <h3 class="text-h6 mx-8">
                                Contraseña
                            </h3>
                        </div>

                        <v-col
                            cols="12"
                            sm="6"
                            md="12"
                        >
                            <v-text-field
                                v-model="contraseña"
                                label="Ingrese su contraseña"
                                prepend-inner-icon="mdi-lock" 
                                color="indigo darken-4"
                                autocomplete="off"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = ! showPassword"
                                dense
                                outlined
                                id="contraseña"
                                class="caption mx-5"
                                height="50"
                                :rules="$rules.contraseñaRules"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
        </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer><!-- accederSistema-->
                <v-btn
                    class="mt-2"
                    :loading="loading"
                    :disabled="loading"
                    color="indigo darken-4"
                    dark
                    x-large
                    width="300"
                    rounded
                    @click="accederSistema()"
                >
                    Entrar
                    <v-icon class="mx-2">vpn_key</v-icon>
                    <template v-slot:loader>
                    <span>Por favor espere..</span>
                    </template>
                </v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
    </v-card>
</v-container>
  
</v-app>
</template>
<script>
import LoginIniciar from '../components/LoginIniciar'
export default {
    components: {
    LoginIniciar,
    },
    data() {
        return {
            loader: null,
            loading: false,
            titulo:-1,
            showPassword: false,
            usuario:'',
            contraseña:''
            
           
        };
    },

     watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },

    mounted () {
        
    },

    computed: {
        tituloFormulario() {
            return this.titulo === -1 ? 'iniciar sesion': ''
        },
    },

    methods: { 
        accederSistema: function () { 
            if (this.$refs.validacion.validate()) {
                this.loader = 'loading'
                this.$router.push({path: '/perfil'})
              
            }


        }
        
    }
    
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}


#usuario { 
    font-size: 20px;
    color: mediumblue;
}

#contraseña { 
    font-size: 20px;
    color: mediumblue;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }

}

</style>
