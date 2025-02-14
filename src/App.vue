<template>
  <div id="app">
    <router-view />
    <Notification ref="notification" />
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';

export default {
  components: {
    Notification,
  },
  data() {
    return {
      isAuthenticated: false, // Состояние авторизации
    };
  },
  created() {
    this.checkAuth(); // Проверяем авторизацию при загрузке приложения
  },
  methods: {
    // Показ уведомлений
    showNotification(message, type = 'info') {
      this.$refs.notification.show(message, type);
    },

    // Проверка авторизации
    async checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://lifestealer86.ru/api-shop/check-auth', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            this.isAuthenticated = true; // Пользователь авторизован
          } else {
            localStorage.removeItem('token'); // Удаляем недействительный токен
            this.isAuthenticated = false;
          }
        } catch (error) {
          console.error('Ошибка при проверке токена:', error);
          localStorage.removeItem('token'); // Удаляем недействительный токен
          this.isAuthenticated = false;
        }
      }
    },
  },
};
</script>

<style>
/* Глобальные стили */
</style>