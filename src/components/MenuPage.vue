<script setup>
import { products, categories } from '../data/products.js'
import { formatPeso } from '../utils/currency.js'

defineProps({
  // Short message shown after a product is picked (filled in by App.vue).
  feedback: { type: String, default: '' },
})

const emit = defineEmits(['add-to-order'])

function productsIn(category) {
  return products.filter((product) => product.category === category)
}
</script>

<template>
  <section class="page" aria-labelledby="menu-title">
    <div class="page-heading">
      <div>
        <h1 id="menu-title">Menu</h1>
        <p class="page-description">Pick items for the customer’s order.</p>
      </div>
      <p class="feedback" role="status" aria-live="polite">{{ feedback }}</p>
    </div>

    <div class="menu-groups">
      <div v-for="category in categories" :key="category" class="menu-group">
        <h2 class="group-title">{{ category }}</h2>
        <ul class="product-grid">
          <li v-for="product in productsIn(category)" :key="product.id" class="product-card">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">{{ formatPeso(product.priceCentavos) }}</span>
            <button
              type="button"
              class="button button-primary add-button"
              :aria-label="`Add ${product.name} to order`"
              @click="emit('add-to-order', product)"
            >
              Add to order
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
