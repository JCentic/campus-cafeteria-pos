<script setup>
// Layout only. Real receipt data and the reset are added in Phase 4.
const emit = defineEmits(['navigate'])
</script>

<template>
  <section class="page" aria-labelledby="receipt-title">
    <div class="page-heading">
      <div>
        <h1 id="receipt-title">Receipt</h1>
        <p class="page-description">Customer copy of the finished order.</p>
      </div>
    </div>

    <article class="receipt" aria-label="Receipt">
      <header class="receipt-header">
        <strong>Campus Cafeteria</strong>
        <span>Reference: —</span>
      </header>

      <div class="table-head receipt-head" aria-hidden="true">
        <span>Item</span>
        <span>Qty</span>
        <span class="align-end">Subtotal</span>
      </div>
      <p class="receipt-empty">Items will be listed here after payment.</p>

      <dl class="summary-list receipt-totals">
        <div class="summary-row summary-total">
          <dt>Total</dt>
          <dd>₱0.00</dd>
        </div>
        <div class="summary-row">
          <dt>Cash received</dt>
          <dd>₱0.00</dd>
        </div>
        <div class="summary-row">
          <dt>Change</dt>
          <dd>₱0.00</dd>
        </div>
      </dl>
    </article>

    <div class="button-row receipt-actions">
      <button type="button" class="button button-primary" @click="emit('navigate', 'menu')">
        Start new order
      </button>
    </div>
  </section>
</template>
