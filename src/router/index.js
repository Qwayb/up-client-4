import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import Cart from '@/components/Cart.vue';
import Orders from '@/components/Orders.vue'; // Импортируем компонент

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/orders', component: Orders }, // Добавляем маршрут
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;