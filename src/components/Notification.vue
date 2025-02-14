<template>
  <transition name="fade">
    <div v-if="visible" :class="['notification', type]">
      {{ message }}
      <button @click="close" class="close-button">×</button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      type: 'info',
    };
  },
  methods: {
    show(message, type = 'info') {
      this.message = message;
      this.type = type;
      this.visible = true;

      setTimeout(() => {
        this.close();
      }, 3000);
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.notification.info {
  background-color: #42b983;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #ff4444;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}

.close-button:hover {
  opacity: 0.8;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>