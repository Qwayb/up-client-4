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
      isAuthenticated: !!localStorage.getItem('token'), // Состояние авторизации
    };
  },
  methods: {
    showNotification(message, type = 'info') {
      this.$refs.notification.show(message, type);
    },
  },
};
</script>

<style>
/* Глобальные стили */
</style>