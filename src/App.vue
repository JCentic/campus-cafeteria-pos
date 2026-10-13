<script setup>
import { ref } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import MenuPage from './components/MenuPage.vue'
import OrderPage from './components/OrderPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import ReceiptPage from './components/ReceiptPage.vue'

// Which page is showing: 'menu', 'order', 'payment' or 'receipt'.
// A simple ref is enough here, so no router package is needed.
const currentPage = ref('menu')
const menuFeedback = ref('')

function goTo(page) {
  currentPage.value = page
  menuFeedback.value = ''
}

// Phase 2: only confirms the click. Phase 3 will put the item in the cart.
function handleAddToOrder(product) {
  menuFeedback.value = `${product.name} selected.`
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
      <OrderPage v-else-if="currentPage === 'order'" @navigate="goTo" />
      <PaymentPage v-else-if="currentPage === 'payment'" @navigate="goTo" />
      <ReceiptPage v-else-if="currentPage === 'receipt'" @navigate="goTo" />
    </main>
  </div>
</template>
