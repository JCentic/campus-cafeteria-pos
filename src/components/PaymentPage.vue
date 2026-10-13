<script setup>
import { computed, ref } from 'vue'
import { formatPeso } from '../utils/currency.js'

const props = defineProps({
  totalCentavos: { type: Number, required: true },
  hasItems: { type: Boolean, required: true },
})

const emit = defineEmits(['navigate', 'payment-success'])
const cashInput = ref('')
const message = ref('')
const messageType = ref('error')
const parsedCashCentavos = computed(() => {
  const value = cashInput.value.trim()
  if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(value)) return null
  const [pesos, centavos = ''] = value.split('.')
  const amount = Number(pesos || 0) * 100 + Number(centavos.padEnd(2, '0') || 0)
  return Number.isSafeInteger(amount) ? amount : null
})
const changeCentavos = computed(() => {
  if (parsedCashCentavos.value === null || parsedCashCentavos.value < props.totalCentavos) return 0
  return parsedCashCentavos.value - props.totalCentavos
})

function clearMessage() {
  message.value = ''
}

function confirmPayment() {
  const value = cashInput.value.trim()

  if (!value) {
    message.value = 'Enter the cash amount received.'
    messageType.value = 'error'
    return
  }
  if (/^-/.test(value)) {
    message.value = 'Cash received cannot be negative.'
    messageType.value = 'error'
    return
  }
  if (parsedCashCentavos.value === null) {
    message.value = 'Enter a valid peso amount with up to two decimal places.'
    messageType.value = 'error'
    return
  }
  if (!props.hasItems) {
    message.value = 'Add items to the order before taking payment.'
    messageType.value = 'error'
    return
  }
  if (parsedCashCentavos.value < props.totalCentavos) {
    message.value = `The amount is short by ${formatPeso(props.totalCentavos - parsedCashCentavos.value)}.`
    messageType.value = 'error'
    return
  }

  messageType.value = 'success'
  message.value = 'Payment accepted. Preparing the receipt.'
  emit('payment-success', parsedCashCentavos.value)
}
</script>

<template>
  <section class="page payment-page" aria-labelledby="payment-title">
    <div class="page-heading">
      <div>
        <h1 id="payment-title">Cash payment</h1>
        <p class="page-description">Enter the cash the customer handed over.</p>
      </div>
    </div>

    <div class="payment-layout">
      <aside class="panel payment-summary-panel" aria-label="Payment summary">
        <p class="payment-summary-label">Amount to collect</p>
        <p class="payment-summary-total">{{ formatPeso(totalCentavos) }}</p>
        <dl class="summary-list payment-change-list">
          <div class="summary-row">
            <dt>Change</dt>
            <dd>{{ formatPeso(changeCentavos) }}</dd>
          </div>
        </dl>
      </aside>

      <form class="panel payment-panel payment-form" @submit.prevent="confirmPayment">
        <label for="cash-received" class="field-label">Cash received</label>
        <div class="money-field">
          <span aria-hidden="true">₱</span>
          <input
            id="cash-received"
            v-model="cashInput"
            type="text"
            inputmode="decimal"
            autocomplete="off"
            placeholder="0.00"
            aria-describedby="payment-message"
            @input="clearMessage"
          />
        </div>
        <p
          id="payment-message"
          class="field-message"
          :class="{ 'field-message-error': messageType === 'error', 'field-message-success': messageType === 'success' }"
          role="status"
          aria-live="polite"
        >{{ message }}</p>

        <div class="button-row">
          <button type="button" class="button button-secondary" @click="emit('navigate', 'order')">
            Back to order
          </button>
          <button type="submit" class="button button-primary">Confirm payment</button>
        </div>
      </form>
    </div>
  </section>
</template>
