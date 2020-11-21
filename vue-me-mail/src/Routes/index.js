import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from '../views/Dashboard.vue';
import Cadastro from '../views/Cadastro.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard", 
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Cadastro
  },
];

const router = new VueRouter({
  routes
});

export default router;