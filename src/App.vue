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
const isMenuFeedbackVisible = ref(false)
let menuFeedbackTimer
const cart = ref([])
const receipt = ref(null)
let transactionSequence = 0
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
  isMenuFeedbackVisible.value = false
  clearTimeout(menuFeedbackTimer)
}

function handleAddToOrder(product) {
  const existingItem = cart.value.find((item) => item.productId === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ productId: product.id, quantity: 1 })
  }
  const quantity = cart.value.find((item) => item.productId === product.id).quantity
  menuFeedback.value = `Added ${product.name}. Quantity in order: ${quantity}.`
  isMenuFeedbackVisible.value = true
  clearTimeout(menuFeedbackTimer)
  menuFeedbackTimer = setTimeout(() => {
    isMenuFeedbackVisible.value = false
  }, 2800)
}

function changeQuantity(productId, amount) {
  const item = cart.value.find((entry) => entry.productId === productId)
  if (!item) return

  item.quantity = Math.max(1, item.quantity + amount)
}

function removeItem(productId) {
  cart.value = cart.value.filter((item) => item.productId !== productId)
}

function completePayment(amountPaidCentavos) {
  if (amountPaidCentavos < totalCentavos.value || orderItems.value.length === 0) return

  transactionSequence += 1
  const now = new Date()
  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')
  const timePart = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((value) => String(value).padStart(2, '0'))
    .join('')

  receipt.value = {
    reference: `CAF-${datePart}-${timePart}-${String(transactionSequence).padStart(3, '0')}`,
    items: orderItems.value.map(({ id, name, quantity, subtotalCentavos }) => ({
      id,
      name,
      quantity,
      subtotalCentavos,
    })),
    totalCentavos: totalCentavos.value,
    amountPaidCentavos,
    changeCentavos: amountPaidCentavos - totalCentavos.value,
  }
  currentPage.value = 'receipt'
}

function startNewTransaction() {
  cart.value = []
  receipt.value = null
  currentPage.value = 'menu'
  menuFeedback.value = ''
  isMenuFeedbackVisible.value = false
  clearTimeout(menuFeedbackTimer)
}
</script>

<template>
  <div class="pos-shell">
    <AppNavbar :current-page="currentPage" @navigate="goTo" />

    <main id="main-content">
      <MenuPage
        v-if="currentPage === 'menu'"
        :feedback="menuFeedback"
        :feedback-visible="isMenuFeedbackVisible"
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
      <PaymentPage
        v-else-if="currentPage === 'payment'"
        :total-centavos="totalCentavos"
        :has-items="orderItems.length > 0"
        @navigate="goTo"
        @payment-success="completePayment"
      />
      <ReceiptPage
        v-else-if="currentPage === 'receipt'"
        :receipt="receipt"
        @new-transaction="startNewTransaction"
      />
    </main>
  </div>
</template>
