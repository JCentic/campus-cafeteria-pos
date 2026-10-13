<script setup>
import { computed, ref } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import MenuPage from './components/MenuPage.vue'
import OrderPage from './components/OrderPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import ReceiptPage from './components/ReceiptPage.vue'
import { products } from './data/products.js'

// Which page is showing: 'menu', 'order', 'payment' or 'receipt'.
// A simple ref is enough here, so no router package is needed.
const currentPage = ref('menu')
const menuFeedback = ref('')
const cart = ref([])
const orderItems = computed(() => cart.value.map((entry) => {
  const product = products.find((item) => item.id === entry.productId)
  return {
    ...product,
    quantity: entry.quantity,
    subtotalCentavos: product.priceCentavos * entry.quantity,
  }
}))
const totalItems = computed(() => cart.value.reduce((sum, entry) => sum + entry.quantity, 0))
const totalCentavos = computed(() => orderItems.value.reduce((sum, item) => sum + item.subtotalCentavos, 0))

function goTo(page) {
  currentPage.value = page
  menuFeedback.value = ''
}

function handleAddToOrder(product) {
  const existingItem = cart.value.find((item) => item.productId === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ productId: product.id, quantity: 1 })
  }
  menuFeedback.value = `${product.name} added to order.`
}

function changeQuantity(productId, amount) {
  const item = cart.value.find((entry) => entry.productId === productId)
  if (!item) return

  item.quantity = Math.max(1, item.quantity + amount)
}

function removeItem(productId) {
  cart.value = cart.value.filter((item) => item.productId !== productId)
}
</script>

<template>
  <div class="pos-shell">
    <AppNavbar :current-page="currentPage" @navigate="goTo" />

    <main id="main-content">
      <MenuPage
        v-if="currentPage === 'menu'"
        :feedback="menuFeedback"
        @add-to-order="handleAddToOrder"
      />
      <OrderPage
        v-else-if="currentPage === 'order'"
        :items="orderItems"
        :item-count="totalItems"
        :total-centavos="totalCentavos"
        @navigate="goTo"
        @change-quantity="changeQuantity"
        @remove-item="removeItem"
      />
      <PaymentPage v-else-if="currentPage === 'payment'" @navigate="goTo" />
      <ReceiptPage v-else-if="currentPage === 'receipt'" @navigate="goTo" />
    </main>
  </div>
</template>
