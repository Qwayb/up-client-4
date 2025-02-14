<template>
  <div class="register">
    <h1>Регистрация</h1>

    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="fio">ФИО:</label>
        <input
            v-model="form.fio"
            type="text"
            id="fio"
            placeholder="Введите ваше ФИО"
            required
        />
        <span v-if="errors.fio" class="error">{{ errors.fio }}</span>
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

      <button type="submit" class="submit-button">Зарегистрироваться</button>
    </form>

    <router-link to="/login" class="login-link">Уже есть аккаунт? Войдите</router-link>

    <div v-if="commonError" class="common-error">{{ commonError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fio: '',
        email: '',
        password: '',
      },
      errors: {},
      commonError: '',
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.fio) {
        this.errors.fio = 'ФИО обязательно';
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

      return Object.keys(this.errors).length === 0;
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    async handleSubmit() {
      if (!this.validateForm()) return;

      try {
        const response = await fetch('http://lifestealer86.ru/api-shop/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fio: this.form.fio,
            email: this.form.email,
            password: this.form.password,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 422 && data.errors) {
            // Обработка ошибок валидации
            for (const key in data.errors) {
              this.errors[key] = data.errors[key].join(', ');
            }
          } else {
            throw new Error(data.message || 'Ошибка при регистрации');
          }
        } else {
          const data = await response.json();
          console.log('Регистрация успешна:', data);

          this.$root.showNotification('Регистрация прошла успешно!', 'success');

          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        this.commonError = error.message || 'Ошибка при регистрации. Попробуйте еще раз.';
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

.common-error {
  color: #ff4444;
  text-align: center;
  margin-top: 20px;
}
</style>