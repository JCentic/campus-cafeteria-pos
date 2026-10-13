<script setup>
import { ref } from 'vue'

// Layout only. Checking the cash amount and computing change is Phase 4.
const emit = defineEmits(['navigate'])

const cashInput = ref('')
</script>

<template>
  <section class="page" aria-labelledby="payment-title">
    <div class="page-heading">
      <div>
        <h1 id="payment-title">Cash payment</h1>
        <p class="page-description">Enter the cash the customer handed over.</p>
      </div>
    </div>

    <div class="panel payment-panel">
      <dl class="summary-list">
        <div class="summary-row summary-total">
          <dt>Total due</dt>
          <dd>₱0.00</dd>
        </div>
      </dl>

      <form class="payment-form" @submit.prevent="emit('navigate', 'receipt')">
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
          />
        </div>
        <!-- Error or confirmation messages go here in Phase 4. -->
        <p id="payment-message" class="field-message" role="status" aria-live="polite"></p>

        <dl class="summary-list">
          <div class="summary-row">
            <dt>Change</dt>
            <dd>₱0.00</dd>
          </div>
        </dl>

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
