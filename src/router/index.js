import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import store from "../store"

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(){
    return { top: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !="login"){
    if (store.getters["auth/isLogin"]){
      return next();
    } else {
      return next({name: 'login'});
    }
  }
  next()
})

export default router