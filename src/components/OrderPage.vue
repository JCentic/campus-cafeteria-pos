<script setup>
// Layout only. Cart items, quantity controls and totals are added in Phase 3.
const emit = defineEmits(['navigate'])
</script>

<template>
  <section class="page" aria-labelledby="order-title">
    <div class="page-heading">
      <div>
        <h1 id="order-title">Order</h1>
        <p class="page-description">Check the items before taking payment.</p>
      </div>
    </div>

    <div class="split-layout">
      <div class="panel">
        <div class="table-head" aria-hidden="true">
          <span>Item</span>
          <span>Qty</span>
          <span class="align-end">Subtotal</span>
        </div>
        <div class="empty-state">
          <p>The order is empty.</p>
          <button type="button" class="button button-secondary" @click="emit('navigate', 'menu')">
            Go to menu
          </button>
        </div>
      </div>

      <aside class="panel summary-panel" aria-label="Order summary">
        <h2 class="panel-title">Summary</h2>
        <dl class="summary-list">
          <div class="summary-row">
            <dt>Items</dt>
            <dd>0</dd>
          </div>
          <div class="summary-row summary-total">
            <dt>Total due</dt>
            <dd>₱0.00</dd>
          </div>
        </dl>
        <button type="button" class="button button-primary button-wide" @click="emit('navigate', 'payment')">
          Take cash payment
        </button>
      </aside>
    </div>
  </section>
</template>
