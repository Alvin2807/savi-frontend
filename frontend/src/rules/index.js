import Vue from 'vue'

const rules = Vue.prototype.$rules = {

    required: [
        v => !!v || 'Campo obligatorio.'
    ],

    usuarioRules: [
        v => !!v || 'Por favor ingrese su usuario.'
    ],

    contraseñaRules: [
        v => !!v || 'Por favor ingrese su contraseña.'
    ],
    RulesEmail: [
        v => /^\w+([A-Z]?\w+)*@\w+([0-9]?\w+)*(\.\w{2,3})+$/.test(v) || 'Campo obligatorio',
    ],



}

export default rules