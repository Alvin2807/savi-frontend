import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[ 
      {
        path: '/categorias',
        name: 'Categorias',
        component: () => import('../views/Categorias.vue'),
      },

     {
       path:'/perfil',
       name:'Perfil',
       component: ()  => import('../views/Perfil.vue')
     },

     {
       path:'/listado-de-marcas',
       name:'Marcas',
       component: ()  => import('../views/Marcas.vue')
     },

     { 
       path:'/modelos-y-marcas',
       name:'Modelos.vue',
       component: () => import('../views/Modelos.vue')
     }

    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router