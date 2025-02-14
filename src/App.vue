<template>
  <div id="app">
    <!-- Хедер -->
    <header class="header">
      <div class="logo" @click="goToHome">
        Просто купить
      </div>
    </header>

    <!-- Основной контент -->
    <router-view />

    <!-- Уведомления -->
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

    // Переход на главную страницу
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
/* Глобальные стили */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #42b983;
  padding: 16px;
  color: white;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.logo:hover {
  opacity: 0.8;
}

/* Основной контент */
main {
  flex: 1;
  padding: 20px;
}
</style>