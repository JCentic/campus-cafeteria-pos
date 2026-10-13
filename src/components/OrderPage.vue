<script setup>
import { formatPeso } from '../utils/currency.js'

defineProps({
  items: { type: Array, required: true },
  itemCount: { type: Number, required: true },
  totalCentavos: { type: Number, required: true },
})

const emit = defineEmits(['navigate', 'change-quantity', 'remove-item'])
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
      <div class="panel order-panel">
        <div v-if="items.length" class="order-table">
          <div class="table-head order-table-head" aria-hidden="true">
            <span>Item</span>
            <span class="align-end">Each</span>
            <span class="align-end">Quantity</span>
            <span class="align-end">Subtotal</span>
            <span></span>
          </div>

          <ul class="order-list" aria-label="Items in this order">
            <li v-for="item in items" :key="item.id" class="order-item">
              <div class="order-item-name">
                <strong>{{ item.name }}</strong>
                <span>{{ item.category }}</span>
              </div>
              <span class="order-unit-price">{{ formatPeso(item.priceCentavos) }}</span>
              <div class="quantity-control" :aria-label="`${item.name} quantity`">
                <button
                  type="button"
                  class="quantity-button"
                  :aria-label="`Decrease ${item.name} quantity`"
                  :disabled="item.quantity <= 1"
                  @click="emit('change-quantity', item.id, -1)"
                >−</button>
                <span class="quantity-value" aria-live="polite">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="quantity-button"
                  :aria-label="`Increase ${item.name} quantity`"
                  @click="emit('change-quantity', item.id, 1)"
                >+</button>
              </div>
              <strong class="order-subtotal">{{ formatPeso(item.subtotalCentavos) }}</strong>
              <button
                type="button"
                class="remove-button"
                :aria-label="`Remove ${item.name} from order`"
                @click="emit('remove-item', item.id)"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>

        <div v-else class="empty-state">
          <p>The order is empty. Add items from the menu to get started.</p>
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
            <dd>{{ itemCount }}</dd>
          </div>
          <div class="summary-row summary-total">
            <dt>Total due</dt>
            <dd>{{ formatPeso(totalCentavos) }}</dd>
          </div>
        </dl>
        <button
          type="button"
          class="button button-primary button-wide"
          :disabled="items.length === 0"
          @click="emit('navigate', 'payment')"
        >
          Take cash payment
        </button>
      </aside>
    </div>
  </section>
</template>
