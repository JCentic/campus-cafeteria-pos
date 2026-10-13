<script setup>
import { formatPeso } from '../utils/currency.js'

defineProps({
  receipt: { type: Object, required: true },
})

const emit = defineEmits(['new-transaction'])
</script>

<template>
  <section class="page receipt-page" aria-labelledby="receipt-title">
    <div class="page-heading receipt-page-heading">
      <div>
        <h1 id="receipt-title">Payment complete</h1>
        <p class="page-description">Cash accepted. The customer receipt is ready.</p>
      </div>
    </div>

    <div class="receipt-layout">
      <article class="receipt" aria-label="Digital receipt">
        <header class="receipt-header">
          <strong>Campus Cafeteria</strong>
          <span>Reference: {{ receipt.reference }}</span>
        </header>

        <div class="table-head receipt-head" aria-hidden="true">
          <span>Item</span>
          <span class="align-end">Qty</span>
          <span class="align-end">Subtotal</span>
        </div>
        <ul class="receipt-items" aria-label="Purchased items">
          <li v-for="item in receipt.items" :key="item.id" class="receipt-item">
            <span>{{ item.name }}</span>
            <span class="align-end">{{ item.quantity }}</span>
            <span class="align-end">{{ formatPeso(item.subtotalCentavos) }}</span>
          </li>
        </ul>

        <dl class="summary-list receipt-totals">
          <div class="summary-row summary-total">
            <dt>Total</dt>
            <dd>{{ formatPeso(receipt.totalCentavos) }}</dd>
          </div>
          <div class="summary-row">
            <dt>Cash received</dt>
            <dd>{{ formatPeso(receipt.amountPaidCentavos) }}</dd>
          </div>
          <div class="summary-row">
            <dt>Change</dt>
            <dd>{{ formatPeso(receipt.changeCentavos) }}</dd>
          </div>
        </dl>
      </article>

      <div class="button-row receipt-actions">
        <button type="button" class="button button-primary" @click="emit('new-transaction')">
          Start new transaction
        </button>
      </div>
    </div>
  </section>
</template>
