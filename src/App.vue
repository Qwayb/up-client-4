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