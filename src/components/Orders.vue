<template>
  <div class="orders">
    <h1>Оформленные заказы</h1>

    <!-- Список заказов -->
    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h2>Заказ #{{ order.id }}</h2>
        <p><strong>Дата:</strong> {{ order.date }}</p>
        <p><strong>Итого:</strong> {{ order.total }} руб.</p>
        <div class="order-products">
          <h3>Товары:</h3>
          <div v-for="item in order.items" :key="item.id" class="order-product">
            <p>{{ item.name }} ({{ item.quantity }} шт.) — {{ item.price }} руб.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Если заказов нет -->
    <div v-else class="empty-orders">
      <p>У вас пока нет оформленных заказов.</p>
      <router-link to="/" class="continue-shopping">Вернуться к покупкам</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [], // Список заказов
    };
  },
  created() {
    // Восстановление заказов из localStorage
    if (this.$root.currentUser) {
      const ordersKey = `orders_${this.$root.currentUser.email}`;
      const savedOrders = localStorage.getItem(ordersKey);
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    }
  },
};
</script>

<style scoped>
.orders {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.order-item {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.order-products {
  margin-top: 10px;
}

.order-product {
  margin-left: 20px;
}

.empty-orders {
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