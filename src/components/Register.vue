<template>
  <div class="register">
    <h1>Регистрация</h1>

    <!-- Форма регистрации -->
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Введите ваше имя"
            required
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

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

      <div class="form-group">
        <label for="confirmPassword">Подтвердите пароль:</label>
        <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Подтвердите пароль"
            required
        />
        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
      </div>

      <button type="submit" class="submit-button">Зарегистрироваться</button>
    </form>

    <!-- Ссылка на страницу входа -->
    <router-link to="/login" class="login-link">Уже есть аккаунт? Войдите</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {}, // Ошибки валидации
    };
  },
  methods: {
    // Валидация формы
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'Имя обязательно';
      }

      if (!this.form.email) {
        this.errors.email = 'Email обязателен';
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Некорректный email';
      }

      if (!this.form.password) {
        this.errors.password = 'Пароль обязателен';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Пароль должен содержать минимум 6 символов';
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Пароли не совпадают';
      }

      return Object.keys(this.errors).length === 0;
    },

    // Проверка валидности email
    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    // Обработка отправки формы
    async handleSubmit() {
      if (!this.validateForm()) return;

      try {
        const response = await fetch('http://lifestealer86.ru/api-shop/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          throw new Error('Ошибка при регистрации');
        }

        const data = await response.json();
        console.log('Регистрация успешна:', data);

        // Уведомление об успешной регистрации
        this.$root.showNotification('Регистрация прошла успешно!', 'success');

        // Перенаправление на страницу входа
        this.$router.push('/login');
      } catch (error) {
        console.error('Ошибка:', error);

        // Уведомление об ошибке
        this.$root.showNotification('Ошибка при регистрации. Попробуйте еще раз.', 'error');
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.register-form {
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

.login-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #42b983;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>