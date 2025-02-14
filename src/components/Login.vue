<template>
  <div class="login">
    <h1>Вход в систему</h1>

    <!-- Форма входа -->
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Введите ваш email"
            required
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Введите пароль"
            required
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <button type="submit" class="submit-button">Войти</button>
    </form>

    <!-- Ссылка на страницу регистрации -->
    <router-link to="/register" class="register-link">Нет аккаунта? Зарегистрируйтесь</router-link>

    <!-- Общая ошибка -->
    <div v-if="commonError" class="common-error">{{ commonError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {}, // Ошибки для каждого поля
      commonError: '', // Общая ошибка
    };
  },
  methods: {
    // Валидация формы
    validateForm() {
      this.errors = {};

      if (!this.form.email) {
        this.errors.email = 'Email обязателен';
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Некорректный email';
      }

      if (!this.form.password) {
        this.errors.password = 'Пароль обязателен';
      }

      return Object.keys(this.errors).length === 0;
    },

    // Проверка валидности email
    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    // Обработка отправки формы
    handleSubmit() {
      if (!this.validateForm()) return;

      const user = JSON.parse(localStorage.getItem(`user_${this.form.email}`));
      if (user && user.password === this.form.password) {
        // Вход выполнен успешно
        this.$root.login(user);
        this.$root.showNotification('Вход выполнен успешно!', 'success');
        this.$router.push('/');
      } else {
        this.commonError = 'Неверный email или пароль';
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.error {
  color: #ff4444;
  font-size: 14px;
}

.submit-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #369c6e;
}

.register-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #42b983;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.common-error {
  color: #ff4444;
  text-align: center;
  margin-top: 20px;
}
</style>