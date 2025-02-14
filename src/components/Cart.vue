<template>
  <div class="cart">
    <h1>Корзина</h1>

    <!-- Список товаров в корзине -->
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p class="price">{{ item.price }} руб.</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-button">+</button>
          </div>
          <button @click="removeFromCart(item)" class="remove-button">Удалить</button>
        </div>
      </div>

      <!-- Итоговая сумма -->
      <div class="total">
        <strong>Итого:</strong> {{ totalPrice }} руб.
      </div>

      <!-- Кнопка оформления заказа -->
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>

    <!-- Если корзина пуста -->
    <div v-else class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [], // Товары в корзине
    };
  },
  computed: {
    // Итоговая сумма заказа
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Увеличение количества товара
    increaseQuantity(item) {
      item.quantity += 1;
      this.saveCart();
    },

    // Уменьшение количества товара
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.saveCart();
      }
    },

    // Удаление товара из корзины
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      this.saveCart();
      this.$root.showNotification('Товар удален из корзины', 'info');
    },

    // Оформление заказа
    checkout() {
      if (!this.$root.currentUser) {
        this.$root.showNotification('Для оформления заказа войдите в систему', 'error');
        return;
      }

      // Создаем заказ
      const order = {
        id: Date.now(), // Уникальный ID заказа
        date: new Date().toLocaleString(), // Дата заказа
        total: this.totalPrice, // Итоговая сумма
        items: this.cartItems, // Товары в заказе
      };

      // Сохраняем заказ
      const ordersKey = `orders_${this.$root.currentUser.email}`;
      const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
      orders.push(order);
      localStorage.setItem(ordersKey, JSON.stringify(orders));

      // Очищаем корзину
      const cartKey = `cart_${this.$root.currentUser.email}`;
      localStorage.removeItem(cartKey);
      this.cartItems = [];

      // Уведомление об успешном оформлении заказа
      this.$root.showNotification('Заказ успешно оформлен!', 'success');

      // Перенаправление на страницу заказов
      this.$router.push('/orders');
    },

    // Сохранение корзины в localStorage
    saveCart() {
      if (this.$root.currentUser) {
        localStorage.setItem(`cart_${this.$root.currentUser.email}`, JSON.stringify(this.cartItems));
      }
    },

    // Метод для формирования полного URL изображения
    getImageUrl(imagePath) {
      return `http://lifestealer86.ru/api-shop/${imagePath}`;
    },
  },
  created() {
    // Восстановление корзины из localStorage
    if (this.$root.currentUser) {
      const cartKey = `cart_${this.$root.currentUser.email}`;
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    }
  },
};
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
}

.cart-item-details {
  flex: 1;
}

.price {
  font-weight: bold;
  color: #42b983;
  margin: 10px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-button:hover {
  background-color: #369c6e;
}

.quantity {
  font-size: 16px;
}

.remove-button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #cc0000;
}

.total {
  text-align: right;
  font-size: 18px;
  margin: 20px 0;
}

.checkout-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.checkout-button:hover {
  background-color: #369c6e;
}

.empty-cart {
  text-align: center;
  margin-top: 40px;
}

.continue-shopping {
  color: #42b983;
  text-decoration: none;
}

.continue-shopping:hover {
  text-decoration: underline;
}
</style>