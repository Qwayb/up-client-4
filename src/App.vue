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
      currentUser: null, // Текущий пользователь
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
    checkAuth() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        this.isAuthenticated = true;
        this.currentUser = user;
      }
    },

    // Вход в систему
    login(user) {
      this.isAuthenticated = true;
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Выход из системы
    logout() {
      this.isAuthenticated = false;
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      this.$root.showNotification('Вы вышли из системы', 'info');
      this.$router.push('/');
    },

  },
};
</script>

<style>
/* Глобальные стили */
</style>