<template>
  <div class="home">
    <h1>Каталог товаров</h1>

    <div v-if="!isAuthenticated" class="auth-links">
      <router-link to="/register" class="auth-link">Регистрация</router-link>
      <router-link to="/login" class="auth-link">Вход</router-link>
    </div>

    <div v-else class="user-actions">
      <button @click="logout" class="logout-button">Выйти</button>
      <router-link to="/orders" class="orders-link">Мои заказы</router-link>
    </div>

    <div v-if="loading" class="loading">Загрузка товаров...</div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }} руб.</p>
        <button v-if="isAuthenticated" @click="addToCart(product)" class="add-to-cart-button">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isAuthenticated: false,
      loading: true,
    };
  },
  methods: {
    addToCart(product) {
      console.log('Товар добавлен в корзину:', product);
    },

    logout() {
      this.isAuthenticated = false;
      console.log('Пользователь вышел из системы');
    },

    getImageUrl(imagePath) {
      return `http://lifestealer86.ru/api-shop/${imagePath}`;
    },
  },
  async created() {
    try {
      const response = await fetch('http://lifestealer86.ru/api-shop/products');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
      }
      const data = await response.json();
      this.products = data.data;
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.auth-links, .user-actions {
  margin-bottom: 20px;
}

.auth-link, .orders-link {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}

.auth-link:hover, .orders-link:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #cc0000;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.price {
  font-weight: bold;
  color: #42b983;
  margin: 10px 0;
}

.add-to-cart-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #369c6e;
}

.loading {
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 20px;
}
</style>